import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';

interface Props {
  setValue: (value: string) => void;
  file: string | undefined;
}

const FaleConosco = ({ setValue, file }: Props) => {
  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('../api/sendEmail', data);
  });

  // if (mutation.isSuccess) {
  //   setValue('send');
  // }

  return (
    <div>
      <h1 className="text-2xl">Fale conosco</h1>
      <p className="text-green">
        Entre em contato com a Lupema e tire suas dúvidas.
      </p>

      {mutation.isSuccess && (
        <MensageApp
          text="Enviado com sucesso, obrigado pelo seu contato!"
          type="c_success"
        />
      setValue('send');
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
            pdf: file,
            data: new Date().toLocaleString(),
            subject: 'Novo contato via site: fale-conosco',
            for: 'fale_conosco',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="form grid grid-cols-1 gap-4">
            <Field type="text" name="nome" placeholder="Nome" />
            <Error inputName="nome" />

            <Field type="email" name="email" placeholder="E-mail" />
            <Error inputName="email" />

            <Field type="tel" name="telefone" placeholder="Telefone" />
            <Error inputName="telefone" />

            <Field as="select" name="assunto">
              <option value="">Assunto</option>
              <option value="duvida">Dúvida</option>
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Fale com o Presidente</option>
              <option value="vizinho">Sou vizinho de uma obra</option>
              <option value="imprensa">Imprensa</option>
            </Field>
            <Error inputName="assunto" />

            <Field type="textarea" name="mensagem" row={4} placeholder="Mensagem" />
            <Error inputName="mensagem" />

            <label htmlFor="aceite">
              <Field type="checkbox" name="termos" id="aceite" />
              <span className="ml-2">Li e concordo com a
                <a href="/politica-de-privacidade" className="ml-2 underline italic"                >
                  política de privacidade
                </a>
              </span>
            </label>
            <Error inputName="termos" />

            <button type="submit" className="bg-green text-black uppercase font-semibold"  >
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FaleConosco;

interface IInitialValues {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  assunto: string | undefined;
  termos: false;
}

const initialValues: IInitialValues = {
  nome: '',
  email: '',
  telefone: '',
  mensagem: '',
  assunto: undefined,
  // assunto: '',
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
  assunto: yup
    .string()
    .oneOf(['duvida', 'sugestao', 'reclamacao', 'vizinho', 'imprensa'])
    .required('Campo requerido.'),
  termos: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos.')
    .required('Aceite os termos.'),
});