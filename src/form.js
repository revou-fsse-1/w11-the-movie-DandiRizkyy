// deklarasi variabel input field
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

// deklarasi variabel endpoint API
const API_ENDPOINT = "http://localhost:3000/users";

function sendUserData() {
  fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      console.log(users);
    });
}

function registerUser() {
  fetch(API_ENDPOINT)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const checkData = users.find(
        (e) => e.username === username.value && e.email === email.value
      );
      if (!username.value) {
        alert("Please fill your username");
      } else if (!email.value) {
        alert("Please fill your email");
      } else if (!password.value) {
        alert("Please fill your password");
      } else if (!confirmPassword.value) {
        alert("Please fill your confirmation password");
      } else if (password.value !== confirmPassword.value) {
        alert("Passwords do not match. Please try again.");
      } else if (checkData !== undefined) {
        alert("Email or Username already registered.");
      } else {
        sendUserData();
        alert("Registration successful! Please log in to continue.");
        window.location.href = "index.html";
      }
    });
}

function loginUser() {
  fetch(API_ENDPOINT)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const checkData = users.find(
        (e) => e.username === username.value && e.password === password.value
      );
      if (!username.value) {
        alert("Please fill your username");
      } else if (!password.value) {
        alert("Please fill your password");
      } else if (checkData === undefined) {
        alert("Please register first. Thankyou.");
      } else if (checkData !== undefined) {
        alert("Login successful! Welcome.");
        window.location.href = "moviepage.html";
      }
    });
}
