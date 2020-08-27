import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';

class Date extends PureComponent {
  state = {
    date: this.props.value,
  }

  handleChange = (selectedDate) => {
    const date = selectedDate.utc().format();
    this.setState({ date }, () => {
      this.props.handleDateChange(date);
    });
  }

  render() {
    const { date } = this.state;

    return (
      <DatePicker
        value={date}
        onChange={this.handleChange}
        openTo="year"
        format="YYYY-MM-DD"
        views={['year', 'month', 'date']}
      />
    );
  }
}

Date.defaultProps = {
  handleDateChange: () => {},
};

Date.propTypes = {
  value: PropTypes.any.isRequired,
  handleDateChange: PropTypes.func,
};

export default Date;
