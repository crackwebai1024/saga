import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { formatDate } from 'helpers/formatDate';
import * as S from './styled';

const Highlights = ({
  t, indicatorNotesChangeLog, selector,
}) => {
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showMoreLowlights, setShowMoreLowlights] = useState(false);
  useEffect(() => {
    setShowMoreHighlights(false);
    setShowMoreLowlights(false);
  }, [selector]);

  return (
    <S.Wrapper>
      <S.StyledPaper>
        <S.Header>
          {t('country.highlights')}
        </S.Header>
        <S.Content>
          { (!showMoreHighlights ? indicatorNotesChangeLog.slice(0, 3) : indicatorNotesChangeLog)
            .map((d) => (
              <S.HighlightContainer key={`${d.id}-highlights`}>
                {(d.highlightsTitle || d.highlights) && <S.DateText>{formatDate(d.createdAt)}</S.DateText>}
                {d.highlightsTitle && <S.TitleText>{d.highlightsTitle}</S.TitleText>}
                {d.highlights && <S.HighlightText>{d.highlights}</S.HighlightText>}
              </S.HighlightContainer>
            )) }
        </S.Content>
        {
          indicatorNotesChangeLog.length >= 3 && !showMoreHighlights
          && (
            <S.ShowMore onClick={() => setShowMoreHighlights(true)}>
              {t('country.show_more_highlights')}
            </S.ShowMore>
          )
        }
      </S.StyledPaper>
      <S.StyledPaper>
        <S.Header>
          {t('country.lowlights')}
        </S.Header>
        <S.Content>
          { (!showMoreLowlights ? indicatorNotesChangeLog.slice(0, 3) : indicatorNotesChangeLog)
            .map((d) => (
              <S.HighlightContainer key={`${d.id}-lowlights`}>
                {(d.lowlightsTitle || d.lowlights) && <S.DateText>{formatDate(d.createdAt)}</S.DateText>}
                {d.lowlightsTitle && <S.TitleText>{d.lowlightsTitle}</S.TitleText>}
                {d.lowlights && <S.HighlightText>{d.lowlights}</S.HighlightText>}
              </S.HighlightContainer>
            )) }
        </S.Content>
        {
          indicatorNotesChangeLog.length >= 3 && !showMoreLowlights
          && (
            <S.ShowMore onClick={() => setShowMoreLowlights(true)}>
              {t('country.show_more_lowlights')}
            </S.ShowMore>
          )
        }
      </S.StyledPaper>
    </S.Wrapper>
  );
};

Highlights.propTypes = {
  t: PropTypes.func.isRequired,
  indicatorNotesChangeLog: PropTypes.arrayOf(PropTypes.shape({
    highlights: string,
    lowlights: string,
    createdAt: string,
  })).isRequired,
  actions: PropTypes.shape({
    getIndicatorHighlightsLogRequest: PropTypes.func.isRequired,
  }).isRequired,
  selector: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  indicatorDetails: {
    indicatorData: {
      indicatorNotesChangeLog,
    },
    selector,
  },
}) => ({
  indicatorNotesChangeLog: (indicatorNotesChangeLog && indicatorNotesChangeLog.length) > 0
    ? indicatorNotesChangeLog.sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
    : [],
  selector,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Highlights));
