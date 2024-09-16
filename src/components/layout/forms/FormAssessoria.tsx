import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';

interface Props {
  name: string | undefined;
}

const FormAssessoria = () => {
  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('../api/sendEmail', data);
  });

  return (
    <>
      {mutation.isSuccess && (
        <MensageApp
          text="Enviado com sucesso, obrigado pelo seu contato!"
          type="success"
        />
      )}
      {mutation.isError && (
        <MensageApp text="Erro ao enviar os dados." type="error" />
      )}
      {mutation.isLoading && <span className="text-white">Enviando...</span>}
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          let formData = {
            ...data,
            data: new Date().toLocaleString(),
            subject: 'Novo contato via site: Assessoria ' + name,
            for: 'assessoria',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="flex flex-col w-full space-y-8 [&>label]:text-white">
            <Field type="text" name="nome" placeholder="Nome" />
            <Error inputName="nome" />

            <Field type="email" name="email" placeholder="E-mail" />
            <Error inputName="email" />

            <Field type="tel" name="telefone" placeholder="Telefone" />
            <Error inputName="telefone" />

            <input
              type="submit"
              value="Enviar"
              className="bg-green text-black text-lg font-bold"
            />

            <label htmlFor="aceite">
              <Field
                type="checkbox"
                name="termos"
                id="aceite"
                className="inline-block mr-2"
              />
              Li e concordo com a
              <a
                href="/politica-de-privacidade"
                className="ml-2 underline italic"
              >
                política de privacidade
              </a>
            </label>
            <Error inputName="termos" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAssessoria;

interface IInitialValues {
  nome: string;
  email: string;
  telefone: string;
  termos: false;
}

const initialValues: IInitialValues = {
  nome: '',
  email: '',
  telefone: '',
  termos: false,
};

const Schema = yup.object().shape({
  nome: yup
    .string()
    .matches(
      /^([a-zA-ZÀ-ÖØ-öø-ÿ])([a-zA-ZÀ-ÖØ-öø-ÿ]+)(\s)?([a-zA-ZÀ-ÖØ-öø-ÿ]+)([a-zA-ZÀ-ÖØ-öø-ÿ]+)(?:\s([a-zA-ZÀ-ÖØ-öø-ÿ]+))+$/,
      'Nome inválido.'
    )
    .required('Campo requerido.'),
  email: yup.string().email('E-mail inválido.').required('Campo requerido.'),
  telefone: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      'Telefone inválido.'
    )
    .required('Campo requerido.'),
  termos: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos.')
    .required('Aceite os termos.'),
});
