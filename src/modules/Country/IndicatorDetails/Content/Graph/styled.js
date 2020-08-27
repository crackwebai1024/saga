import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled(Flex).attrs({
  flexDirection: 'column',
  fontSize: [20, 26, 32],
})`
  color: ${({ theme }) => theme.primaryBlack};
  width: 100%;
  margin-top: 31px;
  padding-bottom: 51px;
  border-bottom: solid 1px #cfcfcf88;
  margin-bottom: 31px;
`;

export const Content = styled(Flex).attrs({
  flexDirection: 'column',
})`
  height: 100%;
  position: relative;
  width: 100%;
`;

export const Row = styled(Flex).attrs({
  justifyContent: 'space-between',
  py: 20,
})`
  background-color: ${({ index = 0, theme }) => (index % 2 === 0 ? theme.primaryWhite : theme.secondaryLightBlue)};

  @media screen and (max-width: 480px) {
    display: block;
  }
`;

export const Select = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;

export const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.13px;
  color: ${({ theme }) => theme.colors.primaryDark};

  && > span {
    font-weight: 300;
  }
`;

export const Legend = styled.div`
  margin-top: 7px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
`;

export const LastUpdateNote = styled.div`
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.26px;
  color: ${({ theme }) => theme.colors.logGray};
  white-space: nowrap;
  padding-top: 15px;
`;

export const UpdateLogLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.logGray};
`;

export const SourceNote = styled.div`
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.26px;
  color: ${({ theme }) => theme.colors.logGray};
  white-space: nowrap;
  margin-top: 6px;
`;
