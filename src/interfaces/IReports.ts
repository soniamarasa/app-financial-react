import { ICategory } from './ICategory';
import { IStore } from './IStore';

export interface IReport {
  _id: number;
  name: string;
  total: number;
  icon: string;
  color: string;
}

export interface IReports {
  current: IReport;
  expenses: IReport;
  income: IReport;
  forecast: IReport;
}

export interface IStoreReport {
  store: IStore;
  total: number;
  percent: number;
}

export interface ICategoryReport {
  store: ICategory;
  total: number;
  percent: number;
}

export interface IMontlyReport {
  total: number;
  percent: number;
}

export interface IMontlysReport {
  income: IMontlyReport;
  expense: IMontlyReport;
  balance: number;
}
