import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import omit from 'ramda/src/omit';
import without from 'ramda/src/without';
import * as actions from '../actions';

const users = handleActions({
  [actions.addUser](state, { payload: { user } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [user.id]: user },
      allIds: [user.id, ...allIds]
    };
  },
  [actions.editUser](state, { payload: { user } }) {
    const { byId } = state;
    return {
      ...state,
      byId: { ...byId, [user.id]: user }
    };
  },
  [actions.removeUser](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: omit([id], byId),
      allIds: without([id], allIds)
    };
  },
  [actions.activateUser](state, { payload: { id } }) {
    return {
      ...state,
      activeUser: id
    };
  }
}, {
  byId: {},
  allIds: [],
  activeUser: null
});


const authorization = handleActions({
  [actions.authorize](state, { payload: { isAuthorized } }) {
    return {
      isAuthorized
    };
  }
}, { isAuthorized: false });


const cardDataState = handleActions({
  [actions.closeCard](state) {
    return {
      ...state,
      openedCardData: null
    };
  },
  [actions.updateCardDataRequest](state) {
    return {
      ...state,
      cardDataRequestState: 'requested'
    };
  },
  [actions.updateCardDataSuccess](state, { payload: { openedCardData } }) {
    return {
      ...state,
      cardDataRequestState: 'finished',
      openedCardData
    };
  },
  [actions.updateCardDataFailure](state) {
    return {
      ...state,
      cardDataRequestState: 'failed'
    };
  }
}, {
  cardDataRequestState: 'finished',
  openedCardData: null
});


const uiState = handleActions({
  [actions.setOpenedCard](state, { payload: { openedCardDescription } }) {
    return {
      ...state,
      openedCardDescription
    };
  },
  [actions.activateUser](state) {
    return {
      ...state,
      openedCardDescription: null
    };
  },
  [actions.closeCard](state) {
    return {
      ...state,
      openedCardDescription: null
    };
  },
  [actions.onActiveUserSettingsView](state) {
    return {
      ...state,
      settingsUIState: 'activeUser',
      settingsEdittableUser: null
    };
  },
  [actions.onAddUserSettingsView](state) {
    return {
      ...state,
      settingsUIState: 'addUser',
      settingsEdittableUser: null
    };
  },
  [actions.onEditUserSettingsView](state, { payload: { id } }) {
    return {
      ...state,
      settingsUIState: 'editUser',
      settingsEdittableUser: id
    };
  }
}, {
  settingsUIState: 'addUser',
  settingsEdittableUser: null,
  openedCardDescription: null
});

export default combineReducers({
  form: formReducer,
  users,
  authorization,
  cardDataState,
  uiState
});
