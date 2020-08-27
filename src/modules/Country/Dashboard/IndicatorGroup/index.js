import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import getValueForShow from 'helpers/valueToShow';
import { formatTitleForCard } from 'helpers/formatTitleForCard';
import { checkAccessToImport } from 'redux/importIndicatorsGroupData/selectors';
import { actions as importIndicatorsGroupActions } from 'redux/importIndicatorsGroupData';

import Score from 'components/Score';
import Stack from 'modules/Admin/Dashboard/SectionBlock/IndicatorGroup/Stack';
import ImportButtonCorner from '../ImportButtonCorner';

import * as S from './styled';

class IndicatorGroup extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    sectionId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    status: PropTypes.string,
    value: PropTypes.number,
    valueType: PropTypes.string,
    groupTarget: PropTypes.number,
    indicators: PropTypes.array,
    hasAccessToImport: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      openImportIndicatorsGroupModalState: PropTypes.func.isRequired,
      closeImportIndicatorsGroupModalState: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    indicators: [],
    year: null,
    status: null,
    value: null,
    valueType: null,
    groupTarget: null,
  };

  componentWillUnmount() {
    this.props.actions.closeImportIndicatorsGroupModalState();
  }

  onImport = (e) => {
    const {
      id,
      title,
      year,
      status,
      value,
      valueType,
      groupTarget,
      actions,
      sectionId,
    } = this.props;
    e.preventDefault();
    actions.openImportIndicatorsGroupModalState({
      id,
      title,
      year,
      status,
      value,
      valueType,
      groupTarget,
      sectionId,
    });
  };

  render() {
    const {
      title,
      indicators,
      hasAccessToImport,
      year,
      status,
      value,
      valueType,
      groupTarget,
      t,
    } = this.props;
    const displayedValue = value !== null ? `${getValueForShow(value)}` : t('common.na');
    const displayedTarget = groupTarget !== null ? `${getValueForShow(groupTarget)}` : t('common.na');


    if (!year && !status && value === null && !valueType && groupTarget === null) {
      return (
        <Stack dynamicColor>
          <S.Card>
            <S.HeadRow>
              <S.Header>
                {formatTitleForCard(title)}
              </S.Header>
              {hasAccessToImport
                && <ImportButtonCorner iconType="edit" onImport={this.onImport} titleType={t('common.set')} />}
            </S.HeadRow>
            <S.Content>
              <S.Count>{t('country.indicators_count')}: {indicators.length}</S.Count>
            </S.Content>
          </S.Card>
        </Stack>
      );
    }

    return (
      <Stack dynamicColor>
        <S.Card>
          <S.HeadRow>
            <S.Header>
              {formatTitleForCard(title)}
            </S.Header>
            {hasAccessToImport
              && <ImportButtonCorner iconType="edit" onImport={this.onImport} titleType={t('common.set')} />}
          </S.HeadRow>
          <S.Content>
            <S.Result>{displayedValue}{valueType === '%' && '%'}</S.Result>
            <S.Period>
              <span>&nbsp;</span>
            </S.Period>
            <S.Target>
              {year} {t('common.target')}
              <S.TargetValue>{displayedTarget}{valueType === '%' && '%'}</S.TargetValue>
            </S.Target>
            <S.Score>
              <Score value={status} size={24} />
            </S.Score>
          </S.Content>
        </S.Card>
      </Stack>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  hasAccessToImport: checkAccessToImport(auth),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...importIndicatorsGroupActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(IndicatorGroup);
