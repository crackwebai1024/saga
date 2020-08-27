import React from 'react';
import PropTypes from 'prop-types';

import PrintIcon from '@material-ui/icons/Print';

import * as S from './styled';

const PrintButton = ({
  className,
  handlePrint,
}) => (
  <S.FabWrapper className={className}>
    <S.StyledFab
      variant="extended"
      size="small"
      color="primary"
      aria-label="print"
      onClick={handlePrint}
    >
      <PrintIcon />
    </S.StyledFab>
  </S.FabWrapper>
);

PrintButton.propTypes = {
  handlePrint: PropTypes.func.isRequired,
  className: PropTypes.any,
};
PrintButton.defaultProps = {
  className: undefined,
};

export default PrintButton;
