export default () => null;
export const saveObjectToSessionStorage = (key, data) => sessionStorage
  .setItem(key, JSON.stringify(data));
export const getObjectFromSessionStorage = (key) => JSON.parse(sessionStorage.getItem(key));
