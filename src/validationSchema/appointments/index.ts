import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  duration: yup.number().integer().required(),
  status: yup.string().required(),
  guest_id: yup.string().nullable().required(),
  doctor_id: yup.string().nullable().required(),
});
