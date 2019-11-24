import styled from '@emotion/styled';

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContainerControls = styled.div`
  position: fixed;
  top: 0px;
  filter: grayscale(0.75);
  padding: 10px;
`;

export const ContainerUsersList = styled.div`
  width: 350px;
  padding: 30px 30px;
`;

export const UsersList = styled.ul`
  min-width: 250px;
  padding: 0px 0px;
`;

export const UsersItem = styled.li`
  width: 250px;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  font: ${({ isActive }) => isActive ? 'bold' : ''} 15px arial;
  align-items: center;
  margin: 10px 0px
`;

export const UsersItemButtonsContainer = styled.div`
  width: 95px;
  margin-right: 15px;
`;

export const ContentViewControlButtonsContainer = styled.div`
  width: 230px;
  margin: 0px auto;
`;

export const UserItemButton = styled.button`
  // margin-right: 15px;
  font: bold 14px Arial;
  background-color: ${({ color }) => color};
  :disabled {
    background-color: #b1b7c5;
    cursor: auto;
  }
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: ${({ position }) => 
    position === "left" ? '10px 0px 0px 10px' : '0px 10px 10px 0px'
  };
`;

export const ContainerUsersData = styled.div`
  width: 350px;
  padding: 30px 30px;
`;

export const Header = styled.div`
  font: bold 30px arial;
  margin-bottom: 40px;
  @media (min-width: 737px) {
    margin-top: 80px;
  }
  text-align: center;
`;
