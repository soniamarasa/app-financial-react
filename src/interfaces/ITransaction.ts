import { ICategory } from "./ICategory";
import { ITag } from "./ITag";
import { IStore } from "./IStore";
import { IAccount } from "./IAccount";

export interface ITransaction {
    _id?: string;
    userId: string;
    description: string;
    obs: string;
    type: string;
    value: number;
    date: Date;
    effected: boolean;
    category: ICategory;
    store: IStore;
    tag: ITag;
    inputAccount: IAccount;
    outputAccount: IAccount;
  }
  