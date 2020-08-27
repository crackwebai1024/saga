import { createSelector } from 'reselect';

const getDetails = (state) => state.country;

const getSelectedDetails = createSelector(
  [getDetails],
  ({ details, selectedProject, country }) => ({
    details,
    project: selectedProject,
    country,
  }),
);

const mapStateToProps = (state) => ({
  details: getSelectedDetails(state),
  selectedYear: state.indicatorDetails.year,
});

export default mapStateToProps;
