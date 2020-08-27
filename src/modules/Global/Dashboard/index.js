import React, { Component } from 'react';

import Legend from 'components/Legend';
import Header from './Header';
import Content from './Content';
import Filters from './Filters';

import * as S from './styled';

class Dashboard extends Component {
  state = {
    isPrint: false,
  }

  printDashboard = () => {
    this.setState({ isPrint: true });
  };

  onPrint = (bool) => {
    this.setState({ isPrint: bool });
  }

  render() {
    const { isPrint } = this.state;

    return (
      <S.Wrapper>
        <Header printDashboard={this.printDashboard} />
        <Filters />
        <Content isPrint={isPrint} onPrint={this.onPrint} />
        <S.StickyFooter>
          <Legend />
        </S.StickyFooter>
      </S.Wrapper>
    );
  }
}

export default Dashboard;
