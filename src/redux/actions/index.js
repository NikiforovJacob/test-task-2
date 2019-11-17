import { createAction } from 'redux-actions';

export const addUser = createAction('USER_ADD');
export const removeUser = createAction('USER_REMOVE');
export const editUser = createAction('USER_EDIT');
export const activateUser = createAction('USER_ACTIVATE');

export const authorize = createAction('AUTHORIZATION_TOGGLE');

export const setOpenedCard = createAction('CARD_OPENED_SET');
export const closeCard = createAction('CARD_CLOSE');

export const onActiveUserSettingsView = createAction('SETTINGS_VIEW_ACTIVE_USER');
export const onAddUserSettingsView = createAction('SETTINGS_VIEW_ADD_USER');
export const onEditUserSettingsView = createAction('SETTINGS_VIEW_EDIT_USER');

export const updateCardDataRequest = createAction('CARD_DATA_UPDATE_REQUEST');
export const updateCardDataSuccess = createAction('CARD_DATA_UPDATE_SUCCESS');
export const updateCardDataFailure = createAction('CARD_DATA_UPDATE_FAILURE');

export const updateCardData = (openedCardDescription) => async (dispatch) => {
  dispatch(setOpenedCard({ openedCardDescription }));
  dispatch(updateCardDataRequest());
  const cb = (openedCardData) => dispatch(updateCardDataSuccess({ openedCardData }));
  const cbError = () => dispatch(updateCardDataFailure());
  openedCardDescription.getData(1, 5, cb, cbError);
};
