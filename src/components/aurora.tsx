import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                             \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

export default function Aurora(props: AuroraProps) {
  const {
    colorStops = ["#2ECC71", "#8E44AD", "#3498DB"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 1.0,
  } = props;
  const ctnDom = useRef<HTMLDivElement>(null);
  const contextRef = useRef<{
    renderer: Renderer;
    gl: any;
    program: Program;
    mesh: Mesh;
    canvas: HTMLCanvasElement;
    animationId: number;
    time: number;
    isRunning: boolean;
  } | null>(null);
  
  const resizeHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    let renderer: Renderer;
    let gl: any;
    let program: Program;
    let mesh: Mesh;
    let canvas: HTMLCanvasElement;
    let animationId = 0;
    let time = 0;
    let isRunning = true;
    let lastColorStops = [...colorStops];

    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });

      gl = renderer.gl;
      canvas = gl.canvas as HTMLCanvasElement;

      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);

      canvas.style.cssText = `
        background-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      `;

      const width = ctn.offsetWidth || window.innerWidth;
      const height = ctn.offsetHeight || window.innerHeight;

      const geometry = new Triangle(gl);
      if (geometry.attributes.uv) {
        delete geometry.attributes.uv;
      }

      const colorStopsArray = colorStops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: colorStopsArray },
          uResolution: { value: [width, height] },
          uBlend: { value: blend },
        },
      });

      mesh = new Mesh(gl, { geometry, program });

      contextRef.current = {
        renderer,
        gl,
        program,
        mesh,
        canvas,
        animationId,
        time,
        isRunning,
      };

      const handleResize = () => {
        if (!contextRef.current || !contextRef.current.isRunning) return;
        
        const { renderer, program } = contextRef.current;
        const width = ctn.offsetWidth || window.innerWidth;
        const height = ctn.offsetHeight || window.innerHeight;
        
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [width, height];
      };

      resizeHandlerRef.current = handleResize;

      const animate = () => {
        if (!contextRef.current || !contextRef.current.isRunning) return;

        const { renderer, program, mesh, gl } = contextRef.current;
        
        contextRef.current.time += 0.016 * speed;

        const needsColorUpdate = lastColorStops.some((color, index) => color !== colorStops[index]);
        if (needsColorUpdate) {
          const newColorStopsArray = colorStops.map((hex) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
          });
          program.uniforms.uColorStops.value = newColorStopsArray;
          lastColorStops = [...colorStops];
        }

        program.uniforms.uTime.value = contextRef.current.time;
        program.uniforms.uAmplitude.value = amplitude;
        program.uniforms.uBlend.value = blend;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        renderer.render({ scene: mesh });
        
        contextRef.current.animationId = requestAnimationFrame(animate);
      };

      window.addEventListener("resize", handleResize);
      ctn.appendChild(canvas);
      
      handleResize();
      contextRef.current.animationId = requestAnimationFrame(animate);

    } catch (error) {
      console.error("Failed to initialize Aurora:", error);
      return;
    }

    return () => {
      if (contextRef.current) {
        contextRef.current.isRunning = false;
        
        if (contextRef.current.animationId) {
          cancelAnimationFrame(contextRef.current.animationId);
        }
        
        if (resizeHandlerRef.current) {
          window.removeEventListener("resize", resizeHandlerRef.current);
        }
        
        if (ctn && contextRef.current.canvas && contextRef.current.canvas.parentNode === ctn) {
          ctn.removeChild(contextRef.current.canvas);
        }

        try {
          const loseContext = contextRef.current.gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        } catch (error) {
          console.warn("Error losing WebGL context:", error);
        }
        
        contextRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={ctnDom}
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        top: 0, 
        left: 0, 
        background: "transparent",
        overflow: "hidden"
      }}
    />
  );
}
