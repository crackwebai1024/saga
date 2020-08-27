import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
`;

/* eslint-disable indent */
export const LinkContainer = styled.div`
  display: flex;
  outline: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  align-items: center;
  padding: 10px 20px;
  text-align: center;
  background-color:
    ${({ isselected, theme }) => (isselected === 'true'
      ? theme.colors.gray
      : theme.colors.primaryWhite
    )};

  @media screen and (max-width: 480px) {
    justify-content: space-around;
  }
`;
/* eslint-enable indent */

export const Header = styled.div`
  display: flex;
  border: 1px solid transparent;
  border-bottom: 0;
  border-right: 0;
  height: 35px;
  max-width: 430px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    height: 70px;
    max-width: 100%;
  }
`;

export const Body = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  overflow-y: auto;
  font-size: 14px;
  padding: 20px;
  max-height: 405px;
  max-width: 780px;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`;

export const StyledLink = styled(Link).attrs({

})`
  color: ${({ isselected, theme }) => (isselected === 'true' ? theme.colors.primaryWhite : theme.colors.gray)};
  cursor: pointer;
  font-weight: 800;
  font-size: 11px;
  text-decoration: none;
`;
