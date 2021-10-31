const signUp = () => {
  console.log("btnn clicked");
  userName = document.getElementById("user-field").value;
  email = document.getElementById("email-field").value;
  password = document.getElementById("pass-field").value;

  if ((userName.length < 5) | (email.length < 5) | (password.length < 5)) {
    alert("user name and password must be at least 5 characters");
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: userName,
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result.length <= 30) {
          alert(result);
        } else {
          document.cookie = "'' ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = `token=${result}`;
          window.location.pathname = "/index.html";
        }
      })
      .catch((error) => console.log("error", error));
  }
};

document.querySelector(".btn").addEventListener("click", signUp);
const inputField = document.querySelector("#pass-field");
inputField.addEventListener("keyup", () => event.keyCode === 13 && signUp());
