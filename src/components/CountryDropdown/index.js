import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import * as S from './styled';

class CountryDropdown extends React.Component {
  static propTypes = {
    allowedCountries: PropTypes.array.isRequired,
    currentSlug: PropTypes.string,
    hasAllCountriesAccess: PropTypes.bool.isRequired,
    global: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    global: undefined,
    currentSlug: undefined,
  };

  getCurrentCountry = () => {
    const { allowedCountries, currentSlug, t } = this.props;
    const currentCountry = allowedCountries.find((item) => item.slug === currentSlug);
    if (currentCountry) {
      return currentCountry.name;
    }
    return t('global.global_dashboard');
  }

  getLogo = () => {
    const { allowedCountries, currentSlug } = this.props;
    const currentCountry = allowedCountries.find((item) => item.slug === currentSlug);
    if (currentCountry) {
      return currentCountry.logo;
    }
    return '';
  }

  render() {
    const {
      allowedCountries, t, classes, global,
    } = this.props;
    return (
      <S.Container>
        {this.props.currentSlug
          && <Avatar src={this.getLogo()} className={classes.small} /> }
        <S.FormControlSelect variant="filled" global={global ? 'true' : 'false'}>
          <S.SelectItem
            value={this.getCurrentCountry()}
            onChange={this.handleSelectCountry}
            global={global ? 'true' : 'false'}
          >
            {this.props.hasAllCountriesAccess
              && (
              <S.MenuItem to="/global" key={allowedCountries.length + 1} value={t('global.global_dashboard')}>
                <S.GlobalIconContainer>
                  <S.GlobalIcon />
                  {t('global.global_dashboard')}
                </S.GlobalIconContainer>
              </S.MenuItem>
              )}
            {allowedCountries.map((item, index) => (
              <S.MenuItem to={`/country/${item.slug}`} key={index} value={item.name}>
                {item.name}
              </S.MenuItem>
            ))}
          </S.SelectItem>
        </S.FormControlSelect>
      </S.Container>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: {
      role,
    },
  },
  countries: {
    allowedList,
    hasAllCountriesAccess,
  },
}) => ({
  role,
  allowedCountries: allowedList,
  hasAllCountriesAccess,
});

export default connect(mapStateToProps)(withTranslation()(withStyles(S.classes)(CountryDropdown)));
