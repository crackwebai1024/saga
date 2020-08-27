import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

import { actions as indicatorActions } from 'redux/indicatorDetails';

import AmplitudeService from 'services/amplitude';
import Header from './Header';
import Body from './Body';

import * as S from './styled';

const columns = [
  {
    label: 'Time',
    key: 'time',
    i18nKey: 'time',
  },
  {
    label: 'Indicator updated',
    key: 'indicatorUpdated',
    i18nKey: 'indicator_updated',
  },
  // {
  //   label: 'Comment',
  //   key: 'comment',
  //   i18nKey: 'comment',
  // },
  {
    label: 'Updated by',
    key: 'updatedBy',
    i18nKey: 'updated_by',
  },
];

class UpdateLog extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getIndicatorUpdateLogRequest: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        indicatorId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    updateLog: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const {
      actions,
      match: {
        params: {
          indicatorId,
        },
      },
    } = this.props;

    actions.getIndicatorUpdateLogRequest({
      id: indicatorId,
    });
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'UpdateLog Page' });
  }

  render() {
    const {
      updateLog,
    } = this.props;

    return (
      <S.StyledPaper>
        <S.StyledTable aria-labelledby="tableTitle">
          <Header
            headRows={columns}
            onRequestSort={this.handleRequestSort}
          />
          <Body
            rows={updateLog}
          />
        </S.StyledTable>
      </S.StyledPaper>
    );
  }
}

const mapStateToProps = ({
  indicatorDetails: {
    updateLog,
  },
}) => ({
  updateLog,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...indicatorActions,
  }, dispatch),
});

export default compose(
  withSnackbar,
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(UpdateLog);
