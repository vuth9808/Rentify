import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-gray-200/80 dark:bg-gray-700/50',
        className
      )}
    />
  );
};

export default Skeleton; 