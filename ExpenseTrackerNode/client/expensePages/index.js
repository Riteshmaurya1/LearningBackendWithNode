const GlobalLink = "http://localhost:3000/expense";
const PaymentLink = "http://localhost:3000/payment";
const PremiumFeatureLink = "http://localhost:3000/premium";
const UserProfile = "http://localhost:3000/user";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../signUp/signup.html";
}

// Offset & LIMIT for the pagination in DB
const limitInput = document.getElementById("expenses-limit");
limitInput.style.width = "50px";

// Ensure default values and correct parsing
let currentPage = 1;
let page = currentPage;
let limit = parseInt(limitInput.value) || 5; // fallback default to 5

// Load initial expenses
loadExpenses(page, limit);

// Reload when user changes limit
limitInput.addEventListener("change", () => {
  limit = parseInt(limitInput.value) || 5;
  page = 1; // reset to first page when limit changes
  loadExpenses(page, limit);
});

const ul = document.querySelector("ul");
function display(expense) {
  console.log(expense);

  const li = document.createElement("li");

  li.dataset.id = expense.id;

  const span = document.createElement("span");
  span.textContent = `
  ${expense.amount} - ${expense.description} - ${expense.category} - ${expense.note}
  `;
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
        `${GlobalLink}/delete/${expense.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Expense deleted successfully.");
        li.remove();
        loadExpenses(1);
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
  const note = event.target.note.value.trim();
  const category = event.target.category.value.trim();

  const data = { amount: expenseAmount, description, note, category };

  try {
    const response = await axios.post(`${GlobalLink}/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadExpenses(currentPage, limit);
    if (response.status === 200 || response.status === 201) {
      alert("Expense added successfully.");
      // I decebale it becouse it is renders two times.
      // display(response.data.newExpense || data);
    } else {
      alert("Expense not added.");
    }
  } catch (err) {
    alert("Failed: " + (err.response?.data?.message || err.message));
  }

  event.target.reset();
}

// Load expenses on page load
async function loadExpenses(page = 1) {
  try {
    ul.innerHTML = "";
    const res = await axios.get(
      `${GlobalLink}/all?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Display the data for the current page.
    res.data.expenses.forEach(display);

    // update pagination buttons
    document.getElementById("prevBtn").disabled = !res.data.hasPrevPage;
    document.getElementById("nextBtn").disabled = !res.data.hasNextPage;

    // Update the current page.
    currentPage = res.data.currentPage;
  } catch (error) {
    console.error(error);
    alert("Failed to load expenses.");
  }
}

// Handle pagination clicks
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) loadExpenses(currentPage - 1);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  loadExpenses(currentPage + 1);
});

// Initial load of fetching expnses.
window.addEventListener("DOMContentLoaded", () => loadExpenses());

// ############################# Payment Buttton ##########################

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

// ############################# LeaderBord Buttton ##########################

// Leaderboard of premium feature functionality
function loadLeaderBoard() {
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
}

window.addEventListener("DOMContentLoaded", () => loadLeaderBoard());

// ############################# LeaderBord Buttton hide and Display ##########################

const premiumWelconeSpan = document.getElementById("premium-span");
const leaderBoardDiv = document.getElementById("leaderBoard-div");
const downloadBtn = document.getElementById("download-Btn");

async function hideAndDisplayPremium() {
  try {
    const userData = await axios.get(`${UserProfile}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const paymentStatus = userData?.data?.data?.isPremium;
    console.log(paymentStatus);

    if (paymentStatus) {
      leaderboardBtn.style.display = "inline-block";
      leaderBoardDiv.style.display = "inline-block";
      downloadBtn.style.display = "inline-block";
      premiumWelconeSpan.innerText = "You are now premium user";
      premiumWelconeSpan.style.display = "inline-block";
    } else {
      premiumBtn.style.display = "inline-block";
    }
  } catch (error) {
    console.log(error);
  }
}
hideAndDisplayPremium();

// Download Summary
downloadBtn.addEventListener("click", async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/download", {
      headers: { Authorization: token },
    });
    if (response.status === 201) {
      //the bcakend is essentially sending a download link
      //  which if we open in browser, the file would download
      var a = document.createElement("a");
      a.href = response.data.fileUrl;
      a.download = "myexpense.csv";
      a.click();
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
});
