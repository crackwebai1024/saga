import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const SectionTitle = styled(RouterLink)`
  font-size: 1.125rem;
  line-height: 1.39;
  font-weight: bold;
  color: #4a4a4a;
  text-decoration: none;
`;

export const IndicatorTitle = styled.div`
  margin-top: 9px;
  margin-left: -33px;
  font-size: 2rem;
  line-height: 1.3;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryDark};
`;
