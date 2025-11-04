const GlobalLink = "http://localhost:3000/user";
async function handleFormSignUp(event) {
  event.preventDefault();

  // get data from the form
  const username = event.target.username.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const userData = {
    username,
    email,
    password,
  };
  console.log(userData);

  //   make axios post req to the backend
  try {
    const response = await axios.post(`${GlobalLink}/signup`, userData);
    window.location.href = "../signIn/signIn.html";
    if (response.status === 200 || response.status === 201) {
      alert(`Sign Up Successful! Welcome`);
    } else {
      alert("Sign Up Failed. Please try again.");
    }
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.message || err.message));
  }

  event.target.reset();
}
