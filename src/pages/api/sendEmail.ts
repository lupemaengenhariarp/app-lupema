import type { NextApiRequest, NextApiResponse } from 'next';
import * as SibApivV3Sdk from '@sendinblue/client';
import { genEmailFaleConosco } from '../../mjml/generates/faleConosco';
import { genEmailSejaFornecedor } from '../../mjml/generates/sejaFornecedor';
import { genEmailCadastroImobiliarias } from '../../mjml/generates/cadastroImobiliarias';
import { genEmailOferecaSuaArea } from '../../mjml/generates/oferecaSuaArea';
import { genEmailTrabalheConosco } from '../../mjml/generates/trabalheConosco';
import { genEmailEmpreendimento } from '../../mjml/generates/empreendimento';
import { genEmailApresentacao } from '../../mjml/generates/apresentacao';

const api_key = `${process.env.VERCEL_ENV === 'production'
  ? process.env.SENDINBLUE_KEY
  : process.env.NEXT_PUBLIC_SENDINBLUE_KEY
  }`;

const clientMail = new SibApivV3Sdk.TransactionalEmailsApi();
const ccRecipient = new SibApivV3Sdk.SendSmtpEmailCc();

clientMail.setApiKey(
  SibApivV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  api_key
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyData = req.body;

  let emailTo = '';
  let emailHTML = '';
  let emailCc = '';

  switch (bodyData?.for) {
    case 'fale_conosco':
      // emailTo = bodyData.email;
      emailTo = 'lupema@lupemaengenharia.com.br';
      emailCc = '';
      emailHTML = await genEmailFaleConosco(bodyData);
      break;
    case 'seja_fornecedor':
      // emailTo = bodyData.email;
      emailTo = 'suprimentos@lupemaengenharia.com.br';
      emailCc = '';
      emailHTML = await genEmailSejaFornecedor(bodyData);
      break;
    case 'cadastro_imobiliarias':
      emailTo = bodyData.email;
      emailCc = 'comercial@lupemaengenharia.com.br';
      emailHTML = await genEmailCadastroImobiliarias(bodyData);
      break;
    case 'ofereca_sua_area':
      emailTo = bodyData.email;
      emailCc = 'comercial@lupemaengenharia.com.br';
      emailHTML = await genEmailOferecaSuaArea(bodyData);
      break;
    case 'trabalhe_conosco':
      emailTo = bodyData.email;
      emailCc = 'rh@lupemaengenharia.com.br';
      emailHTML = await genEmailTrabalheConosco(bodyData);
      break;
    case 'empreendimento':
      emailTo = bodyData.email;
      emailCc = 'comercial@lupemaengenharia.com.br';
      emailHTML = await genEmailEmpreendimento(bodyData);
      break;
    case 'apresentacao':
      emailTo = bodyData.email;
      emailCc = 'lupema@lupemaengenharia.com.br';
      emailHTML = await genEmailApresentacao(bodyData);
      break;
  }

  await clientMail
    .sendTransacEmail({
      to: [{ name: 'Lupema', email: `${emailTo}` }],
      bcc: [{ name: 'Lupema', email: `${emailCc}` }],
      sender: { name: 'Lupema', email: 'lupema@lupemaengenharia.com.br' },
      subject: bodyData?.subject,
      htmlContent: emailHTML,
    })
    .then((response) => res.send({ success: true }))
    .catch((err) => res.send({ success: false }));
}
