import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 24px;
`;

export const SelectWrapper = styled.div`
  margin-right: 22px;
  width: ${({ width = '208px' }) => width};

  @media print {
    svg {
      display: none;
    }
  }
`;

export const Status = styled.div`
`;
