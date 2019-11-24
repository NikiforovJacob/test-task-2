import styled from '@emotion/styled';

export const Frame = styled.div`
  background-color: #ecf1f5;
  min-height: 100%;
`;

export const Header = styled.div`
  background-color: #2b3245;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 2px 5px #797272;
  position: sticky;
  top: 0px;
`;

export const UsersList = styled.ul`
  margin: 0px;
  padding: 0px;
  background-color: #2b3245;
  position: fixed;
  top: 60px;
  right: 70px;
  width: auto;
  list-style: none;
  color: #ecf1f5;
`;

export const UserSelector = styled.li`
  color: #ecf1f5;
  height: 45px;
  margin: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  padding: 5px 15px;
  max-width: 400px;
  box-shadow: 0px 2px 5px #797272;
  background-color: ${({ isActiveUser }) => isActiveUser ? '#444c62' : '#2b3245'};
`;

export const UserSelectorName = styled.div`
  margin: 0px 10px; 
  font-family: arial;
`;

export const Container = styled.div`
  height: 100%;
`;

export const Footer = styled.div`
  height: 40px;
  background-color: #2b3245;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ecf1f5;
  box-shadow: 0px -2px 5px #797272;
`;

export const SettingsIconBox = styled.div`
  margin-right: 20px;
`;

export const UserIconBox = styled.div`
  margin-right: 30px;
  ${({ usersLength }) => usersLength === 0 ? 'filter: grayscale(0.75);' : ''}
  }
  cursor: pointer;
`;

export const LinkChangeColor = styled.a`
  color: ${({ color }) => color}
`;
