import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import { getMilestonesStatusKeys, getMilestoneStatusProperty } from 'helpers/milestonesStatuses';

import * as S from './styled';

const minDate = moment(`${moment().year() - 5}-01-01`);
const maxDate = moment(`${moment().year() + 5}-12-31`);

class Filters extends Component {
  // TODO: Move controls to components
  state = {
    indicatorId: this.props.indicatorGroups[0].indicators[0].id,
    indicatorsGroupId: this.props.indicatorGroups[0].indicators[0].indicatorsGroupId,
    responsiblePartyId: 0,
    status: [
      'not-yet-started',
      'at-risk',
      'seriously-at-risk',
      'in-progress',
      'complete',
    ],
    startDateFrom: null,
    startDateTo: null,
    completionDateFrom: null,
    completionDateTo: null,
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    responsibleParties: PropTypes.array.isRequired,
    indicatorGroups: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.onChange(this.state);
  }

  onSectionChange = (event) => {
    if (event.target.value) {
      this.setState({
        indicatorId: event.target.value.indicatorId,
        indicatorsGroupId: event.target.value.indicatorsGroupId,
      }, () => {
        this.props.onChange(this.state);
      });
    }
  }

  onResponsiblePartyChange = (event) => {
    this.setState({ responsiblePartyId: event.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  handleChangeCompletionFrom = (date) => {
    this.setState({ completionDateFrom: date ? new Date(date.toISOString()) : null, completionDateTo: null }, () => {
      this.props.onChange(this.state);
    });
  }

  handleChangeCompletionTo = (date) => {
    this.setState({ completionDateTo: date ? new Date(date.toISOString()) : null }, () => {
      this.props.onChange(this.state);
    });
  }

  handleChangeStartFrom = (date) => {
    this.setState({ startDateFrom: date ? new Date(date.toISOString()) : null, startDateTo: null }, () => {
      this.props.onChange(this.state);
    });
  }

  handleChangeStartTo = (date) => {
    this.setState({ startDateTo: date ? new Date(date.toISOString()) : null }, () => {
      this.props.onChange(this.state);
    });
  }

  getIndicatorGroupsSelectItems = () => {
    const { indicatorGroups } = this.props;

    const items = [];

    indicatorGroups.forEach((section) => {
      section.indicators.forEach((indicator) => {
        items.push((
          <MenuItem
            key={indicator.id}
            value={{ indicatorId: indicator.id, indicatorsGroupId: indicator.indicatorsGroupId }}
          >
            {indicator.title}
          </MenuItem>
        ));
      });
    });

    return items;
  }

  handleStatusCheck = (event) => {
    const statusForChange = event.target.value;

    this.setState((state) => {
      const isCheked = state.status.includes(statusForChange);

      let newStatusesState = [...state.status];
      if (isCheked) {
        newStatusesState = state.status.filter((item) => item !== statusForChange);
      } else {
        newStatusesState.push(statusForChange);
      }

      return { status: newStatusesState };
    }, () => {
      this.props.onChange(this.state);
    });
  }

  renderIndicatorName = (indicatorId) => {
    const { indicatorGroups } = this.props;
    if (!indicatorId) {
      return 'Choose indicator';
    }

    const indicators = [];
    indicatorGroups.forEach((section) => {
      indicators.push(...section.indicators);
    });
    return indicators.filter((indicator) => indicator.id === indicatorId)[0].title;
  }

  renderResponsiblePartyName = (responsiblePartyId) => {
    const { responsibleParties } = this.props;
    if (!responsiblePartyId) {
      return 'All';
    }

    return responsibleParties.filter((responsibleParty) => responsibleParty.id === responsiblePartyId)[0].name;
  }

  render() {
    return (
      <S.Content>
        <S.Row>
          <S.Column>
            <S.Label>Choose Indicator</S.Label>
            <S.IndicatorSelect
              onChange={this.onSectionChange}
              value={this.state.indicatorId}
              renderValue={this.renderIndicatorName}
              inputProps={{
                id: 'indicator',
              }}
            >
              {this.getIndicatorGroupsSelectItems().map((item) => item)}
            </S.IndicatorSelect>
          </S.Column>
        </S.Row>
        <S.Row>
          <S.StyledPicker
            variant="dialog"
            views={['year', 'month']}
            label="Start From"
            value={this.state.startDateFrom}
            onChange={this.handleChangeStartFrom}
            clearable
            minDate={minDate}
            maxDate={maxDate}
            emptyLabel="All"
            clearLabel="Clear"
            allowKeyboardControl
          />
          <S.StyledPicker
            openTo="year"
            variant="dialog"
            disabled={!this.state.startDateFrom}
            views={['year', 'month']}
            label="Start To"
            value={this.state.startDateTo}
            onChange={this.handleChangeStartTo}
            minDate={this.state.startDateFrom}
            maxDate={maxDate}
            clearable
            emptyLabel="All"
            clearLabel="Clear"
            allowKeyboardControl
          />
        </S.Row>
        <S.Row>
          <S.StyledPicker
            variant="dialog"
            views={['year', 'month']}
            label="Completion From"
            value={this.state.completionDateFrom}
            onChange={this.handleChangeCompletionFrom}
            clearable
            minDate={minDate}
            maxDate={maxDate}
            emptyLabel="All"
            clearLabel="Clear"
            allowKeyboardControl
          />
          <S.StyledPicker
            openTo="year"
            variant="dialog"
            disabled={!this.state.completionDateFrom}
            views={['year', 'month']}
            label="Completion To"
            value={this.state.completionDateTo}
            onChange={this.handleChangeCompletionTo}
            minDate={this.state.completionDateFrom}
            maxDate={maxDate}
            clearable
            emptyLabel="All"
            clearLabel="Clear"
            allowKeyboardControl
          />
          <S.Column>
            <S.Label>Responsible Party</S.Label>
            <S.PartySelect
              onChange={this.onResponsiblePartyChange}
              value={this.state.responsiblePartyId}
              renderValue={this.renderResponsiblePartyName}
              inputProps={{
                id: 'responsible-party',
              }}
            >
              <S.PartyItem
                key="all"
                value={0}
              >
                All
              </S.PartyItem>
              {this.props.responsibleParties.map((party) => (
                <S.PartyItem
                  key={party.id}
                  value={party.id}
                >
                  {party.name}
                </S.PartyItem>
              ))}
            </S.PartySelect>
          </S.Column>
          <S.CheckboxBlock>
            <S.Label>Status</S.Label>
            <S.CheckboxGroup>
              {getMilestonesStatusKeys().map((statusKey) => (
                <Checkbox
                  key={statusKey}
                  value={statusKey}
                  checked={this.state.status.includes(statusKey)}
                  checkedIcon={(
                    <img
                      width={30}
                      alt={getMilestoneStatusProperty(statusKey, 'text')}
                      src={getMilestoneStatusProperty(statusKey, 'icon')}
                    />
                  )}
                  classes={{ checked: 'checkedStatus' }}
                  icon={(
                    <img
                      width={30}
                      alt={getMilestoneStatusProperty(statusKey, 'text')}
                      src={getMilestoneStatusProperty(statusKey, 'icon')}
                    />
                  )}
                  onChange={this.handleStatusCheck}
                />
              ))}
            </S.CheckboxGroup>
          </S.CheckboxBlock>
        </S.Row>

      </S.Content>
    );
  }
}

export default Filters;
