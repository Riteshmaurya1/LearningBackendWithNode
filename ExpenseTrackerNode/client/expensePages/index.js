const GlobalLink = "http://localhost:3000/expense";
const PaymentLink = "http://localhost:3000/payment";
const PremiumFeatureLink = "http://localhost:3000/premium";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../signUp/signup.html";
}

// Display a single expense item
function display(expenseData) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  if (expenseData.id) li.dataset.id = expenseData.id;

  const span = document.createElement("span");
  span.textContent = `${expenseData.amount} - ${expenseData.description} - ${expenseData.category}`;
  li.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style =
    "background:black;color:white;height:35px;width:60px;margin-left:10px;";
  li.appendChild(deleteBtn);

  ul.appendChild(li);

  // Delete expense
  deleteBtn.addEventListener("click", async () => {
    try {
      const response = await axios.delete(
        `${GlobalLink}/delete/${expenseData.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Expense deleted successfully.");
        li.remove();
      } else {
        alert("Failed to delete expense.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting expense.");
    }
  });
}

// Add new expense
async function handleExpense(event) {
  event.preventDefault();

  const expenseAmount = event.target.expenseamount.value.trim();
  const description = event.target.description.value.trim();
  const category = event.target.category.value.trim();

  const data = { amount: expenseAmount, description, category };

  try {
    const response = await axios.post(`${GlobalLink}/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200 || response.status === 201) {
      alert("Expense added successfully.");
      display(response.data.newExpense || data);
    } else {
      alert("Expense not added.");
    }
  } catch (err) {
    alert("Failed: " + (err.response?.data?.message || err.message));
  }

  event.target.reset();
}

// Load expenses on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(`${GlobalLink}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.data.expenseList.forEach(display);
  } catch (error) {
    console.error(error);
    alert("Failed to load expenses.");
  }
});

// Payment Btn for getting premium subscription.
const premiumBtn = document.getElementById("premiumBtn");
const cashfree = Cashfree({ mode: "sandbox" });

premiumBtn.addEventListener("click", async () => {
  try {
    const orderId = `order_${Date.now()}`;
    const paymentSession = await axios.post(
      `${PaymentLink}/pay`,
      { orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const checkoutOptions = {
      paymentSessionId: paymentSession?.data?.paymentSessionId,
      redirectTarget: "_self",
    };

    cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.error("Payment error:", error);
    alert("Error initiating payment.");
  }
});

// Leaderboard of premium feature functionality
const leaderboardBtn = document.getElementById("leaderboardBtn");
leaderboardBtn.addEventListener("click", async () => {
  try {
    const res = await axios.get(`${PremiumFeatureLink}/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const ul = document.getElementById("leaderBoard");
    ul.innerHTML = "";
    res.data.data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.username} - ₹${item.TotalExpenses}`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert("Error loading leaderboard.");
  }
});
