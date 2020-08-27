import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import formatInteger from 'helpers/formatInteger';
import { actions as globalActions } from 'redux/global';

import Counts from './Counts';
import * as S from './styled';

class Header extends PureComponent {
  static propTypes = {
    citizens: PropTypes.number,
    countries: PropTypes.number,
    projects: PropTypes.number,
    sections: PropTypes.number,
    indicators: PropTypes.number,
    t: PropTypes.func.isRequired,
    printDashboard: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      getGlobalStatisticRequest: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    citizens: undefined,
    countries: undefined,
    projects: undefined,
    sections: undefined,
    indicators: undefined,
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getGlobalStatisticRequest();
  }

  render() {
    const {
      citizens,
      countries,
      projects,
      sections,
      indicators,
      t,
      printDashboard,
    } = this.props;

    return (
      <S.Wrapper>
        <div>
          <S.Title>{t('global.global_dashboard')}</S.Title>
          {typeof citizens === 'number' && (
            <S.SubTitle>{t('global.citizens_served')}: {formatInteger(citizens)} </S.SubTitle>
          )}
          <S.StyledButton handlePrint={printDashboard} />
        </div>
        <S.Counts>
          <S.Description>
            {t('global.description')}
          </S.Description>
          <Counts
            countries={countries}
            projects={projects}
            sections={sections}
            indicators={indicators}
          />
        </S.Counts>
      </S.Wrapper>
    );
  }
}

const mapStateToProps = ({
  global: {
    statistic: {
      citizens,
      countries,
      projects,
      sections,
      indicators,
    },
  },
}) => ({
  citizens,
  countries,
  projects,
  sections,
  indicators,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...globalActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(Header);
