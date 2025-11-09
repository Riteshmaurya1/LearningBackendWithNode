const { createOrder, orderStatus } = require("../Services/cashfreeService");
const Payment = require("../Model/payment");
const User = require("../Model/user");

// Make Payment
const processPayment = async (req, res) => {
  try {
    const orderAmount = 2000;
    const orderCurrency = "INR";

    // access token from payload
    const { id, username, email } = req.payload;
    const { orderId } = req.body;
    
    // Create an order and get payment sessionId.
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      String(id),
      username,
      email
    );

    // check if sessionId
    if (!paymentSessionId) {
      console.error("Failed to create Cashfree order. Session ID missing.");
      return res
        .status(400)
        .json({ message: "Failed to create payment session" });
    }

    // save payment details to the database.
    await Payment.create({
      orderId,
      userId: id,
      paymentSessionId,
      orderAmount,
      orderCurrency,
      paymentStatus: "pending",
    });
    res.json({ paymentSessionId, orderId });
  } catch (error) {
    console.log("Error processing payment:", error.message);
    res.status(500).json({ message: "Error processing payment" });
  }
};

// Check Payment Status
const getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.payload.id;

  try {
    // Step 1: Invoke OrderStatus func.
    let { payment_status, payment_message, payment_amount } = await orderStatus(
      orderId
    );

    // update the user isPremium.
    let user = await User.findByPk(userId);

    if (payment_status === "SUCCESS") {
      // Update isPremium status if user has successfull transaction
      await user.update({ isPremium: 1 });
    }
    console.log(user);

    // Align Order Status with payment status
    let paymentOrderStatus;
    if (payment_status === "SUCCESS") {
      paymentOrderStatus = "Success";
    } else if (payment_status === "PENDING") {
      paymentOrderStatus = "Pending";
    } else {
      paymentOrderStatus = "Failed";
      payment_message = "TRANSACTION FAILED.";
    }

    // Step 2: Update payment in DB
    await Payment.update(
      {
        paymentStatus: paymentOrderStatus,
        paymentMessage: payment_message || "",
        orderAmount: payment_amount,
      },
      { where: { orderId } }
    );

    // Step 3: Respond to the client
    return res.status(200).json({
      orderId,
      paymentStatus: payment_status,
      message: payment_message,
      amount: payment_amount,
      isPremium: user.isPremium,
    });
  } catch (error) {
    if (error.response?.data?.code === "order_not_found") {
      return res.status(404).json({ message: "Order not found in Cashfree" });
    }
    console.error(
      "Error fetching payment status:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Error fetching payment status" });
  }
};

module.exports = { processPayment, getPaymentStatus };