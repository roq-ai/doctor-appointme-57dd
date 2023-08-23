import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientRecordInterface {
  id?: string;
  patient_name: string;
  patient_age: number;
  patient_gender: string;
  medical_history?: string;
  current_medication?: string;
  nurse_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PatientRecordGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_name?: string;
  patient_gender?: string;
  medical_history?: string;
  current_medication?: string;
  nurse_id?: string;
}
