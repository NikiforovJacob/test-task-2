import React from 'react';
import { connect } from 'react-redux';
import { showedCardsSelector } from '../../redux/selectors';
import Card from '../Card/Card';
import { Container } from './DashbordStyle';

const mapStateToProps = (state) => {
  const { users: { byId, activeUserID } } = state;
  if (!Object.prototype.hasOwnProperty.call(byId, activeUserID)) {
    return { showedCards: null };
  }
  return { showedCards: showedCardsSelector(state) };
};

const Dashbord = (props) => {
  const { showedCards } = props;

  const renderCards = (card) => card.map(
    (cardData) => (
      <Card
        key={cardData.name}
        cardData={cardData}
      />
    )
  );

  return (
    <Container>
      {showedCards === null ? 'Please, add users in the settings and choose user in the question button' : renderCards(showedCards)}
    </Container>
  );
};

export default connect(mapStateToProps)(Dashbord);
