'use client';

import { useAccessToken } from '@/lib/useAccessToken';
import { usePublic, useRandom } from '@/service/categories/useCategoryService';
import { useMyLikes } from '@/service/user/useUserService';
import DefaultComponent from './default-component';
import {
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import queries from '@/service/categories/queries';

export default function ResultComponent() {
  const { accessToken } = useAccessToken();
  const { data: myLikes } = useMyLikes({ accessToken: accessToken });
  const { data: randomPublic } = useRandom({ accessToken: accessToken });

  const options = {};
  return (
    <div>
      <DefaultComponent
        myLikes={myLikes}
        randomPublic={randomPublic}
        accessToken={accessToken}
      />
    </div>
  );
}
