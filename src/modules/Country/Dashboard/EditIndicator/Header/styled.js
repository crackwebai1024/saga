import styled from 'styled-components';

export const BackLink = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: 0;
  padding: 0;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.countryTheme.colors.mainColor};

  :hover {
    text-decoration-line: none;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: 3px;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth || null};
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;
