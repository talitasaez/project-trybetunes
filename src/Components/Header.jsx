import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: false,
    userName: { },
  };

  componentDidMount() {
    this.featUser();
  }

  featUser = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        loading: false,
        userName: user,
      });
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">

        { loading ? <Loading /> : (
          <p data-testid="header-user-name">{ userName.name }</p>
        ) }

      </header>
    );
  }
}
