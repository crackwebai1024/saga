import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  display: flex;
  flex-direction: column;
`;

export const Legend = styled.div`
  margin-top: auto;
`;
