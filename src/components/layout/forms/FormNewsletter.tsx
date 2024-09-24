import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';

const FormNewsletter = () => {
  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('../api/sendEmail', data)
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
            subject: 'Novo contato via site: Newsletter ' + name,
            for: 'newsletter',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
              <Field type="text" name="nome" placeholder="Nome" className="py-2 px-4 w-full sm:w-1/2 mb-4 sm:mb-0" />
              <Error inputName="nome" />

              <Field type="email" name="email" placeholder="E-mail" className="py-2 px-4 w-full sm:w-1/2 mb-4 sm:mb-0" />
              <Error inputName="email" />

              <input
                type="submit"
                value="Enviar"
                className="py-2 px-4 bg-black text-green font-semibold uppercase w-full sm:w-auto hover:bg-transparent hover:border hover:border-black hover:text-black"
              />
            </div>

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

export default FormNewsletter;

interface IInitialValues {
  nome: string;
  email: string;
  termos: false;
}

const initialValues: IInitialValues = {
  nome: '',
  email: '',
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
  termos: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos.')
    .required('Aceite os termos.'),
});
