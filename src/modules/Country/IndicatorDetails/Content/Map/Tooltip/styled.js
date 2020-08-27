import styled from 'styled-components';

export const Container = styled.div`
  padding: 17px 22px;
  min-width: 200px;
`;

export const Wrapper = styled.div`
  padding: 16px;
  min-width: 200px;
`;

export const Label = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Value = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-top: 5px;
`;

export const Row = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  max-width: 50%;
  text-align: left;
`;

export const Right = styled.div`
  max-width: 50%;
  text-align: right;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: 23px;
  margin-top: 5px;
`;

export const Desc = styled.div`
  margin-left: 10px;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;
