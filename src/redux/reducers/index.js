import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import omit from 'ramda/src/omit';
import without from 'ramda/src/without';
import * as actions from '../actions';
import { saveObjectToSessionStorage } from '../../utils/utils';

const users = handleActions({
  [actions.initializeUsersState](state, { payload: { appDataUsers } }) {
    return appDataUsers;
  },
  [actions.addUser](state, { payload: { user } }) {
    const { byId, allIds } = state;
    const newState = {
      ...state,
      byId: { ...byId, [user.id]: user },
      allIds: [user.id, ...allIds]
    };
    saveObjectToSessionStorage('appDataUsers', newState);
    return newState;
  },
  [actions.editUser](state, { payload: { user } }) {
    const { byId } = state;
    const newState = {
      ...state,
      byId: { ...byId, [user.id]: user }
    };
    saveObjectToSessionStorage('appDataUsers', newState);
    return newState;
  },
  [actions.removeUser](state, { payload: { id, isActive } }) {
    const { byId, allIds } = state;
    if (isActive) {
      const newState = {
        ...state,
        byId: omit([id], byId),
        allIds: without([id], allIds),
        activeUserID: null
      };
      saveObjectToSessionStorage('appDataUsers', newState);
      return newState;
    }
    const newState = {
      ...state,
      byId: omit([id], byId),
      allIds: without([id], allIds)
    };
    saveObjectToSessionStorage('appDataUsers', newState);
    return newState;
  },
  [actions.activateUser](state, { payload: { id } }) {
    const newState = {
      ...state,
      activeUserID: id
    };
    saveObjectToSessionStorage('appDataUsers', newState);
    return newState;
  }
}, {
  byId: {},
  allIds: [],
  activeUserID: null
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

  [actions.activateUser](state) {
    return {
      ...state,
      openedCardDescription: null,
      isActiveUserSelectorsShown: false
    };
  },
  [actions.removeUser](state, { payload: { id, isActive } }) {
    const { settingsEdittableUser, settingsUIState } = state;
    if (id === settingsEdittableUser) {
      return {
        ...state,
        settingsUIState: 'addUser',
        settingsEdittableUser: null
      };
    }
    if (isActive && settingsUIState === 'activeUser') {
      return {
        ...state,
        settingsUIState: 'addUser'
      };
    }
    return state;
  },


  [actions.setOpenedCard](state, { payload: { openedCardDescription } }) {
    return {
      ...state,
      openedCardDescription
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
  },


  [actions.hideActiveUserSelectors](state) {
    return {
      ...state,
      isActiveUserSelectorsShown: false
    };
  },
  [actions.toggleShownActiveUserSelectors](state) {
    const { isActiveUserSelectorsShown } = state;
    return {
      ...state,
      isActiveUserSelectorsShown: !isActiveUserSelectorsShown
    };
  }


}, {
  settingsUIState: 'addUser',
  settingsEdittableUser: null,
  openedCardDescription: null,
  isActiveUserSelectorsShown: false
});

export default combineReducers({
  form: formReducer,
  users,
  authorization,
  cardDataState,
  uiState
});
