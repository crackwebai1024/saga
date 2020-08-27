import styled from 'styled-components';

export const Wrapper = styled.div`
`;

export const Inner = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const Value = styled.div`
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: -0.14px;
  margin-left: 9px;
  margin-top: -2px;
  color: ${({ color }) => color};
`;

export const NoValue = styled.span`
  && {
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const Target = styled.div`
  margin-top: 3px;
`;

export const TargetValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const TotalLabel = styled.label`
  display: block;
  font-size: 13px;
  line-height: 1.33;
  font-weight: 500;
  letter-spacing: 0.07px;
  color: ${({ theme }) => theme.colors.labelColor || '#212121'};
`;
