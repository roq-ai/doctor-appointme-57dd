import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ScheduleInterface {
  id?: string;
  start_time: any;
  end_time: any;
  day_of_week: number;
  doctor_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  doctor_id?: string;
}
