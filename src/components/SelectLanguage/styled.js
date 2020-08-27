import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';

export const FormControlSelect = styled(FormControl)`
  width: 90px;
  padding-left: 10px;

  div {
    width: 100%;
    display: flex;
    background: transparent;
  }

  div::before,
  div::after {
    display: none;
  }
`;

export const SelectItem = styled(Select)`
  font-weight: 500;
  line-height: 1.5;
  max-width: 100%;
  margin-left: 2px;
  ${({ country }) => (country === 'true' ? `background: ${({ theme }) => theme.countryTheme.colors.mainColor};` : '')}

  div {
    padding: 2px;
    color: ${({ theme, country }) => (country === 'true' ? theme.countryTheme.colors.fontMainColor : 'white')};
    font-size: 0.75rem;
    cursor: pointer;
  }

  svg {
    display: none;
  }
`;

export const LanguageIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    padding-right: 5px;
    display: inline;
  }
`;

export const LanguageTitle = styled.span`
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme, country }) => (country === 'true' ? theme.countryTheme.colors.fontMainColor : 'white')};

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const StyledFilledInput = styled(FilledInput)``;
