import pokemons from './sourcePokemons';
import spaceX from './sourceSpaceX';
import sourceCoinMarketCap from './sourceCoinMarketCap';
import sourceFiled from './sourceFiled';

const allCardsSources = [pokemons, spaceX, sourceCoinMarketCap, sourceFiled];

const getSources = (allCardsSources) => (amountOfSources) => {
  const iter = (acc, allCardsSources) => {
    if (acc.length === amountOfSources) {
      return acc;
    }
    const numOfSource = Math.floor(Math.random() * allCardsSources.length);
    const newAllCardsSourcesHead = allCardsSources.slice(0, numOfSource);
    const newAllCardsSourcesReast = allCardsSources.slice(numOfSource + 1, allCardsSources.length);
    const newAllCardsSources = [...newAllCardsSourcesHead, ...newAllCardsSourcesReast];
    return iter([...acc, allCardsSources[numOfSource]], newAllCardsSources);
  };
  return iter([], allCardsSources);
};

export default getSources(allCardsSources);
