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
  const iter = (acc, allCardsSourcesKeys) => {
    if (acc.length === amountOfSources) {
      return acc;
    }
    const randomNumOfSource = Math.floor(Math.random() * allCardsSourcesKeys.length);
    const newAllCardsSourcesHead = allCardsSourcesKeys.slice(0, randomNumOfSource);
    const newAllCardsSourcesReast = allCardsSourcesKeys.slice(
      randomNumOfSource + 1, allCardsSourcesKeys.length
    );
    const newAllCardsSources = [...newAllCardsSourcesHead, ...newAllCardsSourcesReast];
    return iter([...acc, allCardsSourcesKeys[randomNumOfSource]], newAllCardsSources);
  };
  return iter([], allCardsSourcesKeys);
};

export const matchCardsDescriptionsByIDs = (selectedIDs) => selectedIDs.map(
  (id) => allCardsSources[id]
);
