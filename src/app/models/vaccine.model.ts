export interface Vaccine {
  _id?: string;
  createdAt: Date;
  period: number;
  vaccineDates: {vaccineDate: Date}[];
  name: string;
  description: string;
  baby: string;
}
