import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import { IoMdClose } from 'react-icons/io';

interface Props {
  setValue: (value: string) => void;
  file: string | undefined;
}

const FormDownloadApresentation = ({ setValue, file }: Props) => {
  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('../api/sendEmail', data);
  });

  if (mutation.isSuccess) {
    setValue('send');
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black/75">
      <div className="bg-green p-8 text-white max-w-[420px] relative">
        <button
          onClick={() => setValue('close')}
          className="absolute top-4 right-4 w-[30px]"
        >
          <IoMdClose size={20} className="hover:rotate-90 transition-all" />
        </button>
        <p className="mt-6 text-lg mb-3">
          Cadastre-se para receber a apresentação completa do empreendimento do
          seu interesse.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={(data) => {
            let formData = {
              ...data,
              pdf: file,
              data: new Date().toLocaleString(),
              subject: 'Novo contato via site: Baixar Apresentação',
              for: 'apresentacao',
            };

            mutation.mutate(formData);
          }}
          validationSchema={Schema}
        >
          {() => (
            <Form className="form">
              <Field
                type="text"
                name="nome"
                placeholder="Nome"
                className="mt-4"
              />
              <Error inputName="nome" />

              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className="mt-4"
              />
              <Error inputName="email" />

              <Field
                type="tel"
                name="telefone"
                placeholder="Telefone"
                className="mt-4 inline-block"
              />
              <Error inputName="telefone" />

              <label htmlFor="aceitepdf" className="mt-4 inline-block">
                <Field type="checkbox" name="termos" id="aceitepdf" />
                <span className="ml-2">
                  Li e concordo com a
                  <a
                    href="/politica-de-privacidade"
                    className="ml-2 underline italic"
                  >
                    política de privacidade
                  </a>
                </span>
              </label>
              <Error inputName="termos" />

              <button
                type="submit"
                className="bg-black text-white uppercase font-semibold mt-4 block w-full py-2"
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormDownloadApresentation;

interface IInitialValues {
  pdf: string | undefined;
  nome: string;
  email: string;
  telefone: string;
  termos: boolean;
}

const initialValues: IInitialValues = {
  pdf: '',
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
