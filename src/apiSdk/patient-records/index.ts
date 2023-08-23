import axios from 'axios';
import queryString from 'query-string';
import { PatientRecordInterface, PatientRecordGetQueryInterface } from 'interfaces/patient-record';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPatientRecords = async (
  query?: PatientRecordGetQueryInterface,
): Promise<PaginatedInterface<PatientRecordInterface>> => {
  const response = await axios.get('/api/patient-records', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPatientRecord = async (patientRecord: PatientRecordInterface) => {
  const response = await axios.post('/api/patient-records', patientRecord);
  return response.data;
};

export const updatePatientRecordById = async (id: string, patientRecord: PatientRecordInterface) => {
  const response = await axios.put(`/api/patient-records/${id}`, patientRecord);
  return response.data;
};

export const getPatientRecordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/patient-records/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePatientRecordById = async (id: string) => {
  const response = await axios.delete(`/api/patient-records/${id}`);
  return response.data;
};
