const globalLink = `http://localhost:3000/expense`;
// const globalLink = `https://crudcrud.com/api/7cedfc7e0cce4396809836b0f180f127/expense`;
let currentEditId = null;

async function handleFormSubmit(event) {
  // prevent default for page reloding
  event.preventDefault();

  const amount = event.target.amount.value.trim();
  const description = event.target.description.value.trim();
  const category = event.target.category.value.trim();

  const expenseDetails = {
    amount,
    description,
    category,
  };

  try {
    if (currentEditId) {
      // Update existing expense
      await axios.put(`${globalLink}/update/${currentEditId}`, expenseDetails);
      const existingExpense = document.querySelector(
        `li[data-id="${currentEditId}"]`
      );
      if (existingExpense) {
        const span = existingList.querySelector("span");
        span.textContent = `${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`;
      }
      currentEditId = null;
    } else {
      // add new wxpwnse
      const res = await axios.post(`${globalLink}/add`, expenseDetails);
      console.log(res.data.data);
      display(res.data.data);
    }
    event.target.reset();
  } catch (err) {
    console.log(err);
  }
  console.log(expenseDetails);
}

function display(expnseData) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  li.dataset.id = expnseData.id;

  const span = document.createElement("span");
  span.textContent = `${expnseData.amount} - ${expnseData.description} - ${expnseData.category}`;
  li.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style = "background:red;color:white;margin-left:5px;";
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style = "margin-left:5px;";
  li.appendChild(editBtn);

  ul.appendChild(li);

  // Delete functionality
  deleteBtn.addEventListener("click", async (event) => {
    const el = event.target.parentElement;
    const id = el.dataset.id;

    try {
      await axios.delete(`${globalLink}/delete/${id}`);
      ul.removeChild(el);
    } catch (error) {
      console.error(error);
    }
  });

  // Edit functionality
  editBtn.addEventListener("click", async (event) => {
    const el = event.target.parentElement;
    const id = el.dataset.id;

    // Prefill data for edit from api's
    const [amount, description, category] = el
      .querySelector("span")
      .textContent.split(" - ");
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;

    currentEditId = id;
  });
}

// *************************** Load all expenses ***************************
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(`${globalLink}/all`);
    res.data.forEach((ele) => console.log(ele));

    res.data.forEach(display);
  } catch (error) {
    console.error(error);
  }
});
