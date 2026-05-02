"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { AtReplyClient, type AtReplyComment, createLocalStorageOAuthProvider } from '@/lib/atreply';

type AtReplyCommentsProps = {
  subject: string;
};

export function AtReplyComments({ subject }: AtReplyCommentsProps) {
  const client = useMemo(() => new AtReplyClient({ oauth: createLocalStorageOAuthProvider() }), []);
  const [comments, setComments] = useState<AtReplyComment[]>([]);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const list = await client.listComments(subject);
      setComments(list);
    } catch (error) {
      console.error(error);
      setStatus('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  }, [client, subject]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus('');
    try {
      await client.createComment({
        subject,
        text: text.trim(),
        parentUri: replyTo,
      });
      setText('');
      setReplyTo(undefined);
      await loadComments();
    } catch (error) {
      console.error(error);
      setStatus('Publish failed, please finish OAuth sign-in first.');
    }
  };

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Comments (atproto)</h3>
      <div className="space-y-2">
        {replyTo && <p className="text-xs text-muted-foreground">Replying to: {replyTo}</p>}
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="Write a comment..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleSubmit}>Post</Button>
          {replyTo && (
            <Button size="sm" variant="outline" onClick={() => setReplyTo(undefined)}>
              Cancel reply
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={loadComments} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {status && <p className="text-sm text-amber-600">{status}</p>}

      <ul className="space-y-3">
        {comments.map((comment) => (
          <li key={comment.uri} className="rounded-md border p-3">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{comment.authorHandle ?? comment.authorDid}</span>
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
            <div className="mt-2">
              <Button size="sm" variant="ghost" onClick={() => setReplyTo(comment.uri)}>
                Reply
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
