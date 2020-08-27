import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';

import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Toggle extends Component {
  state = {
    isToggleOn: false,
  }

  handleChange = () => {
    const {
      actions,
      indicatorId,
      selector,
      countryId,
      projectId,
    } = this.props;

    actions.getIndicatorDetailsMapRequest({
      countryId,
      projectId,
      id: indicatorId,
      selector,
      latestPeriodData: !this.state.isToggleOn,
    });

    this.setState(({ isToggleOn }) => ({ isToggleOn: !isToggleOn }));
  };

  render() {
    const { isToggleOn } = this.state;

    return (
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>All data</Grid>
          <Grid item>
            <Switch
              checked={isToggleOn}
              onChange={this.handleChange}
              color="primary"
              name="checked"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item>Last Reporting Period</Grid>
        </Grid>
      </Typography>
    );
  }
}

Toggle.propTypes = {
  indicatorId: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    getIndicatorDetailsMapRequest: PropTypes.func.isRequired,
  }).isRequired,
  countryId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  selector: PropTypes.object.isRequired,
};

const mapStateToProps = ({
  indicatorDetails: {
    selector,
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  selector,
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Toggle);
