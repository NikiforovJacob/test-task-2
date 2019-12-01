import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import {
  ControlsContainer,
  ContentContainer,
  Header,
  CardDescription,
  CardDescriptionContainer,
  ContentItemText,
  ContentItemBigText,
  ContentItemLink,
  ContentNamesOfColumns
} from './CardContentStyle';

import iconUndo from '../../icons/undo.svg';

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

    const getContentType = {
      text: (value) => <ContentItemText>{value}</ContentItemText>,
      date: (value) => <ContentItemText>{value.replace('T', ' ').replace('Z', '')}</ContentItemText>,
      bigText: (value) => <ContentItemBigText>{value}</ContentItemBigText>,
      link: (value) => <ContentItemLink href={value}>Link</ContentItemLink>
    };

    const namesOfColumnsComponents = openedCardData[0].filter(
      (item) => item.fieldName !== 'id'
    ).map(
      (item) => (<ContentNamesOfColumns>{item.fieldName.toUpperCase()}</ContentNamesOfColumns>)
    );

    const numOfColumns = namesOfColumnsComponents.length;

    return (
      <ContentContainer numOfColumns={numOfColumns}>
        {namesOfColumnsComponents}
        {openedCardData.map(
          (rowData) => rowData.map(
            (cellData) => cellData.fieldName === 'id' ? null : getContentType[cellData.type](cellData.value)
          )
        )}
      </ContentContainer>
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
        <ControlsContainer>
          <a onClick={this.handleCloseCard}>
            <img
              src={iconUndo}
              alt="settings icon"
              height="35px"
              width="35px"
            />
          </a>
        </ControlsContainer>
        <CardDescriptionContainer>
          <Header>{openedCardDescription.name}</Header>
          <CardDescription>{openedCardDescription.description}</CardDescription>
        </CardDescriptionContainer>
        {getContentRender[cardDataRequestState](openedCardData)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(CardContent);
