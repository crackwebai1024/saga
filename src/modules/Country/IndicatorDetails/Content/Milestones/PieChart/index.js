import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

import Label from './Label';
import * as S from './styled';

const PieChart = ({ data, period, isMilestonePage }) => (
  data.length
    ? (
      <S.StyledPaper>
        <S.Header>
          <S.Title>{isMilestonePage ? 'Milestones ' : ''}Status: {period}</S.Title>
        </S.Header>
        <S.Body>
          <S.PieContainer>
            <S.Container>
              <VictoryPie
                data={data}
                labelComponent={<Label small={data.length > 4} />}
                padding={S.inlineStyles.pieChartPadding}
                standalone={false}
                startAngle={0}
                radius={160}
                innerRadius={110}
                style={S.inlineStyles.pieChartStyle}
              />
            </S.Container>
          </S.PieContainer>
          <S.TotalMilestone small={data.length > 4}>
            <S.TotalMilestoneLabel small={data.length > 4}>Milestones</S.TotalMilestoneLabel>
            <S.TotalMilestoneNumber small={data.length > 4}>
              {data.reduce((acc, cur) => acc + cur.y, 0)}
            </S.TotalMilestoneNumber>
          </S.TotalMilestone>
        </S.Body>
      </S.StyledPaper>
    )
    : <S.PieContainer />
);

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  period: PropTypes.string.isRequired,
  isMilestonePage: PropTypes.bool.isRequired,
};

export default PieChart;
