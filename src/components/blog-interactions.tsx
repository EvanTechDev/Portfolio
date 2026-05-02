"use client"

import { useState } from 'react';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';
import { AtReplyComments } from './atreply-comments';

interface BlogInteractionsProps {
  slug: string;
}

export function BlogInteractions({ slug }: BlogInteractionsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string>('');
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = typeof document !== 'undefined' ? document.title : '';

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="mt-8 mb-24 md:mb-8">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleShare}
          disabled={isSharing}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>{isSharing ? 'Sharing...' : 'Share'}</span>
        </Button>
        {copySuccess && (
          <span className="text-sm text-green-600 dark:text-green-400">
            {copySuccess}
          </span>
        )}
      </div>

      <div className="mt-12">
        <AtReplyComments subject={shareUrl || `/blog/${slug}`} />
      </div>
    </div>
  );
}
