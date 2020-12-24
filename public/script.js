const logMeIn = () => {
  console.log("clicked log-in")
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

    fetch("http://127.0.0.1:3001/loginadmin", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result.length <= 30) {
          alert(result)
        } else {
          console.log(result)
        }
      })
      .catch(error => console.log("error", error))
  }
}

document.querySelector(".login-btn").addEventListener("click", logMeIn)
