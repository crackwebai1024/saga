import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import * as S from './styled';
import Highlights from '../Highlights';
import Map from '../Map';
import Milestones from '../Milestones';
import Graph from '../Graph';

const Report = ({
  match: {
    params: {
      indicatorId,
      sectionId,
      page,
    },
  },
  milestones,
}) => (
  <S.ReportContainer>
    <Highlights />
    <Map indicatorId={indicatorId} page={page} />
    <Graph indicatorId={indicatorId} page={page} />
    {
      milestones && milestones.length > 0
      && <Milestones indicatorId={indicatorId} sectionId={sectionId} />
    }
  </S.ReportContainer>
);

Report.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string.isRequired,
      indicatorId: PropTypes.string.isRequired,
      sectionId: PropTypes.string.isRequired,
      groupId: PropTypes.string,
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  // selector: PropTypes.object.isRequired,
  // countryId: PropTypes.number.isRequired,
  // projectId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    getIndicatorDetailsListRequest: PropTypes.func.isRequired,
    resetIndicatorDetailsListData: PropTypes.func.isRequired,
  }).isRequired,
  milestones: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  indicatorDetails: {
    selector,
    indicatorData: {
      indicatorsMilestones: milestones,
    },
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  selector,
  milestones,
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
