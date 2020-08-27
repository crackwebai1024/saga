import React from 'react';
import PropTypes from 'prop-types';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const ExpandIcon = ({ isExpanded }) => (isExpanded ? <ExpandLess /> : <ExpandMore />);

ExpandIcon.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

export default ExpandIcon;
