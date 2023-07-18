import { ITransaction } from "./ITransaction";

export interface IChart {
    _id?: string;
    userId: string;
    name: string;
    value: number;
    icon: string;
    color: string;
    type: number;
    // Items?: ITransaction[];
  }
  