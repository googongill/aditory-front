import Service from '@/service/service';
import { Category } from '@/model/category';
import { headers } from 'next/headers';

class CategoryService extends Service {
  authorization = (accessToken: string) => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
  //get my categories
  getMyCategories({ accessToken }: { accessToken: string }) {
    return this.http.get<Category[]>(
      `/categories/my`,
      this.authorization(accessToken)
    );
  }

  //get specific category (linklist)
  getCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.get<Category>(
      `/categories/${categoryId}`,
      this.authorization(accessToken)
    );
  }

  //add new category
  postCategory({
    accessToken,
    categoryName,
  }: {
    accessToken: string;
    categoryName: string;
  }) {
    return this.http.post<Category>(
      `/categories`,
      {
        categoryName,
      },
      this.authorization(accessToken)
    );
  }

  //update category
  updateCategory({
    accessToken,
    categoryId,
    categoryName,
    categoryState,
    asCategoryName,
  }: {
    accessToken: string;
    categoryId: number;
    categoryName: string;
    categoryState: boolean;
    asCategoryName: string;
  }) {
    return this.http.patch<Category>(
      `/categories/${categoryId}`,
      {
        categoryName,
        categoryState,
        asCategoryName,
      },
      this.authorization(accessToken)
    );
  }

  //delete category
  deleteCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}`,
      this.authorization(accessToken)
    );
  }

  //get public category lists
  getPublicCategories({ accessToken }: { accessToken: string }) {
    return this.http.get<Category[]>(
      `/categories/public`,
      this.authorization(accessToken)
    );
  }

  //add like to public category
  postLike({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/like`,
      this.authorization(accessToken)
    );
  }

  //remove like from public category
  deleteLike({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.delete<Category>(
      `/categories/${categoryId}/like`,
      this.authorization(accessToken)
    );
  }

  //copy public category to my category
  copyCategory({
    accessToken,
    categoryId,
  }: {
    accessToken: string;
    categoryId: number;
  }) {
    return this.http.post<Category>(
      `/categories/${categoryId}/copy`,
      this.authorization(accessToken)
    );
  }

  //링크 목록의 카테고리 이동 ??
  moveCategory({
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
    return this.http.post<Category>(
      `/categories/${categoryId}/move`,
      {
        linkIdList,
        targetCategoryId,
      },
      this.authorization(accessToken)
    );
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
