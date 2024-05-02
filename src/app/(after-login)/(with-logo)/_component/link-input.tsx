'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { CiReceipt } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function LinkInput() {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isValid, setIsValid] = useState<Boolean>(false);

  // URL 유효성 검사 함수
  const isValidUrl = (url: string) => {
    // 간단한 URL 유효성 검사를 수행할 수 있습니다. (여기서는 매우 간단한 형태로만 확인합니다.)
    const pattern = /^(ftp|http|https):\/\//;
    setIsValid(pattern.test(url));
  };

  // 입력된 링크가 변경될 때 실행되는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewUrl(event.target.value);
  };

  useEffect(() => {
    isValidUrl(previewUrl);
    console.log(isValid);
  }, [previewUrl]);

  // 클립보드에서 붙여넣기하는 함수
  const pasteFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((textFromClipboard) => {
        console.log('Text pasted from clipboard:', textFromClipboard);
        // inputRef.current!.value = textFromClipboard; // input 요소에 붙여넣기
        setPreviewUrl(textFromClipboard);
      })
      .catch((error) => {
        console.error('Error pasting text from clipboard:', error);
      });
  };

  return (
    <>
      <div>
        {/* 입력된 링크의 미리보기를 표시하는 iframe */}
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex gap-2'>
              <p className='text-md my-2 scroll-m-20 font-semibold tracking-tight'>
                <span className='mr-2'>Save links</span>
                <PasteBtn onClick={pasteFromClipboard} />
              </p>
            </div>
          </HoverCardTrigger>
          {previewUrl && isValid && (
            <HoverCardContent>
              <iframe
                className='relative inset-0 top-1 z-40 rounded-md border'
                sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
                src={previewUrl}
                width='100%'
                height='200'
                title='Link Preview'
              />
            </HoverCardContent>
          )}
        </HoverCard>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Link'
            className='rounded-xl bg-input py-8'
            autoFocus
            value={previewUrl}
            onChange={handleInputChange}
            // ref={inputRef}
          />
          <Link href={'/add'}>
            <Button className='max-w-xs rounded-xl bg-input py-8 hover:bg-input/40'>
              <FaPlus />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

function PasteBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant={'outline'} className='p-1' onClick={onClick}>
      <CiReceipt />
      <span>paste</span>
    </Button>
  );
}