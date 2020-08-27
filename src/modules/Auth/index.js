import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from 'components/Footer';

import SelectLanguage from 'components/SelectLanguage';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Terms from './Terms';

import * as S from './styled';

const Auth = () => (
  <S.Wrapper>
    <>
      <S.Container>
        <S.Header>
          <S.HeaderContent>
            <S.Logo />
          </S.HeaderContent>
          <SelectLanguage country={false} />
        </S.Header>
        <S.Content>
          <Switch>
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            <Route path="/password/:action" component={ResetPassword} />
            <Route path="/terms/:type" component={Terms} />
          </Switch>
        </S.Content>
        <Footer />
      </S.Container>
    </>
  </S.Wrapper>
);


export default (Auth);
