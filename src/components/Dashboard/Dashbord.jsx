import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';

const mapStateToProps = (state) => {
  const { users: { byId, activeUser } } = state;
  if (!Object.prototype.hasOwnProperty.call(byId, activeUser)) {
    return { showedCards: [] };
  }
  return { showedCards: byId[activeUser].userCards };
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
      <div>
        {showedCards.length === 0 ? 'выбирите пользователя' : this.renderCards(showedCards)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashbord);
