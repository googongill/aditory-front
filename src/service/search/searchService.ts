import Service from '@/service/service';
import { CategoryResponse } from '@/types/model/category';
import { LinkListResponse } from '@/types/model/link';

// categoryScope
export enum CategoryScope {
  IN_PUBLIC, // 공개 카테고리
  IN_MY, // 내 카테고리
}

class SearchService extends Service {
  authorization = (accessToken: string) => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
  searchByCategory({
    accessToken,
    query,
    categoryScope,
    page,
  }: {
    accessToken: string;
    query: string;
    categoryScope: CategoryScope;
    page: number;
  }) {
    return this.http.get<CategoryResponse>(
      `/search/categories?query=${query}&categoryScope=${CategoryScope[categoryScope]}&page=${page}&size=8`,
      this.authorization(accessToken)
    );
  }
  searchByLink({
    accessToken,
    query,
    categoryScope,
    page,
  }: {
    accessToken: string;
    query: string;
    categoryScope: CategoryScope;
    page: number;
  }) {
    return this.http.get<LinkListResponse>(
      `/search/links?query=${query}&categoryScope=${CategoryScope[categoryScope]}&page=${page}&size=8`,
      this.authorization(accessToken)
    );
  }
}

export default new SearchService();
