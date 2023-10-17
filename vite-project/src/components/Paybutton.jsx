/* eslint-disable no-unused-vars */
import { useState } from 'react';

const RazorpayPayment = (prop) => {
  const [paymentError, setPaymentError] = useState('');
  const [error,setError]=useState(null);
  const handlePayment = async () => {
    if (!prop.inputname || !prop.number) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^\d{10}$/.test(prop.number)) {
      
      setError('Phone number must contain exactly 10 digits');
      return;
    }

    const response = await fetch('https://message-sender-h38a-ku66okij6-jay9358s-projects.vercel.app/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 500, // Replace with your desired amount
        currency: 'INR', // Replace with your desired currency
      }),
    });
    console.log("trying");

    const data = await response.json();
    console.log(data);

    console.log();
    if (data.error) {
      setPaymentError(data.error.message);
    } else {
      const order_id = data.id;
      console.log(order_id);
      const options = {
        key: 'rzp_test_BtIi9G58cMYjTx', // Replace with your Razorpay API key
        amount: data.amount,
        currency: data.currency,
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id,
        handler: async (response) => {
          // Handle payment success here
          console.log(response);
      
          // Now, you can send data to your webhook
          try {
            const webhookResponse = await fetch('https://message-sender-h38a-ku66okij6-jay9358s-projects.vercel.app/razorpay-webhook', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // Add any other data you want to send
                name: prop.name,
                email:prop.email,
                number: prop.number,
              }),
            });
            prop.onPaymentComplete();
            const webhookData = await webhookResponse.json();
           
            console.log('Webhook response:', webhookData);
          } catch (webhookError) {
            console.error('Webhook request error:', webhookError);
          }
        },
        prefill: {
          name: prop.name,
          email: prop.email,
          contact: prop.number,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const rzp = new window.Razorpay(options);
    
        // Handle payment success here
        // You can make a separate POST request to your webhook endpoint
     

      rzp.open();

    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
      <p style={{color:"red"}}>{error}</p>
       
      {paymentError && <p>Error: {paymentError}</p>}

    </div>
  );
};

export default RazorpayPayment;
