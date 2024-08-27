/* user login */
//  get login by id and add event listener to login button
const signIn = document.getElementById("signIn");
signIn.addEventListener("click", ($event) => {
  // in event listener function get the email and password from form fields
  // NOTE - do $event.preventdefault so page doesn't refresh
  $event.preventDefault();
  const userLogin = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  // using swagger, test logging in a user both with good and bad credentials
  // use fetch API to send post request to log user in
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  })
    .then((response) => {
      // handle response for invalid credentials by showing error message on login page
      if (!response.ok) {
        alert("Incorrect Email or Password");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // handle response for valid credentials by redirecting to homepage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.assign("index.html");
    })
    .catch((err) => console.log(err));
});
