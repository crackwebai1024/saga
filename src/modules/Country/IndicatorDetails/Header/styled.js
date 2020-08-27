import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const BackLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-right: 10px;
  margin-top: 1px;

  @media print {
    display: none;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid #cfcfcf88;
`;

export const UpdateLogWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;

export const TitleBox = styled.div`
  margin-top: 3px;
`;

export const ValuesBox = styled.div`
  margin-left: 40px;
  margin-right: 25px;
`;

export const SelectBox = styled.div`
  margin-left: 22px;

  @media print {
    svg {
      display: none;
    }
  }
`;

export const LeftContainer = styled.div`
  display: flex;
`;

export const RightContainer = styled.div`
  display: flex;
`;

export const Calendar = styled.div`
  margin: 0 5px;
  margin-left: 20px;

  && label + .MuiInput-formControl {
    margin-top: 36px;
  }
`;
