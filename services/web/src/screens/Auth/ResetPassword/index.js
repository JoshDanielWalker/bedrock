import React from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { withSession } from 'stores';
import { request } from 'utils/api';
import { screen } from 'helpers';

import PageCenter from 'components/PageCenter';
import LogoTitle from 'components/LogoTitle';
import Form from './Form';
import { Link } from 'react-router-dom';

import { getToken, parseToken } from 'utils/token';

@screen
@withSession
export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    const token = getToken(props);
    this.state = {
      token,
      jwt: parseToken(token),
      loading: false,
      success: false,
      error: null,
    };
  }

  onSubmit = async (body) => {
    try {
      const { password, repeat } = body;
      if (password !== repeat) {
        throw new Error('Passwords do not match.');
      }
      const { token } = this.state;
      this.setState({
        loading: true,
        error: null,
      });
      const { data } = await request({
        method: 'POST',
        path: '/1/auth/set-password',
        token,
        body: {
          password,
        }
      });
      await this.context.setToken(data.token);
      this.setState({
        loading: false,
        success: true,
      });
    } catch(error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  render() {
    const { jwt, error, loading, success } = this.state;
    return (
      <PageCenter>
        <LogoTitle title="Reset Password" />
        <Segment.Group>
          <Segment padded>
            {(!jwt) && (
              <Message error>
                <Message.Header>No valid token found</Message.Header>
                <Message.Content>
                  Please ensure you either click the email link in the email
                  or copy paste the link in full.
                </Message.Content>
              </Message>
            )}
            {success && (
              <Message info>
                <Message.Header>Your password has been changed!</Message.Header>
                <p>
                  Click here to open the <Link to="/">Dashboard</Link>
                </p>
              </Message>
            )}
            {!success && jwt && (
              <Form onSubmit={this.onSubmit} loading={loading} error={error} />
            )}
          </Segment>
        </Segment.Group>
      </PageCenter>
    );
  }
}
