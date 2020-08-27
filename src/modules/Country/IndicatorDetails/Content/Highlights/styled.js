import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const StyledPaper = styled(Paper).attrs((props) => ({
  ...props,
}))`
  && {
    width: calc(50% - 10px);
    border-radius: 5px;
    box-shadow: 0 0 8px 2px #0000000c, 0 2px 4px 0 #00000034;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media screen and (max-width: 600px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
  border-bottom: solid 1px #cfcfcf88;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Header = styled.div`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: #f7f7f7;
  padding: 16px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: 0.11px;
  color: ${({ theme }) => theme.colors.labelColor || '#212121'};
`;

export const Content = styled.div`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 21px 16px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.08px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.primaryDark};
  max-height: 360px;
  overflow-y: auto;
  list-style: none;

  && {
    &::-webkit-scrollbar {
      width: 0.4em;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 0.2em;
      outline: 1px solid slategrey;
    }
  }
`;

export const HighlightContainer = styled.div`
  margin-bottom: 12px;
`;

export const DateText = styled.div`
  font-size: 14px;
  letter-spacing: 0.07px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const TitleText = styled.div`
  font-size: 16px;
  letter-spacing: 0.07px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-top: 2px;
  line-height: 19px;
`;

export const HighlightText = styled.div`
  font-size: 16px;
  letter-spacing: 0.07px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const ShowMore = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-left: 16px;
  margin-bottom: 25px;
`;
