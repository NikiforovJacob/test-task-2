import React from 'react';

const Card = (props) => {
  const { cardData: { name, description } } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  );
};

export default Card;
