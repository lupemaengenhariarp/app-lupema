import { createClient } from '../generated';

const ClientApp = createClient({
  url: 'http://painel.lupemaengenharia.com.br/index.php?graphql',
})

export default ClientApp;
