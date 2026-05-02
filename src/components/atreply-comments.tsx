"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { AtReplyClient, type AtReplyComment, type AtReplySession } from '@/lib/atreply';

type AtReplyCommentsProps = {
  subject: string;
};

export function AtReplyComments({ subject }: AtReplyCommentsProps) {
  const client = useMemo(() => new AtReplyClient(), []);
  const [comments, setComments] = useState<AtReplyComment[]>([]);
  const [session, setSession] = useState<AtReplySession | null>(null);
  const [handle, setHandle] = useState('');
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [status, setStatus] = useState('');

  const loadComments = useCallback(async () => {
    setStatus('');
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
    client.handleOAuthCallbackIfNeeded().then(setSession).catch(console.error);
    loadComments();
  }, [client, loadComments]);

  const handleSignIn = async () => {
    if (!handle.trim()) return;
    setAuthLoading(true);
    try {
      await client.beginSignIn(handle.trim());
    } catch (error) {
      console.error(error);
      setStatus('OAuth redirect failed.');
      setAuthLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      setStatus('Please sign in with atproto first.');
      return;
    }
    if (submitting || !text.trim()) return;
    setStatus('');
    setSubmitting(true);
    try {
      await client.createComment(session, { subject, text: text.trim(), parentUri: replyTo });
      setText('');
      setReplyTo(undefined);
      await loadComments();
    } catch (error) {
      console.error(error);
      setStatus('Publish failed. Please sign in again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-5 rounded-xl border bg-card/70 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comments</h3>
        {session ? (
          <p className="text-xs text-muted-foreground">Signed in as {session.handle ?? session.did}</p>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Sign in with atproto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign in to comment</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="your-handle.bsky.social"
                />
                <Button className="w-full" onClick={handleSignIn} disabled={authLoading || !handle.trim()}>
                  {authLoading ? 'Redirecting...' : 'Continue to OAuth'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-2">
        {replyTo && <p className="text-xs text-muted-foreground">Replying to: {replyTo}</p>}
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder={session ? 'Write a comment...' : 'Sign in to write a comment...'}
          disabled={!session}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={handleSubmit} disabled={!session || submitting || loading}>
            {submitting ? 'Posting...' : 'Post'}
          </Button>
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
          <li key={comment.uri} className="rounded-lg border bg-background p-3">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>{comment.authorHandle ?? comment.authorDid}</span>
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
            <Button size="sm" variant="ghost" onClick={() => setReplyTo(comment.uri)} className="mt-1 px-0">
              Reply
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
