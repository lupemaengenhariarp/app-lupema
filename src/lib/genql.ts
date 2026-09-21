import { createClient } from '../generated';

const ClientApp = createClient({
  url: 'https://painel.lupemaengenharia.com.br/index.php?graphql',
})

export default ClientApp;
