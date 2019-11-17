import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

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
      <div onClick={this.handleSetOpenedCard(cardData)}>
        <div>{name}</div>
        <div>{description}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Card);
