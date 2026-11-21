import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';

interface CmsImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  loading?: 'lazy' | 'eager';
}

export function CmsImage({
  src,
  alt,
  className = '',
  fallback,
  loading = 'lazy',
}: CmsImageProps) {
  const { resolveMediaUrl } = useCms();
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(src);

  if (!resolved || failed) {
    return <>{fallback || null}</>;
  }

  return (
    <img
      src={resolved}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
