import React, { Component } from 'react';
import GitHub from '../../services/github';
import UserProfile from './components/userProfile';

class User extends Component {
  state = {
    isLoading: false,
    user: {},
    hasError: false,
  }

  componentDidMount = () => {
    const { match: { params: { name } } } = this.props;

    this.setState({
      isLoading: true,
    });

    GitHub.getUser(name)
      .then(response => {
        this.setState({
          isLoading: false,
          user: response.data,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      });
  }

  render() {
    const { user, isLoading, hasError } = this.state;
    return (
      <UserProfile
        user={user}
        isLoading={isLoading}
        hasError={hasError}
      />
    );
  }
}

export default User;
