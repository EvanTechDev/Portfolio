"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import { VideoPlayerModal } from "./video-player-modal";

interface VideoCardProps {
  video: {
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    date: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full relative group">
          <div className="relative group">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={500}
              height={280}
              className="w-full h-48 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{video.title}</CardTitle>
            <time className="text-sm text-muted-foreground">
              {formatDate(video.date)}
            </time>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">{video.description}</p>
          </CardContent>
        </Card>
      </div>

      {/*<VideoPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={video.url}
        videoTitle={video.title}
      />*/}
    </>
  );
}
