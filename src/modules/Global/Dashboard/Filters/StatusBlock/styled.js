import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Title = styled.div`
  font-size: 15px;
  letter-spacing: 0.08px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 5px;
`;
