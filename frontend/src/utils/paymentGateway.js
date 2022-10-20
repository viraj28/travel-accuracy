import axios from 'axios';

export default async function displayRazorpay(config, packageId, user) {
  const { data } = await axios.post(
    '/razorpay/create-order',
    { packageId: packageId },
    {
      headers: {
        Authorization: config.headers.Authorization,
      },
    }
  );

  console.log(data);

  const options = {
    key: process.env.RAZ_ID,
    currency: data.currency,
    amount: data.amount,
    name: 'Travel Accuracy Package',
    description: 'Wallet Transaction',
    image: 'http://localhost:5000/logo.png',
    order_id: data.id,
    handler: function (response) {
      alert('PAYMENT ID ::' + response.razorpay_payment_id);
      alert('ORDER ID :: ' + response.razorpay_order_id);
    },
    prefill: {
      name: data.user.name,
      email: data.user.email,
      contact: data.user.phone,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
