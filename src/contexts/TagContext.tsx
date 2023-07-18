import React, { createContext, useContext } from 'react';
import { ITag } from '../interfaces/ITag';

interface TagContextType {
    tags: ITag[];
    setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

export const TagContext = createContext<TagContextType>({} as TagContextType)

export const useTagContext = () => useContext(TagContext);


export const TagStorage = ({ children }: { children: any }) => {
  const [tags, setTags] = React.useState([] as ITag[]);

  return (
    <TagContext.Provider value={{ tags, setTags }}>
      {children}
    </TagContext.Provider>
  );
};
