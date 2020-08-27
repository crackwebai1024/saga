import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MILESTONES_STATUSES } from 'configs/statuses';

import * as S from './styled';
import { formatMilestones, getStartBlockIndex, getCurrentPosition } from './formatters';

class Timeline extends Component {
  currentYearRef = React.createRef();

  static propTypes = {
    indicatorTitle: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.currentYearRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {
      header,
      body,
      bodyConfig,
      currentMonth,
      currentYear,
    } = formatMilestones(this.props.milestones);

    return (
      <S.Container>
        <S.Wrapper>
          <S.Header years={header.length}>
            <S.HeaderMilestone>{this.props.indicatorTitle}</S.HeaderMilestone>
            {
              header.map((year, yearIndex) => (
                <S.Block key={`${year.year}`} total={header.length}>
                  <S.Year
                    id={`year${year.year}`}
                    isLast={yearIndex !== header.length - 1}
                    {...(year.year === currentYear ? { ref: this.currentYearRef } : {})}
                  >
                    {year.year}
                  </S.Year>
                  <S.HiddenRow>
                    {year.quarters.map((q) => (
                      <S.Quarter
                        key={`${year.year}-${q}`}
                        lastInYear={q === 'Q4' && yearIndex !== header.length - 1}
                      >
                        {q}
                      </S.Quarter>
                    ))}
                  </S.HiddenRow>
                  <S.HiddenRow>
                    {year.monthes.map((m) => (
                      <S.Month
                        key={`${year.year}-${m}`}
                        lastInYear={m === 'Dec' && yearIndex !== header.length - 1}
                        isCurrent={m === currentMonth && year.year === currentYear}
                      >
                        {m}
                      </S.Month>
                    ))}
                  </S.HiddenRow>
                </S.Block>
              ))
            }
          </S.Header>
          {
            body.map((item) => {
              const startBlockIndex = getStartBlockIndex(bodyConfig.start, item.startYear, item.startMonth + 1);

              return (
                <S.Row key={item.title} years={header.length}>
                  <S.Title>{item.title}</S.Title>
                  {
                    bodyConfig.rowData.map((cell, index) => (startBlockIndex === index
                      ? (
                        <S.TimelineCell
                          key={`${index}-${item.title}`}
                          id={`${index}-${item.title}`}
                          lastInYear={cell === 'Dec' && index !== bodyConfig.rowData.length - 1}
                          isCurrent={index === getCurrentPosition(bodyConfig.start)}
                          total={bodyConfig.rowData.length}
                        >
                          <S.TimelineBlock
                            monthes={item.width}
                            status={MILESTONES_STATUSES[item.status]}
                            total={bodyConfig.rowData.length}
                          >
                            <S.TimlineBlockText status={MILESTONES_STATUSES[item.status]}>
                              {item.width > 3 ? MILESTONES_STATUSES[item.status].text : ''}
                            </S.TimlineBlockText>
                          </S.TimelineBlock>
                        </S.TimelineCell>
                      )
                      : (
                        <S.TimelineCell
                          key={`${index}-${item.title}`}
                          id={`${index}-${item.title}`}
                          lastInYear={cell === 'Dec' && index !== bodyConfig.rowData.length - 1}
                          isCurrent={index === getCurrentPosition(bodyConfig.start)}
                          total={bodyConfig.rowData.length}
                        />
                      )
                    ))
                  }
                </S.Row>
              );
            })
          }
        </S.Wrapper>
      </S.Container>
    );
  }
}

export default Timeline;
