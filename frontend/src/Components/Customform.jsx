import React from 'react'

import { 
    useForm, 
    FormspreeProvider, 
    CardElement, 
    ValidationError 
  } from '@formspree/react';

  const useOptions = () => {
    const options = React.useMemo(
      () => ({
        style: {
          base: {
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, monospace',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }),
      []
    );

    return options;
};
function SignupForm() {
    const options = useOptions()
    const [state, handleSubmit] = useForm('mqazqpwe');

    if (state.succeeded) {
      return <h4>Payment has been processed successfully!</h4>
    }

    return (
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
          <ValidationError errors={state.erorrs} />
        </div>
        <br />
        <div>
          <label>Card details</label>
          <CardElement options={options} />
          <ValidationError
            field="paymentMethod"
            errors={state.errors}
          />
        </div>
        <br />
        <button type="submit" disabled={state.submitting}>
          {state.submitting ? 'Processing payment...' : 'Pay'}
        </button>
      </form>
    )
  }
 
  const Customer = () => (
    <FormspreeProvider stripePK={"pk_test_51PiWhBSE0KDI8hXCRxam2jdO4zkwfbKLKsfrILXg3jFVgzX4vFi0x5us5uKKPFWU1OhqROq4SpUf6KlCM0r3R7Uo00ZZ4U568N"}>
      <SignupForm />
    </FormspreeProvider>
  )

  export default Customer;


// import React from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useForm, FormspreeProvider, ValidationError } from '@formspree/react';

// // Stripe initialization
// const stripePromise = loadStripe('pk_test_51PiWhBSE0KDI8hXCRxam2jdO4zkwfbKLKsfrILXg3jFVgzX4vFi0x5us5uKKPFWU1OhqROq4SpUf6KlCM0r3R7Uo00ZZ4U568N');

// const useOptions = () => {
//   const options = React.useMemo(
//     () => ({
//       style: {
//         base: {
//           color: '#424770',
//           letterSpacing: '0.025em',
//           fontFamily: 'Source Code Pro, monospace',
//           '::placeholder': {
//             color: '#aab7c4',
//           },
//         },
//         invalid: {
//           color: '#9e2146',
//         },
//       },
//     }),
//     []
//   );

//   return options;
// };

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     // Create a payment method
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//       // Handle form submission to Formspree if needed
//       // For example, send payment method ID and form data to your backend
//     }
//   };

//   const options = useOptions();

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" type="email" name="email" />
//         {/* ValidationError can be used to show errors if using Formspree */}
//       </div>
//       <br />
//       <div>
//         <label>Card details</label>
//         <CardElement options={options} />
//         {/* ValidationError can be used to show errors */}
//       </div>
//       <br />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const Customer = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default Customer;
