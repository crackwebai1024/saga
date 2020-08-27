import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const ButtonDelete = ({
  rowId,
  deleteRow,
  label,
}) => (
  <Button
    aria-label={label}
    size="small"
    onClick={() => {
      deleteRow(rowId);
    }}
  >
    <DeleteIcon color="inherit" />
  </Button>
);

ButtonDelete.propTypes = {
  rowId: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  label: PropTypes.string,
};
ButtonDelete.defaultProps = {
  label: '',
};

export default ButtonDelete;
