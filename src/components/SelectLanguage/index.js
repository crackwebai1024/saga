import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import MenuItem from '@material-ui/core/MenuItem';
import { Language as LanguageIcon } from '@material-ui/icons';

import languages from './config';
import * as S from './styled';

class SelectLanguage extends React.Component {
  getCurrentLanguage() {
    const { i18n } = this.props;
    return Object.entries(languages)
      .map((item) => item[1])
      .includes(i18n.language) ? i18n.language : 'en-US';
  }

  changeLanguage = (lng) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  handleSelectChange = (event) => {
    this.changeLanguage(event.target.value);
  };

  render() {
    return (
      <>
        <S.FormControlSelect variant="filled">
          <S.SelectItem
            value={this.getCurrentLanguage()}
            onChange={this.handleSelectChange}
            country={this.props.country ? 'true' : 'false'}
            renderValue={(value) => (
              <S.LanguageIconContainer>
                <LanguageIcon />
                <S.LanguageTitle country={this.props.country ? 'true' : 'false'}>
                  {Object.keys(languages)
                    .filter((item) => languages[item] === value)}
                </S.LanguageTitle>
              </S.LanguageIconContainer>
            )}
          >
            {Object.entries(languages).map(([label, value]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </S.SelectItem>
        </S.FormControlSelect>
      </>
    );
  }
}

SelectLanguage.propTypes = {
  i18n: PropTypes.object.isRequired,
  country: PropTypes.bool.isRequired,
};

export default withTranslation()(SelectLanguage);
