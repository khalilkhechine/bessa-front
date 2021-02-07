export interface Growthing {
  date: Date;
  height: number;
  weight: number;
}

export interface Growth {
  _id?: string;
  growthing: Growthing[];
  baby: string;
}
