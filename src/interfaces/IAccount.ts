export interface IAccount {
  _id?: string;
  userId?: string;
  name: string;
  currentBalance: number;
  expectedBalance?: number;
  color: string;
  type: ITypeAccount;
}

export interface ITypeAccount {
  icon: string;
  name: string;
}
