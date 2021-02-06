export interface Diaper {
  _id?: string;
  createdAt: Date;
  period: number;
  usedDiaper: {usedDate: Date}[];
  baby: string;
}
