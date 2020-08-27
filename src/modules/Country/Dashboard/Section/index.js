import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

import Indicator from '../Indicator/index';
import IndicatorGroup from '../IndicatorGroup/index';

const Section = ({
  title,
  items,
  country,
  sectionId,
  projectId,
}) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Content>
      {items.map((item) => (item.isSystem ? (
        <S.Item key={item.id}>
          <Indicator
            {...item.indicators[0]}
            sectionId={sectionId}
            projectId={projectId}
            country={country}
            // eslint-disable-next-line max-len
            milestoneLink={`/country/${country}/country-dashboard/section/${sectionId}/indicator/${item.indicators[0].id}/milestones`}
            // eslint-disable-next-line max-len
            chartLink={`/country/${country}/country-dashboard/section/${sectionId}/indicator/${item.indicators[0].id}/report/graph`}
            // eslint-disable-next-line max-len
            mapLink={`/country/${country}/country-dashboard/section/${sectionId}/indicator/${item.indicators[0].id}/report/map`}
          />
        </S.Item>
      ) : (
        <S.Link to={`/country/${country}/country-dashboard/section/${sectionId}/group/${item.id}`} key={item.id}>
          <S.Item>
            <IndicatorGroup
              sectionId={sectionId}
              projectId={projectId}
              country={country}
              {...item}
            />
          </S.Item>
        </S.Link>
      )))}
    </S.Content>
  </S.Wrapper>
);

Section.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  sectionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  projectId: PropTypes.number.isRequired,

};

export default Section;
