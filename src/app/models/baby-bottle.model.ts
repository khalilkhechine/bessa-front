export interface BabyBottle {
  _id?: string;
  createdAt: Date;
  period: number;
  tokenBabyBottle: {tokenDate: Date}[];
  baby: string;
}
