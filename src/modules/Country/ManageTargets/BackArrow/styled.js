import styled from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';

export const BackLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-right: 10px;
  margin-top: 1px;
`;

export const Title = styled.div`
  display: flex;
  flex-grow: 0;
  flex-wrap: nowrap;
  padding-bottom: 20px;
`;

export const TitleBox = styled.div`
  max-width: 60%;
  margin-top: 3px;
`;

export const SectionTitle = styled.div`
  font-size: 1.125rem;
  line-height: 1.39;
  font-weight: bold;
  color: #4a4a4a;
`;
