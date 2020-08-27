import styled from 'styled-components';

export const Icon = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-image: url(${({ img }) => img});
  background-size: contain;
  background-repeat: no-repeat;
  display: ${({ display }) => display};
`;

export const Blank = () => {};
