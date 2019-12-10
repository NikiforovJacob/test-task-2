import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import {
  ControlsContainer,
  ContentContainer,
  TableContainer,
  HeaderDescription,
  CardDescription,
  CardDescriptionContainer,
  ContentItemText,
  ContentItemBigText,
  ContentItemLink,
  ContentNamesOfColumns,
  ContentNameOfFirstColumn,
  ContentFirstCulumnContainer,
  ContentBodyTableContainer,
  ContentInner,
  ContentCap
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
      text: (value, i) => (
        <ContentItemText isDark={i % 2 === 0}>
          <ContentInner>
            {value}
          </ContentInner>
        </ContentItemText>
      ),
      date: (value, i) => (
        <ContentItemText isDark={i % 2 === 0}>
          <ContentInner>
            {value.replace('T', ' ').replace('Z', '')}
          </ContentInner>
        </ContentItemText>
      ),
      bigText: (value, i) => (
        <ContentItemBigText isDark={i % 2 === 0}>
          <ContentInner>
            {value}
          </ContentInner>
        </ContentItemBigText>
      ),
      link: (value, i) => (
        <ContentItemLink href={value} isDark={i % 2 === 0}>
          <ContentInner>
            Link
          </ContentInner>
        </ContentItemLink>
      )
    };

    const namesOfColumnsComponents = openedCardData[0].filter(
      (item) => item.fieldName !== 'id'
    ).map(
      (item, i) => {
        if (i === 0) {
          return (
            <ContentNameOfFirstColumn>
              <ContentInner>
                {item.fieldName.toUpperCase()}
              </ContentInner>
            </ContentNameOfFirstColumn>
          );
        }
        return (
          <ContentNamesOfColumns>
            <ContentInner>
              {item.fieldName.toUpperCase()}
            </ContentInner>
          </ContentNamesOfColumns>
        );
      }
    );

    const firstFixedColumnComponents = openedCardData.map(
      (item, i) => getContentType[item[1].type](item[1].value, i)
    );

    const bodyTableDataComponents = openedCardData.map(
      (rowData, i) => rowData.map(
        (cellData, j) => (
          j === 1 || j === 2 ? null : getContentType[cellData.type](cellData.value, i)
        )
      )
    );

    const [firstColumnNameComponent, ...restColumnsNamesComponents] = namesOfColumnsComponents;
    const numOfColumnsTableBody = restColumnsNamesComponents.length;

    return (
      <TableContainer>
        <ContentFirstCulumnContainer>
          {[firstColumnNameComponent, ...firstFixedColumnComponents]}
        </ContentFirstCulumnContainer>
        <ContentBodyTableContainer numOfColumns={numOfColumnsTableBody}>
          {[restColumnsNamesComponents, ...bodyTableDataComponents]}
        </ContentBodyTableContainer>
      </TableContainer>
    );
  };

  renderCardContentLoading = () => (
    <ContentCap>Data is loading...</ContentCap>
  );

  renderCardContentError = () => (
    <ContentCap>Something went wrong. Sorry.</ContentCap>
  );

  render() {
    const { openedCardDescription, openedCardData, cardDataRequestState } = this.props;

    const getContentRender = {
      requested: this.renderCardContentLoading,
      finished: this.renderCardContent,
      failed: this.renderCardContentError
    };

    return (
      <>
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
          <HeaderDescription>{openedCardDescription.name}</HeaderDescription>
          <CardDescription>{openedCardDescription.description}</CardDescription>
        </CardDescriptionContainer>
        <ContentContainer>
          {getContentRender[cardDataRequestState](openedCardData)}
        </ContentContainer>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(CardContent);
