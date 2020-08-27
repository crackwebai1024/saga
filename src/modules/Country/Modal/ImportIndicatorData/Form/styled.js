import styled from 'styled-components';

export const FormContentContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div:first-child {
    margin-right: 20px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FontReduce = styled.div`
  .MuiFormControlLabel-label {
    font-size: 0.875rem;
  }
`;
