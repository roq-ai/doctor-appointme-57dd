import * as yup from 'yup';

export const patientRecordValidationSchema = yup.object().shape({
  patient_name: yup.string().required(),
  patient_age: yup.number().integer().required(),
  patient_gender: yup.string().required(),
  medical_history: yup.string().nullable(),
  current_medication: yup.string().nullable(),
  nurse_id: yup.string().nullable().required(),
});
