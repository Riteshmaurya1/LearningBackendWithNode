const { Cashfree, CFEnvironment } = require("cashfree-pg");
require("dotenv").config();
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  `${process.env.CASHFREE_FIRST_API}`,
  `${process.env.CASHFREE_SECOND_API}`
);

// Create Order
const createOrder = async (
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerID,
  customerEmail,
  customerName
) => {
  try {
    const customer_phone = "9685741230";
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    const formattedExpiryDate = expiryDate.toISOString();

    const request = {
      order_amount: orderAmount,
      order_currency: orderCurrency,
      order_id: orderId,
      customer_details: {
        customer_id: customerID,
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone,
      },
      order_meta: {
        // return_url: `http://localhost:3000/premium/payment-status/${orderId}`,
        return_url: `http://127.0.0.1:5500/client/payment/status.html?orderId=${orderId}`,
        payment_methods: "cc,dc,upi",
      },
      order_expiry_time: formattedExpiryDate,
    };

    const response = await cashfree.PGCreateOrder(request);
    if (!response?.data?.payment_session_id) {
      console.error("Cashfree response error:", response?.data);
      throw new Error("No payment_session_id returned from Cashfree");
    }
    return response.data.payment_session_id;
  } catch (error) {
    // console.error("Error Creating Order", error.message);
    console.error(
      "Error Creating Order:",
      error.response?.data || error.message
    );
  }
};

// Check order status with userId
const orderStatus = async (orderId) => {
  // Step 1: Fetch order status from Cashfree
  const response = await cashfree.PGOrderFetchPayments(orderId);
  const payments = response?.data || [];

  if (!payments.length) {
    throw new Error("No payment records found in Cashfree");
  }

  // // Step 3: Get the most recent payment
  const latestPayment = payments[0];
  const { payment_status, payment_message, payment_amount } = latestPayment;

  // send status to the
  return {
    payment_status,
    payment_message,
    payment_amount,
  };
};

module.exports = { createOrder, orderStatus };
