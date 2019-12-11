import { createSelector } from 'reselect';
import { matchCardsDescriptionsByIDs } from '../../Data/data';

const getAuthorizationState = (state) => state.authorization;

export const authorizationSelector = createSelector(
  getAuthorizationState,
  (authorizationState) => authorizationState.isAuthorized
);


const getUiState = (state) => state.uiState;

export const openedCardDescriptionSelector = createSelector(
  getUiState,
  (uiState) => uiState.openedCardDescription
);
export const isActiveUserSelectorsShownSelector = createSelector(
  getUiState,
  (uiState) => uiState.isActiveUserSelectorsShown
);
export const settingsUIStateSelector = createSelector(
  getUiState,
  (uiState) => uiState.settingsUIState
);
export const settingsEdittableUserSelector = createSelector(
  getUiState,
  (uiState) => uiState.settingsEdittableUser
);


const getUsersState = (state) => state.users;

export const showedCardsSelector = createSelector(
  getUsersState,
  ({ byId, activeUserID }) => {
    if (!Object.prototype.hasOwnProperty.call(byId, activeUserID)) {
      return { showedCards: [] };
    }
    const activeUserCardsIDs = byId[activeUserID].userCardsIDs;
    return matchCardsDescriptionsByIDs(activeUserCardsIDs);
  }
);
export const usersSelector = createSelector(
  getUsersState,
  ({ byId, allIds }) => allIds.map((id) => byId[id])
);
export const usersIdsSelector = createSelector(
  getUsersState,
  ({ allIds }) => allIds
);
export const activeUserIDSelector = createSelector(
  getUsersState,
  ({ activeUserID }) => activeUserID
);
export const activeUserSelector = createSelector(
  getUsersState,
  ({ byId, activeUserID }) => ((activeUserID === null) ? null : byId[activeUserID])
);


const getCardDataState = (state) => state.cardDataState;

export const openedCardDataSelector = createSelector(
  getCardDataState,
  (cardDataState) => cardDataState.openedCardData
);
export const cardDataRequestSelector = createSelector(
  getCardDataState,
  (cardDataState) => cardDataState.cardDataRequestState
);


const state = (s) => s;

export const editableUserSelector = createSelector(
  state,
  ({ users, uiState }) => users.byId[uiState.settingsEdittableUser]
);
