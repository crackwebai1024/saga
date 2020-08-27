import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

const EnhancedTableToolbar = ({
  onAdd,
}) => (
  <Toolbar>
    <Tooltip title="Add Milestone">
      <Button aria-label="Add Milestone" color="primary" onClick={onAdd}>
        <AddIcon color="inherit" />
        Add Milestone
      </Button>
    </Tooltip>
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
