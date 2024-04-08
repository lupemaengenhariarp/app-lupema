import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';

const CadastroImobiCorretores = () => {
  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('api/sendEmail', data);
  });

  return (
    <div>
      <h1 className="text-2xl">Cadastro de imobiliárias e corretores</h1>
      {mutation.isSuccess && (
        <MensageApp
          text="Enviado com sucesso, obrigado pelo seu contato!"
          type="c_success"
        />
      )}
      {mutation.isError && (
        <MensageApp text="Erro ao enviar os dados." type="c_error" />
      )}
      {mutation.isLoading && <span className="text-white">Enviando...</span>}
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          let formData = {
            ...data,
            data: new Date().toLocaleString(),
            subject: 'Novo contato via site: Cadastro-imobiliárias',
            for: 'cadastro_imobiliarias',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="form grid grid-cols-1 gap-4 mt-4">
            <Field type="text" name="nome" placeholder="Nome" />
            <Error inputName="nome" />

            <Field type="email" name="email" placeholder="E-mail" />
            <Error inputName="email" />

            <Field type="tel" name="telefone" placeholder="Telefone" />
            <Error inputName="telefone" />

            <Field
              as="textarea"
              name="mensagem"
              row={5}
              placeholder="Mensagem"
            />
            <Error inputName="mensagem" />

            <input
              type="submit"
              value="Enviar"
              className="bg-green text-black uppercase font-semibold"
            />

            <label htmlFor="aceite">
              <Field type="checkbox" name="termos" id="aceite" />
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroImobiCorretores;

interface IInitialValues {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  termos: false;
}

const initialValues: IInitialValues = {
  nome: '',
  email: '',
  telefone: '',
  mensagem: '',
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
  mensagem: yup
    .string()
    .min(4, 'Mensagem inválida.')
    .required('Campo requerido.'),
  termos: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos.')
    .required('Aceite os termos.'),
});
