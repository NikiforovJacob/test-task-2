import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import omit from 'ramda/src/omit';
import without from 'ramda/src/without';
import * as actions from '../actions';
import cardsData from '../../Data/data';

const users = handleActions({
  [actions.addUser](state, { payload: { user } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [user.id]: user },
      allIds: [user.id, ...allIds]
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
}, { byId: {}, allIds: [], activeUser: null });

const authorization = handleActions({
  [actions.toggleAuthorization](state, { payload: { isAuthorized } }) {
    return {
      auth: isAuthorized
    };
  }
}, { auth: false });

const cards = handleActions({
  [actions.setOpenedCard](state, { payload: { openedCard } }) {
    return {
      ...state,
      openedCard
    };
  },
  [actions.activateUser](state) {
    return {
      ...state,
      showedCards: cardsData(3)
    };
  }
}, { showedCards: [], openedCard: null });

export default combineReducers({
  form: formReducer,
  users,
  authorization,
  cards
});
