import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AllButton from './AllButton';
import Status from './Status';
import * as S from './styled';

class StatusBlock extends Component {
  handleStatusSelect = (value) => {
    const { onChange, selected } = this.props;
    let updatedSelected;

    if (!selected.includes(value)) {
      updatedSelected = [...selected, value];
    } else if (selected.includes(value) && selected.length > 1) {
      updatedSelected = selected.filter((selectedItem) => selectedItem !== value);
    } else {
      updatedSelected = [...selected];
    }

    onChange(updatedSelected);
  };

  handleAllClick = () => {
    const { onChange, items } = this.props;
    onChange(items);
  }

  render() {
    const { title, items, selected } = this.props;

    return (
      <>
        <S.Title>{title}</S.Title>
        <S.Wrapper>
          {items.map((status) => (
            <Status
              key={status}
              name={status}
              isSelected={selected.some((selectedItem) => selectedItem === status)}
              onSelect={this.handleStatusSelect}
            />
          ))}
          <AllButton onClick={() => this.handleAllClick()} />
        </S.Wrapper>
      </>
    );
  }
}

StatusBlock.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
};

export default StatusBlock;
