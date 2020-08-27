import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  text-align: left;
  table-layout: auto !important;

  .read-only {
    background: ${({ theme }) => theme.colors.primaryWhite} !important;
  }
`;

export const Tr = styled.tr`
  background: ${({ theme }) => theme.colors.tableGray};
  font-weight: bold;

  .delete {
    width: 60px;
    padding: 10px 0;
    text-align: center; 
  }

  .date,
  .regionId {
    min-width: 100px;
    width: 100px;
  }
`;

export const Th = styled.th`
  position: sticky;
  z-index: 1;
  top: -1px;
  background: ${({ theme }) => theme.colors.tableGray};
  border: 0.25px solid ${({ theme }) => theme.colors.tableBorderGray};
  padding: 10px 15px;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.tableBorderGray};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;  
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.tableBorderGray};
  }
`;

export const Tbody = styled.tbody`
  td.editing {
    border: 2px solid rgb(33, 133, 208) !important;
    background: transparent !important;
    opacity: 1 !important;
  }

  .required {
    border: 2px solid ${({ theme }) => theme.colors.error} !important;
    background: rgba(208, 2, 27, 0.1) !important;
  }

  .selected.required {
    border: 2px solid ${({ theme }) => theme.colors.error} !important;
    background: ${({ theme }) => theme.colors.selectedCellTableBlue} !important;
    opacity: 1 !important;
  }

  td {
    border: 0.25px solid ${({ theme }) => theme.colors.tableBorderGray} !important;
    text-align: left !important;
    padding: 10px 15px !important;
  }

  td:last-child {
    padding: 10px 0 !important;
  }

  .MuiInput-input {
    text-align: center !important;
  }

  input {
    height: 100% !important;
    text-align: left !important;
    border: none !important;
  }
`;
