const globalLink = "http://localhost:3000/user";
let currentEditId = null;

// *************************** Handle Form ***************************
async function handleForm(e) {
  e.preventDefault();

  const username = e.target.username.value.trim();
  const phoneNumber = e.target.phoneNumber.value.trim();
  const email = e.target.email.value.trim();

  const userData = { username, phoneNumber, email };

  try {
    if (currentEditId) {
      // Update existing user
      await axios.put(`${globalLink}/update/${currentEditId}`, userData);
      const existingList = document.querySelector(
        `li[data-id="${currentEditId}"]`
      );
      if (existingList) {
        const span = existingList.querySelector("span");
        span.textContent = `${userData.username} - ${userData.phoneNumber} - ${userData.email}`;
      }
      currentEditId = null;
    } else {
      // Add new user
      const res = await axios.post(`${globalLink}/add-user`, userData);
      console.log(res.data.data);
      display(res.data.data);
    }
    e.target.reset();
  } catch (error) {
    console.error(error);
  }
}

// *************************** Display Function ***************************
function display(userData) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  li.dataset.id = userData.id;

  const span = document.createElement("span");
  span.textContent = `${userData.username} - ${userData.phoneNumber} - ${userData.email}`;
  li.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style = "background:purple;color:white;margin-left:5px;";
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style = "margin-left:5px;";
  li.appendChild(editBtn);

  ul.appendChild(li);

  // Delete functionality
  deleteBtn.addEventListener("click", async (e) => {
    const el = e.target.parentElement;
    const id = el.dataset.id;

    try {
      await axios.delete(`${globalLink}/delete/${id}`);
      ul.removeChild(el);
    } catch (error) {
      console.error(error);
    }
  });

  // Edit functionality
  editBtn.addEventListener("click", async (e) => {
    const el = e.target.parentElement;
    const id = el.dataset.id;

    // Option 1: Prefill from UI text
    const [username, phoneNumber, email] = el
      .querySelector("span")
      .textContent.split(" - ");
    document.getElementById("username").value = username;
    document.getElementById("phoneNumber").value = phoneNumber;
    document.getElementById("email").value = email;

    currentEditId = id;
  });
}

// *************************** Load all users ***************************
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(`${globalLink}/all-users`);
    res.data.data.forEach(display);
  } catch (error) {
    console.error(error);
  }
});
