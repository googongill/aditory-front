import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface loginInfo {
  userId?: number;
  username?: string;
  nickname?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  refreshTokenExpires?: number;
  profileImageUrl?: string;
  userCategories?: { categoryId: number; categoryName: string }[];
}

interface State {
  userInfo: loginInfo;
  addUserInfo: (state: loginInfo) => void;
  removeUserInfo: () => void;
  addCategories: (category: {
    categoryId: number;
    categoryName: string;
  }) => void;
  deleteCategories: (categoryId: number) => void;
}

export const useStorage = create<State>()(
  persist(
    (set) => ({
      userInfo: {},
      addUserInfo: (state: loginInfo) =>
        set({
          userInfo: {
            ...state,
          },
        }),
      removeUserInfo: () => set({ userInfo: {} }),
      addCategories: (category: { categoryId: number; categoryName: string }) =>
        set((state) => {
          const existingCategories = state.userInfo.userCategories || [];
          const categoryExists = existingCategories.some(
            (existingCategory) =>
              existingCategory.categoryId === category.categoryId
          );
          if (!categoryExists) {
            return {
              userInfo: {
                ...state.userInfo,
                userCategories: [...existingCategories, category],
              },
            };
          }
          return state;
        }),
      deleteCategories: (categoryId: number) =>
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            userCategories: state.userInfo.userCategories
              ? state.userInfo.userCategories.filter(
                  (category) => category.categoryId !== categoryId
                )
              : [],
          },
        })),
    }),
    {
      name: 'userInfo', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
