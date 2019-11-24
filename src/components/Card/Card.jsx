import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, CardIcon, CardName, CardDescription } from './CardStyle';

const mapStateToProps = () => ({});

const actionCreators = {
  updateCardData: actions.updateCardData,
};

class Card extends Component {

  handleSetOpenedCard = (cardData) => () => {
    const { updateCardData } = this.props;
    updateCardData(cardData);
  }

  render() {
    const { cardData } = this.props;
    const { name, description } = cardData;
    return (
      <Container onClick={this.handleSetOpenedCard(cardData)}>
        <CardIcon>
          <img
            src="src/icons/archive.svg"
            alt="card icon"
            height="65px"
            width="65px"
          />
        </CardIcon>
        <CardName>{name}</CardName>
        <CardDescription>{description}</CardDescription>
      </Container>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Card);
