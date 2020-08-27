import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Footer from 'components/Footer';

import Drawer from 'components/Drawer';
import Dashboard from './Dashboard';
import Header from './CommonComponents/Header';

import * as S from './styled';

const Root = () => (<Redirect to="/global/dashboard" />);

const Global = () => (
  <S.Wrapper>
    <>
      <S.Container>
        <Header />
        <Drawer anchor="right" />
        <S.Content>
          <Switch>
            <Route path="/global/dashboard" component={Dashboard} />
            <Route exact path="/global" component={Root} />
          </Switch>
        </S.Content>
        <Footer />
      </S.Container>
    </>
  </S.Wrapper>
);

export default Global;
