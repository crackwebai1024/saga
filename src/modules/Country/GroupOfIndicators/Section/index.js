import React from 'react';
import PropTypes from 'prop-types';

import ImportIndicatorDataModal from 'modules/Country/Modal/ImportIndicatorData';
import ImportIndicatorStatusModal from 'modules/Country/Modal/ImportIndicatorStatus';
import IndicatorNotesDataModal from 'modules/Country/Modal/IndicatorNotesData';
import Indicator from '../../Dashboard/Indicator/index';
import * as S from './styled';

const Section = ({
  country,
  sectionId,
  groupId,
  items,
}) => (
  <S.Wrapper>
    <S.Content>
      {items.map((item) => (
        <S.Item key={item.id}>
          <S.Link
            to={`/country/${country}/country-dashboard/section/${sectionId}/group/${groupId}/indicator/${item.id}`}
          >
            <Indicator
              {...item}
              sectionId={sectionId}
              country={country}
              // eslint-disable-next-line max-len
              milestoneLink={`/country/${country}/country-dashboard/section/${sectionId}/group/${groupId}/indicator/${item.id}/milestones`}
              // eslint-disable-next-line max-len
              chartLink={`/country/${country}/country-dashboard/section/${sectionId}/group/${groupId}/indicator/${item.id}/report`}
              // eslint-disable-next-line max-len
              mapLink={`/country/${country}/country-dashboard/section/${sectionId}/group/${groupId}/indicator/${item.id}/report`}
            />
          </S.Link>
        </S.Item>
      ))}
    </S.Content>
    <ImportIndicatorDataModal />
    <ImportIndicatorStatusModal />
    <IndicatorNotesDataModal />
  </S.Wrapper>
);

Section.propTypes = {
  items: PropTypes.array.isRequired,
  country: PropTypes.string.isRequired,
  sectionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  groupId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Section;
