import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { withTranslation } from 'react-i18next';

import RenderSheet from './RenderSheet';

class Table extends PureComponent {
  handleChanges = (changes) => {
    const { updateData, checkRequiredFields } = this.props;
    const grid = this.props.grid.map((row) => [...row]);

    changes.forEach(({
      row, col, value,
    }) => {
      if (!value) {
        grid[row][col] = {
          ...grid[row][col],
          value: '',
          expr: '',
          className: 'required',
        };
      }

      if (value && grid[row] && grid[row][col]) {
        grid[row][col] = {
          ...grid[row][col],
          value,
          expr: value,
          className: '',
        };
      }
    });

    updateData(grid);
    checkRequiredFields(grid);
  }

  render() {
    const { grid, columns } = this.props;

    return (
      <ReactDataSheet
        data={grid}
        sheetRenderer={({
          className,
          children,
        }) => (
          <RenderSheet
            columns={columns}
            className={className}
          >
            {children}
          </RenderSheet>
        )}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.expr}
        onCellsChanged={this.handleChanges}
      />
    );
  }
}

Table.propTypes = {
  updateData: PropTypes.func.isRequired,
  checkRequiredFields: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  grid: PropTypes.array.isRequired,
};

export default withTranslation()(Table);
