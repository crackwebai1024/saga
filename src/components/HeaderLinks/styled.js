import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 24px;
`;

export const Item = styled(Link)`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  ${({ theme, iscountry }) => (
    `color: ${iscountry === 'yes' ? theme.countryTheme.colors.fontMainColor : theme.colors.primaryWhite};`
  )}
  opacity: 0.6;
  padding: 15px;
  text-decoration: none;

  :hover {
    opacity: 1;
  }
`;
