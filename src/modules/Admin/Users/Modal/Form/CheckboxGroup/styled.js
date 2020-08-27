import styled from 'styled-components';

export const GroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  overflow-y: auto;
  max-height: 300px;
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-basis: 50%;

  @media screen and (max-width: 500px) {
    width: 100%;
    flex-basis: auto;
  }
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
