export interface Doctor {
  _id?: string;
  name: string;
  email: string;
  address: string;
  speciality: string;
  appointments: {appointment: Date}[];
  baby: string;
}
