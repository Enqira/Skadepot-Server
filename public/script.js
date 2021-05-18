const logMeIn = () => {
  userName = document.getElementById("user-field").value
  password = document.getElementById("pass-field").value
  if ((userName.length < 5) | (password.length < 5)) {
    alert("user name of password must be at least 5 characters")
  } else {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({ name: userName, password: password })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    }

    fetch("/loginadmin", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result.length <= 30) {
          alert(result)
        } else {
          document.cookie = "'' ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
          document.cookie = `token=${result}`
          window.location.pathname = "/admin.html"
        }
      })
      .catch(error => console.log("error", error))
  }
}

document.querySelector(".login-btn").addEventListener("click", logMeIn)
const inputField = document.querySelector("#pass-field")
inputField.addEventListener("keyup", () => event.keyCode === 13 && logMeIn())
