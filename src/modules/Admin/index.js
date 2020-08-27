import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as globalActions } from 'redux/global';
import { bindActionCreators } from 'redux';

import Footer from 'components/Footer';
import Drawer from 'components/Drawer';
import Users from './Users';
// import Header from './CommonComponents/Header';
import Header from '../Global/CommonComponents/Header';
import Countries from './Countries';
import Sections from './Dashboard';
import Milestones from './Dashboard/Milestones';
import Projects from './Projects';

import * as S from './styled';

const Root = () => (<Redirect to="/admin/users" />);

class Admin extends React.Component {
  componentDidMount() {
    this.props.actions.setGlobalTheme();
  }

  render() {
    return (
      <S.Wrapper>
        <>
          <S.Container>
            <Header />
            <Drawer anchor="right" />
            <S.Content>
              <Switch>
                <Route path="/admin/users" component={Users} />
                <Route path="/admin/countries" component={Countries} />
                <Route exact path="/admin/projects" component={Projects} />
                <Route exact path="/admin/country/:slug/projects" component={Projects} />
                <Route exact path="/admin/country/:countryId/projects/:projectId/dashboard" component={Sections} />
                <Route
                  path="/admin/country/:countryId/projects/:projectId/dashboard/section/:sectionId/milestones"
                  component={Milestones}
                />
                <Route exact path="/admin/" component={Root} />
              </Switch>
            </S.Content>
            <Footer />
          </S.Container>
        </>
      </S.Wrapper>
    );
  }
}

Admin.propTypes = {
  actions: PropTypes.shape({
    setGlobalTheme: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...globalActions,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(Admin);
