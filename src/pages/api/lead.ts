async function getRDAccessToken() {
  const response = await fetch(
    'https://api.rd.services/auth/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.RD_CLIENT_ID,
        client_secret: process.env.RD_CLIENT_SECRET,
        refresh_token: process.env.RD_REFRESH_TOKEN,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao gerar token RD');
  }

  const data = await response.json();

  return data.access_token;
}

export default async function sendToRD(bodyData: any) {
  const accessToken = await getRDAccessToken();

  const response = await fetch(
    'https://api.rd.services/platform/events?event_type=conversion',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        event_type: 'CONVERSION',
        event_family: 'CDP',
        payload: {
          conversion_identifier: bodyData.for === 'empreendimento' ? '/empreendimento/' + bodyData.empName : '/' + bodyData.for,

          name: bodyData.nome,
          email: bodyData.email,
          personal_phone: bodyData.telefone || bodyData.celular1
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Erro RD Station: ${error}`
    );
  }

  return response.json();
}
