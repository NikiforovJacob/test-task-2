import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const mapStateToProps = (state) => {
  const {
    cardDataState: {
      openedCardData,
      cardDataRequestState
    },
    uiState: {
      openedCardDescription
    }
  } = state;
  return { openedCardDescription, openedCardData, cardDataRequestState };
};

const actionCreators = {
  closeCard: actions.closeCard
};

class CardContent extends Component {

  handleCloseCard = () => {
    const { closeCard } = this.props;
    closeCard();
  }

  renderCardContent = (openedCardData) => {
    return (
      <div>
        {openedCardData.map(
          (rowData) => rowData.map(
            (cellData) => (
              <div>{cellData.value}</div>
            )
          )
        )}
      </div>
    );
  };

  renderCardContentLoading = () => {
    return (
      <div>Data is loading</div>
    );
  };

  renderCardContentError = () => {
    return (
      <div>Something went wrong. Sorry.</div>
    );
  }

  render() {
    const { openedCardDescription, openedCardData, cardDataRequestState } = this.props;
    const getContentRender = {
      requested: this.renderCardContentLoading,
      finished: this.renderCardContent,
      failed: this.renderCardContentError
    };

    return (
      <div>
        <div onClick={this.handleCloseCard}>Go back</div>
        <div>{openedCardDescription.name}</div>
        <div>{openedCardDescription.description}</div>
        {getContentRender[cardDataRequestState](openedCardData)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(CardContent);
