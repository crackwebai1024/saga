import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AddNewRow = styled.span`
  background-image: url(${({ addNewRow }) => addNewRow});
  background-repeat: no-repeat;
  position: absolute;
  width: 33px;
  height: 26px;
  left: -35px;
  top: -14px;
  transform: rotate(0deg);
  cursor: pointer;
`;

export const Select = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 35px;
`;

export const Table = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  overflow: scroll;
  min-height: 350px;
  height: 100%;
  max-height: 600px;
  border-bottom: 2px solid  ${({ theme }) => theme.countryTheme.colors.mainColor};
`;

export const FabWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

export const RegionError = styled.span`
  text-align: center;
  font-size: 25px;
`;
