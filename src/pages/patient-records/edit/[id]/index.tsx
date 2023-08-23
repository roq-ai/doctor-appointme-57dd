import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getPatientRecordById, updatePatientRecordById } from 'apiSdk/patient-records';
import { patientRecordValidationSchema } from 'validationSchema/patient-records';
import { PatientRecordInterface } from 'interfaces/patient-record';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function PatientRecordEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PatientRecordInterface>(
    () => (id ? `/patient-records/${id}` : null),
    () => getPatientRecordById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PatientRecordInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePatientRecordById(id, values);
      mutate(updated);
      resetForm();
      router.push('/patient-records');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PatientRecordInterface>({
    initialValues: data,
    validationSchema: patientRecordValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Patient Records',
              link: '/patient-records',
            },
            {
              label: 'Update Patient Record',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Patient Record
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.patient_name}
            label={'Patient Name'}
            props={{
              name: 'patient_name',
              placeholder: 'Patient Name',
              value: formik.values?.patient_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Patient Age"
            formControlProps={{
              id: 'patient_age',
              isInvalid: !!formik.errors?.patient_age,
            }}
            name="patient_age"
            error={formik.errors?.patient_age}
            value={formik.values?.patient_age}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('patient_age', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.patient_gender}
            label={'Patient Gender'}
            props={{
              name: 'patient_gender',
              placeholder: 'Patient Gender',
              value: formik.values?.patient_gender,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.medical_history}
            label={'Medical History'}
            props={{
              name: 'medical_history',
              placeholder: 'Medical History',
              value: formik.values?.medical_history,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.current_medication}
            label={'Current Medication'}
            props={{
              name: 'current_medication',
              placeholder: 'Current Medication',
              value: formik.values?.current_medication,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'nurse_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/patient-records')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'patient_record',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PatientRecordEditPage);
