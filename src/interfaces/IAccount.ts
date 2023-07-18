export interface IAccount {
  _id?: string;
  userId: string;
  name: string;
  currentBalance: number;
  expectedBalance: number;
  icon: string;
  color: string;
  type: number;
}
