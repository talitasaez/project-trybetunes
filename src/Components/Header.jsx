import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    const user = getUser();
    this.setState({
      userName: user,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <Header data-testid="header-component">

        { loading ? <Loading /> : <p data-testid="header-user-name">{ userName }</p> }

      </Header>
    );
  }
}
