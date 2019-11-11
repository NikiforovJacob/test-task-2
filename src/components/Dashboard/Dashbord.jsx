import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Card from '../Card/Card';

const mapStateToProps = (state) => {
  const { cards: { showedCards, openedCard } } = state;
  return { showedCards, openedCard };
};

const actionCreators = {
  addUser: actions.addUser,
  removeUser: actions.removeUser
};

class Dashbord extends Component {
  handleSetOpenedCard = (name) => () => {
    console.log(name);
    const { setOpenedCard } = this.props;
    setOpenedCard({ name });
  }

  renderCards = (showedCards) => showedCards.map(
    (cardData) => (
      <Card
        key={cardData.name}
        cardData={cardData}
        onClick={this.handleSetOpenedCard(cardData.name)}
      />
    )
  )

  render() {
    const { showedCards } = this.props;
    return (
      <div>
        {showedCards.length === 0 ? 'выбирите пользователя' : this.renderCards(showedCards)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Dashbord);
