import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSuccessful = async (
  config,
  order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount_paid,
  package_id,
  user_id
) => {
  amount_paid /= 100;
  let orderDetails = {
    package_id,
    package_cost: amount_paid,
    user_id,
  };
  try {
    const { data } = await axios.post(
      '/api/razorpay/verify-payment',
      {
        order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount_paid,
        orderDetails,
      },
      {
        headers: {
          Authorization: config.headers.Authorization,
        },
      }
    );
    if (data && data.success) {
      toast.success(data.message);
    } else {
      toast.error(
        'Payment verification has failed. Any amount deducted will be refunded shortly. Please try your payment again.'
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export default async function displayRazorpay(config, packageId, user) {
  const { data } = await axios.post(
    '/api/razorpay/create-order',
    { packageId: packageId },
    {
      headers: {
        Authorization: config.headers.Authorization,
      },
    }
  );

  const options = {
    key: process.env.RAZ_ID,
    currency: data.currency,
    amount: data.amount,
    name: 'Travel Accuracy Package',
    description: 'Wallet Transaction',
    image: 'http://localhost:5000/logo',
    order_id: data.id,
    handler: function (response) {
      PaymentSuccessful(
        config,
        data.id,
        response.razorpay_payment_id,
        response.razorpay_signature,
        data.amount.toString(),
        packageId,
        data.user.id
      );
    },
    prefill: {
      name: data.user.name,
      email: data.user.email,
      contact: data.user.phone,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on('payment.failed', function (response) {
    toast.error('Payment failed. Please try again!');
  });
  paymentObject.open();
}
