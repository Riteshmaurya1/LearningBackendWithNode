const resetBackendLink = `http://localhost:3000/password/forgotpassword`;
async function handleForgetPassword(event) {
  event.preventDefault();
  try {
    const email = event.target.email.value.trim();
    const response = await axios.post(`${resetBackendLink}`, { email });
    if (!response.status === 200) {
      alert("Code not sent");
    } else {
      alert("Code sent successfully.");
    }
  } catch (error) {
    console.log(error);
  }
  event.target.reset();
}
