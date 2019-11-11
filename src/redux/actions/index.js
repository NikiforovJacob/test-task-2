import { createAction } from 'redux-actions';

export const addUser = createAction('USER_ADD');
export const removeUser = createAction('USER_REMOVE');
export const activateUser = createAction('USER_ACTIVATE');

export const setOpenedCard = createAction('CARD_OPENED_SET');

export const toggleAuthorization = createAction('AUTHORIZATION_TOGGLE');
