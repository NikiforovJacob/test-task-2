import prepearingCardData from './fetcherData';

const generateUrlQuery = (url, num) => `${url}/${num}/`;

const configSource1 = {
  url: 'https://filed',
  generateUrlQuery,
  genData: () => []
};

export default prepearingCardData('Filed', 'Filed source for testing', [configSource1]);
