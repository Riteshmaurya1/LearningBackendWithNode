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
    response.then((res) => {
      console.log(res.data);
    });
    if (!response) {
      alert("Sign Up Failed.");
    } else {
      alert("Sign Up Successfull.");
    }
  } catch (err) {
    console.log(err);
  }
  event.target.reset();
}
