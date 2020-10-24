import React, { useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

// Lazy loading
const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignIn();
  }, []);

  const buildRoutes = () => {
    if (props.isAuthenticated) {
      return (
        <Switch>
          <Route path='/checkout' render={props => <Checkout {...props} />} />
          <Route path='/orders' render={props => <Orders {...props} />} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' render={props => <Auth {...props} />} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path='/auth' render={props => <Auth {...props} />} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
  };

  return (
    <Router>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{buildRoutes()}</Suspense>
      </Layout>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
