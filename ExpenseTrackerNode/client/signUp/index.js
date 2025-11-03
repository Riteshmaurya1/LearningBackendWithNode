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
  const response = await axios.post(`${GlobalLink}/signup`, userData);
  response.then((res) => {
    console.log(res.data);
  });
}
