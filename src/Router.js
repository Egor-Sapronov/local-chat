import React, { PropTypes, Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import App from './components/app/app';
import Login from './components/login/login';
import ChatFooter from './components/chat/footer/footer';
import ChatNavbar from './components/chat/navbar/navbar';
import Messages from './components/chat/messages/messages';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.authRequired = this.authRequired.bind(this);
  }

  authRequired(state, replace) {
    if (!this.props.isLoggedIn || !this.props.isLocation) {
      replace('/login');
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute
            components={{
              content: Messages,
              navbar: ChatNavbar,
              footer: ChatFooter,
            }}
            onEnter={this.authRequired}
          />
          <Route
            path="login"
            components={{
              content: Login,
            }}
          />
        </Route>
      </Router>
    );
  }
}

const selector = createSelector(
  state => state.user,
  state => state.geo,
  (user, geo) => ({
    isLoggedIn: user.isLoggedIn,
    isLocation: !!geo.location,
  })
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isLocation: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(selector)(AppRouter);
