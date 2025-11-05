const GlobalLink = "http://localhost:3000/expense";
const PaymentLink = "http://localhost:3000/premium";
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../signUp/signup.html";
}

function display(expenseData) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  if (expenseData.id) {
    li.dataset.id = expenseData.id;
  }

  // Make a new span tag for the combining the elements.
  const span = document.createElement("span");
  span.textContent = `${expenseData.amount} - ${expenseData.description} - ${expenseData.category}`;
  // then append to the main li.
  li.appendChild(span);

  // then add delete and edit button on users list.
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style =
    "background:black;color:white;radius:1px;height:35px;width:50px";
  li.appendChild(deleteBtn);

  // then appnd the both button wit li to the ul.
  ul.appendChild(li);

  // then make delete functionlity in the users lists.
  deleteBtn.addEventListener("click", async function (event) {
    const el = event.target.parentElement;
    const id = el.dataset.id;
    console.log(id);

    try {
      const response = await axios.delete(`${GlobalLink}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert(`Expense Deleted Successfully.`);
      } else {
        alert("Expense not Deleted");
      }
    } catch (err) {
      alert("Deletion failed: ");
    }
  });
}

async function handleExpense(event) {
  event.preventDefault();

  // extracting the values from the add expense form.
  const expenseAmount = event.target.expenseamount.value.trim();
  const description = event.target.description.value.trim();
  const category = event.target.category.value.trim();

  //   making the object from extracted data
  const extractedData = {
    amount: expenseAmount,
    description,
    category,
  };
  console.log(extractedData);

  try {
    const response = await axios.post(`${GlobalLink}/add`, extractedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200 || response.status === 201) {
      alert(`Expense added Successfully.`);
    } else {
      alert("Expense not added");
    }
  } catch (err) {
    alert("failed: " + (err.response?.data?.message || err.message));
  }

  event.target.reset();
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(`${GlobalLink}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.data.expenseList.forEach((exp) => display(exp));
  } catch (error) {
    alert(`Error: ` + error.message);
    console.error(error);
  }
});

// premium button
const premiumBtn = document.getElementById("renderBtn");
const cashfree = Cashfree({
  mode: "sandbox",
});
premiumBtn.addEventListener("click", async () => {
  try {
    const orderId = `order_${Date.now()}`;
    const sessionIdResponse = await axios.post(
      `${PaymentLink}/pay`,
      { orderId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    let checkoutOptions = {
      paymentSessionId: sessionIdResponse?.data?.paymentSessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.log(error);
  }
});
