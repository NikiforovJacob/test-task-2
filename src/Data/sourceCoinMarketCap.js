import prepearingCardData from './utils';

const generateUrlQuery = (url, num, from) => `${url}&start=${from + num - 1}&limit=1`;

const configSource1 = {
  url: 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=7f75a6d7-1b7c-4c3f-8581-e19f39527276',
  generateUrlQuery,
  genData: (data) => [
    {
      type: 'text',
      fieldName: 'id',
      value: data.data[0].id
    },
    {
      type: 'text',
      fieldName: 'Name',
      value: data.data[0].name
    },
    {
      type: 'text',
      fieldName: 'Circulating Supply, $',
      value: data.data[0].circulating_supply
    },
    {
      type: 'text',
      fieldName: 'Price, $',
      value: data.data[0].quote.USD.price
    },
    {
      type: 'text',
      fieldName: 'Change %/h',
      value: data.data[0].quote.USD.percent_change_1h
    },
    {
      type: 'text',
      fieldName: 'Change %/24h',
      value: data.data[0].quote.USD.percent_change_24h
    },
    {
      type: 'text',
      fieldName: 'Change %/7d',
      value: data.data[0].quote.USD.percent_change_7d
    }

  ]
};

export default prepearingCardData('CoinMarketCap', 'Some cryptocurrency characteristics', [configSource1]);
