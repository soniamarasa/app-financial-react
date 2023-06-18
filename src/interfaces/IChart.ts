import { ITransaction } from "./ITransaction";

export interface IChart {
    id?: string;
    userId: string;
    name: string;
    value: number;
    icon: string;
    color: string;
    type: number;
    // Items?: ITransaction[];
  }
  