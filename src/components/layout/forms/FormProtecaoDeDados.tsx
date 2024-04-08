import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import MensageApp from '../Mensage';
import Error from './Error';

const objetos = [
  'Acessar seus dados, podendo solicitá-los em uma cópia legível sob forma impressa ou por meio eletrônico, seguro e idôneo',
  'Corrigir seus dados, ao solicitar a edição, correção ou atualização destes',
  'imitar seus dados quando desnecessários, excessivos ou tratados em desconformidade com a legislação através da anonimização, bloqueio ou eliminação',
  'Solicitar a portabilidade de seus dados, através de um relatório de dados cadastrais que a (nome empresarial simplificado) trata a seu respeito, de acordo com a regulamentação da autoridade nacional, respeitados os segredos comercial e industrial',
  'Eliminar seus dados tratados a partir de seu consentimento, exceto nos casos previstos em lei',
  'Revogar seu consentimento, desautorizando o tratamento de seus dados',
  'Informar-se sobre quais entidades públicas e privadas o controlador realizou o uso compartilhado de dados',
  'Informar-se sobre a possibilidade de não fornecer seu consentimento e sobre as consequências da negativa',
];

const FormProtecarDeDados = () => {
  const [option, setOption] = useState(-1);

  const mutation = useMutation((data: IInitialValues) => {
    return axiosInstance.post('../api/sendEmail', data);
  });

  const list = objetos.map((element, index) => {
    return (
      <li
        key={index}
        className={`block my-3 border border-black/20 rounded-md py-2 px-3 relative cursor-pointer hover:bg-green ${
          option === index ? 'bg-green' : 'bg-white'
        }`}
        onClick={() => setOption(index)}
      >
        <span className="font-bold mr-2 text-lg">{index + 1}.</span>
        {element}
      </li>
    );
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
            subject: 'Novo contato via site: Empreendimento ' + name,
            for: 'empreendimento',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="form">
            <ul className="my-8 block">{list}</ul>
            <h2 className="text-xl font-bold mt-4">
              DADOS DO TITULAR SOLICITANTE
            </h2>
            <small className="italic mb-4 block">
              Dados necessário para localização perfeita do titular
            </small>

            <Field type="text" name="nome" placeholder="Nome" />
            <Error inputName="nome" />

            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className="my-4"
            />
            <Error inputName="email" />

            <Field type="tel" name="telefone" placeholder="Telefone" />
            <Error inputName="telefone" />

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

export default FormProtecarDeDados;

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
