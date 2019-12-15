import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import iconCard from '../../icons/archive.svg';
import {
  Container,
  CardIcon,
  CardName,
  CardDescription
} from './CardStyle';

const actionCreators = {
  updateCardData: actions.updateCardData
};

const Card = (props) => {
  const { cardData } = props;
  const { name, description } = cardData;

  const handleSetOpenedCard = (data) => () => {
    const { updateCardData } = props;
    updateCardData(data);
  };

  return (
    <Container onClick={handleSetOpenedCard(cardData)}>
      <CardIcon>
        <img
          src={iconCard}
          alt="card icon"
          height="65px"
          width="65px"
        />
      </CardIcon>
      <CardName>{name}</CardName>
      <CardDescription>{description}</CardDescription>
    </Container>
  );
};

export default connect(() => ({}), actionCreators)(Card);
