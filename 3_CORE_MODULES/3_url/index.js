const url = require('url');

const adress = 'https://meusite.com.br/catalogo?produtos=cadeira'
const parseUrl = new url.URL(adress);

console.log(parseUrl);

console.log('------------------------------')

console.log(parseUrl.searchParams);

console.log(parseUrl.searchParams.get('produtos'));