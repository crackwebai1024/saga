import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Paper } from '@material-ui/core';

export const PieContainer = styled(Box).attrs({
  px: [20, 50, 200],
  width: 1,
})`
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const Header = styled.div`
  background-color: rgba(229, 229, 229, 0.3);
  padding: 1px 15px;
`;

export const Title = styled.h1`
  font-size: 18px;
`;

export const Body = styled.div`
  padding: 20px;
  color: #4a4a4a;
`;

export const MilestoneBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatusText = styled.div`
  width: 140px;
`;

export const StatusRect = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  margin: 0 11px 0 5px;
  border-radius: 2px;
`;

export const TitleString = styled.div`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
`;

export const Description = styled.div`
  font-size: 13px;
  margin-bottom: 30px;
`;

export const StatusString = styled.div`
  color: ${({ color }) => color};
`;
