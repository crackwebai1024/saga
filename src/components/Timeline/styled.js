import styled from 'styled-components';
import MuiPaper from '@material-ui/core/Paper';

const monthWidth = 32;

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled(MuiPaper).attrs(() => ({
  elevation: 3,
}))`
  && {
    overflow-x: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Block = styled.div`
  width: calc((100% - 342px) / ${({ total }) => total});
  min-width: 384px;
`;

export const Year = styled.div`
  width: ${({ isLast }) => (!isLast ? '100%' : 'calc(100% - 12px)')};
  height: 40px;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  justify-content: left;
  padding-left: 10px;
  align-items: center;
  background: #f5f5f5;
`;

export const Quarter = styled.div`
  width: 25%;
  height: 30px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Month = styled.div`
  width: calc(100% / 12);
  height: 40px;
  font-weight: 375;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isCurrent }) => (isCurrent ? '#1E88E5' : 'rgba(74, 74, 74, 0.6)')};
  border-bottom: 0.5px solid #cccccc;
  border-top: 0.5px solid #cccccc;

  :nth-child(2n + 1) {
    background: #f5f5f5;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

export const HiddenRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const Title = styled.div`
  width: 312px;
  min-width: 312px;
  padding-left: 30px;
  font-weight: 375;
  font-size: 14px;
  line-height: 159.25%;
  display: flex;
  align-items: center;
  color: ${({ isIndicator }) => (isIndicator ? '#1E88E5' : '#4A4A4A')};
  border-bottom: ${({ isIndicator }) => (isIndicator ? '0' : '0.5px solid #CCCCCC')};
  position: sticky;
  left: 0;
  z-index: 2;
  background: white;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.05);
`;

export const HeaderMilestone = styled.div`
  width: 312px;
  min-width: 312px;
  height: 100px;
  padding-left: 30px;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: flex-end;
  color: #27323e;
  border-bottom: 0.5px solid #cccccc;
  position: sticky;
  left: 0;
  z-index: 2;
  background: white;
`;

export const TimelineCell = styled.div`
  position: relative;
  height: 50px;
  width: calc((100% - 342px) / ${({ total }) => total});
  min-width: 32px;
  border-bottom: ${({ isIndicator }) => (isIndicator ? '0' : '0.5px solid #CCCCCC')};
  background: ${({ isCurrent }) => (!isCurrent ? '#ffffff' : 'rgba(30, 136, 229, 0.15) !important')};

  :nth-child(2n) {
    background: #f5f5f5;
  }

  :last-child {
    width: calc((100% - 343px) / ${({ total }) => total} - 1px);
  }
`;

export const TimelineBlock = styled.div`
  position: absolute;
  top: 10px;
  background: ${({ status }) => status.color};
  border-radius: 4px;
  width: ${({ monthes }) => (monthes * monthWidth) - 12}px;
  min-width: ${({ monthes }) => (monthes * monthWidth) - 12}px;
  height: 30px;
  padding: 2px;
  padding-left: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${({ status }) => (status.key === 'in-progress' ? '#000000' : '#FFFFFF')};
  z-index: 1;
  overflow: visible;
`;

export const TimlineBlockText = styled.p`
  color: ${({ status }) => (status.key === 'in-progress' ? '#000000' : '#FFFFFF')};
  position: sticky;
  left: 350px;
  padding-right: 10px;
`;
