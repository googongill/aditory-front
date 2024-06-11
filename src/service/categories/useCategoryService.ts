import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import queryOptions from '@/service/categories/queries';
import useCategoryStore from '@/lib/useCategoryStore';
import { CategoryState } from '@/types/types';
import { useToast } from '@/components/ui/use-toast';
import { useStorage } from '@/lib/useStorage';
import { specificCategoryResponse } from '@/types/model/category';
//get
//get my categories
export function useMyCategories({
  accessToken,
  selectedFn,
}: {
  accessToken: string;
  selectedFn?: (data: any) => any;
}) {
  return useQuery({
    ...queryOptions.my({ accessToken }),
  });
}

export function usePublic({ accessToken }: { accessToken: string }) {
  return useInfiniteQuery(queryOptions.public({ accessToken }));
}

export function useRandom({ accessToken }: { accessToken: string }) {
  return useQuery(queryOptions.random({ accessToken }));
}

export function useSpecific({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  const setCategoryInfo = useCategoryStore(
    (state: any) => state.setCategoryInfo
  );
  return useQuery({
    ...queryOptions.specific({ accessToken, categoryId }),
    select: (data) => {
      setCategoryInfo(data.data);
      return data.data;
    },
  });
}

//post
export function useCreateCategory({
  accessToken,
  categoryName,
  successedFn,
}: {
  accessToken: string;
  categoryName: string;
  successedFn?: (data: any) => any;
}) {
  const { addCategories } = useStorage();
  return useMutation({
    ...queryOptions.newCategory({ accessToken, categoryName }),
    onSettled: (data: any) => {
      addCategories({
        categoryId: data?.data.categoryId,
        categoryName: data?.data.categoryName,
      });
      successedFn && successedFn(data);
    },
  });
}

export function useLike({
  accessToken,
  categoryId,
  selectedFn,
}: {
  accessToken: string;
  categoryId: number;
  selectedFn?: (data: any) => any;
}) {
  return useMutation({
    ...queryOptions.addLike({ accessToken, categoryId }),
    onSuccess: (data) => {
      if (selectedFn) selectedFn(data);
    },
  });
}

export function useCopyCategory({
  accessToken,
  categoryId,
}: {
  accessToken: string;
  categoryId: number;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.copyCategory({ accessToken, categoryId }),
    onSuccess(data) {},
    onSettled: (data, error) => {
      // console.log(data);
      // console.log(error);
      if (data) {
        toast({
          title: 'Copied successfully to your categories',
        });
        queryClient.invalidateQueries({
          queryKey: ['myCategory'],
        });
        return data;
      } else if (error) {
        toast({
          title: 'You already have this category',
          variant: 'destructive',
        });
      }
      return data;
    },
  });
}

export function useMoveCategory({
  accessToken,
  categoryId,
  linkIdList,
  targetCategoryId,
}: {
  accessToken: string;
  categoryId: number;
  linkIdList: number[];
  targetCategoryId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.moveCategory({
      accessToken,
      categoryId,
      linkIdList,
      targetCategoryId,
    }),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['specificCategory', categoryId],
      });
    },
  });
}

//patch method

export function useUpdateCategory({
  accessToken,
  categoryId,
  categoryName,
  categoryState,
  asCategoryName,
  onSettledFn,
}: {
  accessToken: string;
  categoryId: number;
  categoryName: string;
  categoryState: CategoryState;
  asCategoryName: string;
  onSettledFn?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    ...queryOptions.updateCategory({
      accessToken,
      categoryId,
      categoryName,
      categoryState,
      asCategoryName,
    }),
    onSettled: () => {
      onSettledFn && onSettledFn();
      return queryClient.invalidateQueries({
        queryKey: ['specificCategory', categoryId],
      });
    },
  });
}

//delete method
export function useDeleteCategory({
  accessToken,
  categoryId,
  onSettled,
}: {
  accessToken: string;
  categoryId: number;
  onSettled?: (data?: any) => void;
}) {
  const { deleteCategories } = useStorage();
  return useMutation({
    ...queryOptions.deleteCategory({ accessToken, categoryId }),
    onSettled: (data) => {
      deleteCategories(categoryId);
      onSettled && onSettled(data);
    },
  });
}

export function useUnLike({
  accessToken,
  categoryId,
  selectedFn,
}: {
  accessToken: string;
  categoryId: number;
  selectedFn?: (data: any) => any;
}) {
  return useMutation({
    ...queryOptions.deleteLike({ accessToken, categoryId }),
    onSuccess: (data) => {
      if (selectedFn) selectedFn(data);
    },
  });
}
