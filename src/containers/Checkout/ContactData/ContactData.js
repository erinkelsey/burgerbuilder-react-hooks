import React, { useState } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { checkInputValidity } from "../../../shared/utility";

import classes from "./ContactData.css";

const contactData = props => {
  const [form, setForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      valid: true,
      validation: {},
      value: "fastest"
    }
  });
  const [formValid, setFormValid] = useState(false);

  const createFormPostData = () => {
    const formData = {};
    for (let formElementIdentifier in form) {
      formData[formElementIdentifier] = form[formElementIdentifier].value;
    }
    return formData;
  };

  const orderHandler = event => {
    event.preventDefault(); // stop form from submitting

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: createFormPostData(),
      userId: props.userId
    };

    props.onOrderBurger(props.token, order);
  };

  const inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...form
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    setForm(updatedOrderForm);
    setFormValid(formIsValid);
  };

  const buildFormElementsArray = () => {
    const formElementsArray = [];
    for (let key in form) {
      formElementsArray.push({
        id: key,
        config: form[key]
      });
    }
    return formElementsArray;
  };

  const buildForm = () => {
    if (props.loading) return <Spinner />;
    return (
      <form onSubmit={orderHandler}>
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
        <Button btnType='Success' clicked={orderHandler} disabled={!formValid}>
          ORDER
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {buildForm()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (token, orderData) =>
      dispatch(actions.purchaseBurger(token, orderData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
