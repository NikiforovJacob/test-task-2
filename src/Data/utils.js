import flatten from 'ramda/src/flatten';

const allPromises = (from, to, configsSources) => {
  const preItems = [...Array(to + 1).keys()].slice(from, to + 1);
  const promisesCollections = preItems.map(
    (num) => configsSources.map(
      (config) => fetch(config.generateUrlQuery(config.url, num, from, to))
    )
  );
  return flatten(promisesCollections);
};

const getData = (allConfigsSources) => (from, to, cb) => {
  Promise.all(allPromises(from, to, allConfigsSources))
    .then(
      (responses) => responses.map(
        (response) => response.json()
      )
    )
    .then(
      (promisese) => Promise.all(promisese)
        .then(

          (result) => {
            const prepearingData = (originData) => originData.reduce(
              (acc, d, i) => {
                const finishedData = allConfigsSources[(i % (allConfigsSources.length))].genData(d);
                if ((i % allConfigsSources.length) === 0) {
                  return [...acc, finishedData];
                }
                const lastAccEl = acc[acc.length - 1];
                const accWithoutLast = acc.slice(0, acc.length - 1);
                return [...accWithoutLast, [...lastAccEl, ...finishedData]];
              }, []
            );
            cb(prepearingData(result));
          }

        )
    )
    .catch((e) => console.error(e));
};

export default (name, description, allConfigsSources) => ({
  name,
  description,
  getData: getData(allConfigsSources)
});
