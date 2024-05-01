import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function CheckOutForm() {
    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate();
    const { id } = useParams();
    const {search} = useLocation();
    const type = new URLSearchParams(search).get("type");
    const price = new URLSearchParams(search).get("price");
    const artist_id = new URLSearchParams(search).get("artist_id");

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [payment_intent, setPaymentIntent] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    // useEffect(() => {
    //     const confirmPayment = async() => {
    //         try {
    //             await axios.put(`${proces.env.REACT_APP_BASE_URL}/orders/confirm`, {payment_intent});
    //             navigate(`/book/${id}`);
    //         }catch(err) {
    //             console.log(err)
    //         }
    //     }
    //     payment_intent  && confirmPayment();
    // },[payment_intent])
    
    useEffect(() => {
        if(!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if(!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.success) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again!");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    },[stripe])
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmsParams: {
                return_url: "https://localhost:3000/trending"
            },
            redirect: "if_required",
        });
        if(error) {
            if(error?.type === "card_error" || error?.type === "validation_error") {
                setMessage(error.message);
            } 
            else {
                setMessage("An unexpected error occured.")
            }
        } else {
            setMessage("Payment succeeded!")
            navigate("/success", {state: { type, id, artist_id, payment_intent: paymentIntent.id }, replace: true})
            // setPaymentIntent(paymentIntent.id);
        }

        setIsLoading(false);
       
    }
    
    const paymentElementOptions = {
        layout: "tabs",
    }
  return (
    <div className="stripe-body">
        <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
            {/* <LinkAuthenticationElement
                id='link-authentication-element'
                onChange={handleChange}
            /> */}
            <PaymentElement id='payment-element' options={paymentElementOptions}/>
            <button className='stripe-button' disabled={isLoading || !stripe || !elements} id="submit">
                <span id='button-text'>
                    {isLoading ? <div className='spinner' id="spinner"></div>: "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    </div>
  )
}
