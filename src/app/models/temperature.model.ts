export interface Metring {
  date: Date;
  temperature: number;
}

export interface Temperature {
  _id?: string;
  metering: Metring[];
  baby: string;
}
