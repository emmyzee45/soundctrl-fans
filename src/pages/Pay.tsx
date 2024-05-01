import React, { useState, useEffect } from "react";
import { loadStripe, Stripe, StripeElementsOptions, Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CheckoutForm from "../components/stripe/CheckOutForm";
import "../components/stripe/pay.css";
import axios from "axios";

const stripeKey: string = "pk_test_51OYl3MHuxvfPN8eLcxKFWOqMKjvkRgrTKVQisgLiMcEafuYzrCi6d9T63KYXTYFEusQIg1psD3BeGeA2gjBbf9YJ00mXhJ97xf" || "";

const stripePromise: Promise<Stripe | null> = loadStripe(stripeKey)


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  const {id} = useParams();
  const {search} = useLocation();
  const type = new URLSearchParams(search).get("type");
  const price = new URLSearchParams(search).get("price");

  useEffect(() => {
    const createPaymentIntent = async() => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders/create-payment-intent`, {price, type, artistId: id});
        setClientSecret(res.data.clientSecret)
      }catch(err) {
        console.log(err)
      }
    }
    createPaymentIntent();
  },[]);

  const appearance: Appearance = {
    theme: "stripe",
  }
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}