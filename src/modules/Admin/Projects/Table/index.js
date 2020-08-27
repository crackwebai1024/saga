import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Body from './Body';

import * as S from './styled';

const options = {
  displayedValues: new Map([
    ['name', 'project_name'],
  ]),
};

const Content = (props) => {
  const {
    projects,
    onEdit,
    onDelete,
    selectedCountry,
    isLoading,
  } = props;

  return (
    <S.StyledPaper>
      <S.TableWrapper>
        <S.StyledTable aria-labelledby="tableTitle">
          <Header
            onRequestSort={() => {}}
            displayedValues={options.displayedValues}
          />
          {selectedCountry && !isLoading && (
            <Body
              rows={projects}
              displayedValues={options.displayedValues}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </S.StyledTable>
      </S.TableWrapper>
    </S.StyledPaper>
  );
};

Content.propTypes = {
  projects: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedCountry: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Content;
