import prepearingCardData from './utils';

const generateUrlQuery = (url, num) => `${url}/${num}/`;

const configSource1 = {
  url: 'https://pokeapi.co/api/v2/pokemon',
  generateUrlQuery,
  genData: (data) => [
    {
      type: 'text',
      fieldName: 'id',
      value: data.id
    },
    {
      type: 'text',
      fieldName: 'Name',
      value: data.name
    },
    {
      type: 'text',
      fieldName: 'Height',
      value: data.height
    },
    {
      type: 'text',
      fieldName: 'Weight',
      value: data.weight
    }
  ]
};

const configSource2 = {
  url: 'https://pokeapi.co/api/v2/pokemon-species',
  generateUrlQuery,
  genData: (data) => [
    {
      type: 'text',
      fieldName: 'Gender differences',
      value: data.has_gender_differences ? 'has' : "hasn't"
    }
  ]
};

export default prepearingCardData('Pokemons', 'Some pokemons characteristics', [configSource1, configSource2]);
