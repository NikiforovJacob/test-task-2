import pokemons from './sourcePokemons';
import spaceX from './sourceSpaceX';
import sourceCoinMarketCap from './sourceCoinMarketCap';
import sourceFiled from './sourceFiled';

const allCardsSources = {
  1: pokemons,
  2: spaceX,
  3: sourceCoinMarketCap,
  4: sourceFiled
};

export const selectCardsIDs = (amountOfSources) => {
  const allCardsSourcesKeys = Object.keys(allCardsSources);
  const iter = (acc, keys) => {
    if (acc.length === amountOfSources) {
      return acc;
    }
    const randomNumOfSource = Math.floor(Math.random() * keys.length);
    const newAllCardsSourcesHead = keys.slice(0, randomNumOfSource);
    const newAllCardsSourcesReast = keys.slice(
      randomNumOfSource + 1, keys.length
    );
    const newAllCardsSources = [...newAllCardsSourcesHead, ...newAllCardsSourcesReast];
    return iter([...acc, keys[randomNumOfSource]], newAllCardsSources);
  };
  return iter([], allCardsSourcesKeys);
};

export const matchCardsDescriptionsByIDs = (selectedIDs) => selectedIDs.map(
  (id) => allCardsSources[id]
);
