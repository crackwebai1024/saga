import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';

import { checkAccessToStatusImport } from 'redux/importIndicatorStatus/selectors';
import { checkAccessToImport } from 'redux/importIndicatorData/selectors';
import { actions as importActions } from 'redux/importIndicatorData';
import { actions as importStatusActions } from 'redux/importIndicatorStatus';
import { actions as updateIndicatorNotesActions } from 'redux/updateIndicatorNotes';

import { formatTitleForCard } from 'helpers/formatTitleForCard';
import getPraparedValueForShow from 'helpers/valueToShow';
import { STATUSES } from 'helpers/statuses';
import Score from 'components/Score';
import ImportButtonCorner from '../ImportButtonCorner';

import * as S from './styled';

class Indicator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    sectionId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    indicatorsGroupId: PropTypes.number.isRequired,
    reportingPeriodType: PropTypes.string.isRequired,
    milestoneLink: PropTypes.string.isRequired,
    mapLink: PropTypes.string.isRequired,
    chartLink: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    lastTarget: PropTypes.object,
    value: PropTypes.number,
    valueType: PropTypes.string,
    target: PropTypes.number,
    status: PropTypes.string,
    manualStatus: PropTypes.string,
    note: PropTypes.string,
    highlightsTitle: PropTypes.string,
    lowlightsTitle: PropTypes.string,
    highlights: PropTypes.string,
    lowlights: PropTypes.string,
    hasAccessToStatusImport: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      openImportModalState: PropTypes.func.isRequired,
      openImportStatusModalState: PropTypes.func.isRequired,
      openIndicatorNotesModalState: PropTypes.func.isRequired,
      closeImportModalState: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    value: undefined,
    valueType: undefined,
    target: null,
    status: null,
    manualStatus: null,
    note: null,
    highlightsTitle: null,
    lowlightsTitle: null,
    highlights: null,
    lowlights: null,
    lastTarget: null,
  };

  onImport = (e) => {
    const {
      id,
      reportingPeriodType,
      actions,
    } = this.props;

    e.preventDefault();
    actions.openImportModalState({
      indicator: {
        id,
        reportingPeriodType,
      },
    });
  };

  onImportStatus = (e) => {
    const {
      id,
      title,
      note,
      highlights,
      lowlights,
      highlightsTitle,
      lowlightsTitle,
      actions,
      manualStatus,
      status,
      sectionId,
      projectId,
      indicatorsGroupId,
    } = this.props;

    // actions.openIndicatorNotesModalState({
    //   indicator: {
    //     id,
    //     title,
    //     note,
    //     highlights,
    //     lowlights,
    //     sectionId,
    //     projectId,
    //     indicatorsGroupId,
    //   },
    // });

    e.preventDefault();
    actions.openImportStatusModalState({
      indicator: {
        id,
        sectionId,
        title,
        manualStatus,
        status,
        note,
        highlightsTitle,
        lowlightsTitle,
        highlights,
        lowlights,
        projectId,
        indicatorsGroupId,
      },
    });
  };

  onMilestoneClick = (e) => {
    const {
      milestoneLink,
      history,
    } = this.props;

    e.preventDefault();
    history.push(milestoneLink);
  };

  onMapClick = (e) => {
    const {
      mapLink,
      history,
    } = this.props;

    e.preventDefault();
    history.push(mapLink);
  }

  onChartClick = (e) => {
    const {
      chartLink,
      history,
    } = this.props;

    e.preventDefault();
    history.push(chartLink);
  }

  onExpandClick = (e) => {
    const {
      mapLink,
      history,
    } = this.props;

    e.preventDefault();
    history.push(mapLink.replace('/map', ''));
  };

  render() {
    const {
      title,
      value,
      valueType,
      target,
      lastTarget,
      status,
      hasAccessToStatusImport,
      t,
      manualStatus,
    } = this.props;

    const valueUnits = valueType === '%' ? '%' : '';
    const displayedTarget = target !== null ? `${getPraparedValueForShow(target)}${valueUnits}` : t('common.na');
    const indicatorStatus = manualStatus || status;

    return (
      <S.Card>
        <S.HeadRow>
          <S.Header onClick={this.onMapClick}>
            {formatTitleForCard(title)}
          </S.Header>
          <S.ActionsWrapper>
            {hasAccessToStatusImport
              && <ImportButtonCorner iconType="edit" onImport={this.onImportStatus} titleType={t('common.set')} />}
          </S.ActionsWrapper>
        </S.HeadRow>
        <S.Content onClick={this.onMapClick}>
          <S.RowContainer>
            <S.Score>
              <Score value={indicatorStatus} size={24} />
              {/* {indicatorsMilestones.length
                ? (
                  <S.IconButton status={indicatorStatus} aria-label={t('common.import')} onClick={this.onMilestoneClick}>
                    <S.MilestoneIcon />
                  </S.IconButton>
                )
                : null} */}
            </S.Score>
            {value === null || value === undefined ? (
              <S.Result>
                <S.NoResult>{t('common.na')}</S.NoResult>
              </S.Result>
            ) : (
              <S.Result status={STATUSES[indicatorStatus]}>{getPraparedValueForShow(value)}{valueUnits}</S.Result>
            )}
          </S.RowContainer>
          <S.Period>
            {/* {year ? (
              <span>
                {t('common.as_of')} <S.Highlight fontWeight="bold">{monthString} {year}</S.Highlight>
              </span>
            ) : (
              <span>&nbsp;</span>
            )} */}
          </S.Period>
          <S.Target>
            {lastTarget?.year || null} {t('common.target_ind')}: {displayedTarget}
          </S.Target>
        </S.Content>
        {/* <S.ExpandButton aria-label={t('common.expand')} onClick={this.onExpandClick}>
          <S.ExpandIcon fontSize="small" />
        </S.ExpandButton> */}
        <S.IndicatorIcons>
          <S.IndicatorIcon onClick={this.onExpandClick}>
            <S.HighlightsImg />
          </S.IndicatorIcon>
          <S.IndicatorIcon onClick={this.onMapClick}>
            <S.MapImg />
          </S.IndicatorIcon>
          <S.IndicatorIcon onClick={this.onChartClick}>
            <S.ChartImg />
          </S.IndicatorIcon>
          <S.IndicatorIcon onClick={this.onMilestoneClick}>
            <S.MilestonesImg />
          </S.IndicatorIcon>
        </S.IndicatorIcons>
      </S.Card>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  hasAccessToImport: checkAccessToImport(auth),
  hasAccessToStatusImport: checkAccessToStatusImport(auth),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...importActions,
    ...importStatusActions,
    ...updateIndicatorNotesActions,
  }, dispatch),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(Indicator));
