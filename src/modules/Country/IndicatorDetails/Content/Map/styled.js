import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Wrapper = styled.div`
  margin-top: 31px;
  padding-bottom: 36px;
  border-bottom: solid 1px #cfcfcf88;
`;

export const MapContainer = styled.div`
  margin-top: 36px;
  height: 280px;
  transition: height 0.3s ease-in-out;

  @media screen and (min-width: 480px) {
    height: 390px;
  }

  @media screen and (min-width: 640px) {
    height: 450px;
  }

  @media screen and (min-width: 768px) {
    height: 510px;
  }

  @media screen and (min-width: 1024px) {
    height: 900px;
  }

  @media print {
    height: 900px;
  }
`;

export const Container = styled.div`
  height: 100%;
`;

export const MapElement = styled.div`
  height: 100%;
`;

export const Loading = styled.div`
  height: 100%;
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
  margin-top: 17px;
`;
