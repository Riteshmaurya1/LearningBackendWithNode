const GlobalLink = "http://localhost:3000/user";
async function handleFormSignUp(event) {
  event.preventDefault();

  // get data from the form
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const userData = {
    email,
    password,
  };
  console.log(userData);

  //   make axios post req to the backend
  try {
    const response = await axios.post(`${GlobalLink}/login`, userData);
    window.location.href = "../expensePages/Addexpense.html";

    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert(`Sign Up Successful! Welcome`);
    } else {
      alert("Sign Up Failed. Please try again.");
    }
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.message || err.message));
  }

  // event.target.reset();
}
