import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import { matchCardsDescriptionsByIDs } from '../../Data/data';
import { Container } from './DashbordStyle';

const mapStateToProps = (state) => {
  const { users: { byId, activeUserID } } = state;
  if (!Object.prototype.hasOwnProperty.call(byId, activeUserID)) {
    return { showedCards: [] };
  }
  const activeUserCardsIDs = byId[activeUserID].userCardsIDs;
  return { showedCards: matchCardsDescriptionsByIDs(activeUserCardsIDs) };
};

class Dashbord extends Component {

  renderCards = (showedCards) => showedCards.map(
    (cardData) => (
      <Card
        key={cardData.name}
        cardData={cardData}
      />
    )
  )

  render() {
    const { showedCards } = this.props;
    return (
      <Container>
        {showedCards.length === 0 ? 'выбирите пользователя' : this.renderCards(showedCards)}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Dashbord);
