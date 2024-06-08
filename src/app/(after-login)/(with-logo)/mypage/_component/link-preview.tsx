'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

type LinkMetadata = {
  ogImage: string;
  ogTitle: string;
  ogUrl: string;
};

export default function LinkPreview({ prevLinks }: { prevLinks: string[] }) {
  const [ogData, setOgData] = useState<LinkMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  const getOgData = async (externalUrl: string) => {
    const response = await fetch(
      `/api/preview?url=${encodeURIComponent(externalUrl)}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const promises = prevLinks.map((link) => getOgData(link));
        Promise.all(promises).then(setOgData);
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [prevLinks]);

  if (loading) {
    return (
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className='m-1'>
          <Skeleton className='h-full w-full border border-bgColor' />
          <Skeleton className='h-full w-full' />
          <Skeleton className='h-full w-full' />
          <Skeleton className='h-full w-full' />
        </div>
      </div>
    );
  }

  if (prevLinks.length === 0) {
    return (
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className='m-1'>
          <Skeleton className='h-full w-full border-r' />
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 grid-rows-2'>
      {ogData.map((meta, index) => (
        <div className='m-1' key={index + meta.ogImage}>
          <img
            alt={meta.ogTitle}
            src={meta.ogImage}
            className='h-full rounded-xl object-cover shadow'
          />
        </div>
      ))}
    </div>
  );
}
