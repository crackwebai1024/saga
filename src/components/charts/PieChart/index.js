import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

import Label from './Label';
import * as S from './styled';

const PieChart = ({ data, isMobileView }) => (
  data.length
    ? (
      <S.PieContainer>
        <S.Container modif={isMobileView}>
          <VictoryPie
            data={data}
            labelComponent={<Label isMobileView={isMobileView} />}
            padding={isMobileView ? S.mobileInlineStyles.pieChartPadding : S.inlineStyles.pieChartPadding}
            standalone={false}
            startAngle={0}
            innerRadius={75}
            style={S.inlineStyles.pieChartStyle}
          />
        </S.Container>
      </S.PieContainer>
    )
    : <S.PieContainer />
);

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMobileView: PropTypes.bool.isRequired,
};

export default PieChart;
