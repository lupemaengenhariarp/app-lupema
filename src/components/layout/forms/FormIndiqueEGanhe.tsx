import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';
import Link from 'next/link';
import { RootQueryToEmpreendimentoConnection } from '../../../generated';

type Props = {
  empreendimentos: RootQueryToEmpreendimentoConnection;
  file: string;
};

const FormIndiqueEGanhe = ({ empreendimentos, file }: Props) => {
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
            subject: 'Novo contato via site: Indique e Ganhe',
            for: 'indique-ganhe',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex flex-col w-full space-y-8 [&>label]:text-white">
                <h4 className="text-green uppercase text-base tracking-[5px]">
                  SEUS DADOS
                </h4>
                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="nome" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="cpf" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="email" />
                </div>

                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="tel"
                    name="whatsapp"
                    placeholder="WhatsApp"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="whatsapp" />
                </div>
              </div>

              <div className="flex flex-col w-full space-y-8 [&>label]:text-white mt-8 sm:mt-0">
                <h4 className="text-green uppercase text-base tracking-[5px]">
                  INDIQUE UM AMIGO
                </h4>
                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="text"
                    name="nomeIndicado"
                    placeholder="Nome do indicado"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="nomeIndicado" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Field
                    type="tel"
                    name="whatsappIndicado"
                    placeholder="WhatsApp do indicado"
                    className="border-[#2C2C2C]"
                  />
                  <Error inputName="whatsappIndicado" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Field
                    as="select"
                    name="empreendimento"
                    className="w-full border-[#2C2C2C]"
                  >
                    <option value="">Empreendimento de interesse</option>
                    {empreendimentos?.nodes.map((empreendimento, index) => (
                      <option
                        key={index}
                        value={
                          empreendimento?.empreendimento?.nomeDoEmpreendimento
                        }
                      >
                        {empreendimento?.empreendimento?.nomeDoEmpreendimento}
                      </option>
                    ))}
                  </Field>
                  <Error inputName="empreendimento" />
                </div>
                <div className="flex flex-col gap-2">
                  <label>
                    <Field
                      type="checkbox"
                      name="termosCampanha"
                      className="inline-block mr-2"
                    />
                    <span className="text-black">
                      Declaro que li e aceito os termos da campanha.
                    </span>
                  </label>
                  <Error inputName="termosCampanha" />

                  <label>
                    <Field
                      type="checkbox"
                      name="politicaPrivacidade"
                      className="inline-block mr-2"
                    />
                    <span className="text-black">Li e concordo com a</span>
                    <a
                      href="/politica-de-privacidade"
                      className="ml-2 underline italic text-black hover:text-green"
                    >
                      Política de Privacidade da Lupema.
                    </a>
                  </label>
                  <Error inputName="politicaPrivacidade" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-9 items-start sm:items-center w-full  sm:w-max mx-auto mt-10">
              <a
                href={file}
                download
                className="uppercase border border-black py-3 px-8 w-full text-center sm:w-max block mx-auto text-black hover:bg-green hover:border-green transition-all cursor-pointer"
              >
                baixar Regulamento
              </a>
              <input
                type="submit"
                value="INDICAR AGORA"
                disabled={mutation.isLoading}
                className="bg-green text-black text-lg font-semibold px-8 py-[10px] cursor-pointer w-full sm:w-max"
              />
              <Link
                href="/politica-de-privacidade"
                className="uppercase border border-black py-3 px-8 w-full text-center sm:w-max block mx-auto text-black hover:bg-green hover:border-green transition-all cursor-pointer"
              >
                Política de Privacidade
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormIndiqueEGanhe;

interface IInitialValues {
  nome: string;
  cpf: string;
  email: string;
  whatsapp: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  empreendimento: string;
  termosCampanha: boolean;
  politicaPrivacidade: boolean;
}

const initialValues: IInitialValues = {
  nome: '',
  cpf: '',
  email: '',
  whatsapp: '',
  nomeIndicado: '',
  whatsappIndicado: '',
  empreendimento: '',
  termosCampanha: false,
  politicaPrivacidade: false,
};

const Schema = yup.object().shape({
  nome: yup.string().required('Campo requerido.'),

  cpf: yup
    .string()
    .matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, 'CPF inválido.')
    .required('Campo requerido.'),

  email: yup.string().email('E-mail inválido.').required('Campo requerido.'),

  whatsapp: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      'WhatsApp inválido.'
    )
    .required('Campo requerido.'),

  nomeIndicado: yup.string().required('Campo requerido.'),

  whatsappIndicado: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      'WhatsApp inválido.'
    )
    .required('Campo requerido.'),

  empreendimento: yup.string().required('Campo requerido.'),

  termosCampanha: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos da campanha.')
    .required(),

  politicaPrivacidade: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar a política de privacidade.')
    .required(),
});
