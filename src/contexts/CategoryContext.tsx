import React, { createContext, useContext } from 'react';
import { ICategory } from '../interfaces/ICategory';

interface CategoryContextType {
    categories: ICategory[];
    setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

export const CategoryContext = createContext<CategoryContextType>({} as CategoryContextType)

export const useCategoryContext = () => useContext(CategoryContext);


export const CategoryStorage = ({ children }: { children: any }) => {
  const [categories, setCategories] = React.useState([] as ICategory[]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
