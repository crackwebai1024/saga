import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { MILESTONES_STATUSES } from 'configs/statuses';

import * as S from './styled';

const UpcomingMilestones = ({ data }) => (
  data.length
    ? (
      <S.StyledPaper>
        <S.Header>
          <S.Title>Upcoming Milestones</S.Title>
        </S.Header>
        <S.Body>
          {data.map((item) => (
            <S.MilestoneBlock key={item.id}>
              <S.TitleString>
                <S.StatusText>{`${moment(item.completionDate).format('MMM YYYY')} - Status: `}</S.StatusText>
                <S.StatusRect color={MILESTONES_STATUSES[item.status].color} />
                <S.StatusString color={MILESTONES_STATUSES[item.status].color}>
                  {MILESTONES_STATUSES[item.status].description}
                </S.StatusString>
              </S.TitleString>
              <S.Description>
                {item.name}
              </S.Description>
            </S.MilestoneBlock>
          ))}
        </S.Body>
      </S.StyledPaper>
    ) : <S.StyledPaper />
);

UpcomingMilestones.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UpcomingMilestones;
