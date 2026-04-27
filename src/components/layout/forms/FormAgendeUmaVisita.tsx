import { Field, Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { axiosInstance } from '../../../lib/axios';
import Error from './Error';
import MensageApp from '../Mensage';

const FormAgendeUmaVisita = () => {
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
            subject: 'Novo contato via site: Agende-uma-visita',
            for: 'agende_uma_visita',
          };

          mutation.mutate(formData);
        }}
        validationSchema={Schema}
      >
        {() => (
          <Form className="w-full">
            <div className="flex flex-col gap-4">
              <div>
                <Field
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  className="py-2 px-4 w-full"
                />
                <Error inputName="nome" />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="py-2 px-4 w-full"
                />
                <Error inputName="email" />
              </div>

              <div>
                <Field
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp"
                  className="py-2 px-4 w-full"
                />
                <Error inputName="whatsapp" />
              </div>

              <div className="w-full">
                <div className="flex flex-col sm:flex-row items-start gap-4 w-max mx-auto">
                  <div className="flex flex-col gap-1">
                    <label>
                      <Field
                        type="checkbox"
                        name="termosCampanha"
                        id="termosCampanha"
                        className="mr-2"
                      />
                      Declaro que li e aceito os termos da campanha.
                    </label>
                    <Error inputName="termosCampanha" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>
                      <Field
                        type="checkbox"
                        name="politicaPrivacidade"
                        id="politicaPrivacidade"
                        className="inline-block mr-2"
                      />
                      Li e concordo com a
                      <a
                        href="/politica-de-privacidade"
                        className="ml-2 underline italic block lg:inline-block"
                      >
                        Política de Privacidade da Lupema
                      </a>
                    </label>
                    <Error inputName="politicaPrivacidade" />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Agende uma visita"
                disabled={mutation.isLoading}
                className="mx-auto mt-8 py-2 px-8 text-green font-semibold uppercase w-max bg-transparent border border-green hover:bg-green hover:text-white transition-all cursor-pointer"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAgendeUmaVisita;

interface IInitialValues {
  nome: string;
  email: string;
  whatsapp: string;
  termosCampanha: boolean;
  politicaPrivacidade: boolean;
}

const initialValues: IInitialValues = {
  nome: '',
  email: '',
  whatsapp: '',
  termosCampanha: false,
  politicaPrivacidade: false,
};

const Schema = yup.object().shape({
  nome: yup.string().min(2, 'Nome muito curto.').required('Campo requerido.'),
  email: yup.string().email('E-mail inválido.').required('Campo requerido.'),
  whatsapp: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      'WhatsApp inválido.'
    )
    .required('Campo requerido.'),
  termosCampanha: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos da campanha.')
    .required(),

  politicaPrivacidade: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar a política de privacidade.')
    .required(),
});
