import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import Customform from "./Components/Customform";


function App() {
  const [product, setProduct] = useState({
    name: "React from Attractive-Mediaz",
    price: 10,
    productBy: "attractive-mediaz",
  });
 

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:4000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("Status", status);
      })
      .catch((error) => console.log(error));


  };








  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p></p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        Learn React
        <StripeCheckout
          stripeKey={"pk_test_51PiUSvRsJPFvYFKyLba75beol7KtsiWyjj70r15zDLkZPKg28LV3lHEUstpxwBPz5XI2WnXdXT2zKJUOiHkzJhWe00V7tlgWzf"}
          token={makePayment}
          name="buy React"
          amount={product.price * 100}
          currency="USD"
        >
        <button className="btn-large blue">Buy React in {product.price} $</button>



        </StripeCheckout>
       
      </header>
    </div>
  );
}

export default App;
