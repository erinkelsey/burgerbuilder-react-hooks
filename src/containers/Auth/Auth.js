import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import { checkInputValidity } from "../../shared/utility";

import classes from "./Auth.css";

const auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email Address"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...controls
    };
    const updatedFormElement = {
      ...updatedControls[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedControls[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].valid && formIsValid;
    }

    setControls(updatedControls);
    setFormIsValid(formIsValid);
  };

  const submitHandler = event => {
    event.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const buildFormElementsArray = () => {
    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }
    return formElementsArray;
  };

  const buildForm = () => {
    if (props.loading) return <Spinner />;
    return (
      <form onSubmit={submitHandler}>
        {buildFormElementsArray().map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType='Success'
          clicked={submitHandler}
          disabled={!formIsValid}
        >
          {!isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={classes.Auth}>
      {props.isAuthenticated ? (
        props.buildingBurger ? (
          <Redirect to='/checkout' />
        ) : (
          <Redirect to='/' />
        )
      ) : null}
      {props.error ? (
        <p style={{ color: "red" }}>{props.error.message}</p>
      ) : null}
      {buildForm()}
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
