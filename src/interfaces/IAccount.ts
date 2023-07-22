export interface IAccount {
  _id?: string;
  userId?: string;
  name: string;
  openingBalance?: number;
  currentBalance: number;
  forecastBalance: number;
  color: string;
  type: ITypeAccount;
}

export interface ITypeAccount {
  icon: string;
  name: string;
}
