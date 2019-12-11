import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showedCardsSelector } from '../../redux/selectors';
import Card from '../Card/Card';
import { Container } from './DashbordStyle';

const mapStateToProps = (state) => {
  const { users: { byId, activeUserID } } = state;
  if (!Object.prototype.hasOwnProperty.call(byId, activeUserID)) {
    return { showedCards: [] };
  }
  return { showedCards: showedCardsSelector(state) };
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
        {showedCards.length === 0 ? 'Please, add users in the settings and choose user in the question button' : this.renderCards(showedCards)}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Dashbord);
