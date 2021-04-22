// search
const searchInput = document.getElementById("search-input")
document.getElementById("search-btn").addEventListener("click", search)

searchInput.addEventListener("keyup", () => event.keyCode === 13 && search())

// handle results from search
const handleResult = result => {
  // delete search input value
  searchInput.value = ""

  const searchInfo = document.querySelector(".search-info")
  if (result.length < 1) {
    searchInfo.textContent = "Nothing found!"
  } else if (result.length === 1) {
    searchInfo.textContent = "Found 1 entry!"
    displayNumbers(result)
    const res = result[0]
    displayImages(res)
    displayInfo(res)
  } else {
    searchInfo.textContent =
      "Found " +
      result.length +
      " entries, please select one from the left column"
    displayNumbers(result)
  }
}
// remove if there is any image displayed
const removeImages = () => {
  const imgBox = document.getElementById("img-box")

  while (imgBox.firstChild) {
    imgBox.removeChild(imgBox.firstChild)
  }
}
// removes found numbers displayed in left column
const removeNumbers = () => {
  const el = document.querySelector(".num-info")

  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

//   display number in the left column and there is more than one the user have to select the one that wants
const displayNumbers = result => {
  // first remove if there is any number in info
  const numInfo = document.querySelector(".num-info")
  while (numInfo.firstChild) {
    numInfo.removeChild(numInfo.firstChild)
  }
  const label = document.createElement("li")
  label.textContent = `${result.length} result/s with reference: ${result[0].num}`
  numInfo.appendChild(label)

  // loop through and add number to info column
  result.map(n => {
    const newDate = new Date(n.date)

    const numDate = `Date: ${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    const newTime = `Time: ${newDate.getHours()}:${newDate.getMinutes()}`

    const li = document.createElement("li")
    const dateLi = document.createElement("li")
    const timeLi = document.createElement("li")

    li.id = n._id
    li.className = "numLi"

    li.textContent = `images: ${n.image.length}`
    dateLi.textContent = numDate
    timeLi.textContent = newTime

    li.appendChild(dateLi)
    li.appendChild(timeLi)
    numInfo.appendChild(li)

    document.getElementById(n._id).addEventListener("click", function () {
      selectedNum(li.id, result)
    })
  })
}

//   get token
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(";").shift()
}
// when search btn clicked
function search() {
  removeNumbers()
  removeImages()
  removeInfo()
  const value = getCookie("token")

  const myHeaders = new Headers()
  myHeaders.append("auth-token", value)

  myHeaders.append("Content-Type", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }

  // fetch data
  fetch(`http://localhost:3001/search?num=${searchInput.value}`, requestOptions)
    .then(response => response.json())
    .then(result => handleResult(result))
    .catch(error => alert("something went wrong", error))
}
//   Display images
const displayImages = res => {
  removeImages()
  //   select the tag that holds the displayed images
  const imgBox = document.getElementById("img-box")

  // loop through the image array
  res.image.map(img => {
    // getting the image url that will be the image src
    const imgName = img.filename
    const imgDestination = img.destination.split("./public")
    const splitedImgDestination = imgDestination[1]
    const imgURL = splitedImgDestination + imgName
    // displaying image
    const newImg = document.createElement("img")
    newImg.src = imgURL
    newImg.id = imgURL
    newImg.className = "displayedImg"
    imgBox.appendChild(newImg)
    // const selectedImg = document.getElementById(`#${imgURL}`)
    // newImg  .addEventListener("click", function () {
    //   //   displayImage(selectedImg)
    //   this.style.setProperty("width", "500px", "important")

    //   console.log("clicked")
    // })
    var modal = document.getElementById("myModal")

    // Get the image and insert it inside the modal
    var img = document.getElementById(imgURL)
    var modalImg = document.getElementById("modal-img")
    img.onclick = function () {
      modal.style.display = "block"
      modalImg.src = imgURL
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0]

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none"
    }
  })
}

// when package number in the left column selected
const selectedNum = (id, res) => {
  res.filter(selected => {
    if (selected._id === id) {
      displayImages(selected)
      displayInfo(selected)
    }
  })
}

// display package info in the left column
const displayInfo = res => {
  removeInfo()
  const el = document.querySelector(".package-info")
  const usernameLi = document.createElement("li")
  const commentLi = document.createElement("li")

  let comment = res.comment
  if (comment === undefined) {
    comment = "no comment was added!"
  }
  usernameLi.textContent = `User: ${res.username}`
  commentLi.textContent = `Comment: ${comment}`

  el.appendChild(usernameLi)
  el.appendChild(commentLi)
}

// remove if there is any info already
const removeInfo = () => {
  const el = document.querySelector(".package-info")
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

// visualizise images on click
// const imageToView = document.querySelector(".displayedImg")
// imageToView.addEventListener("click", displayImage)
// const displayImage = selectedImg => {

//   .style.width = "500px"
//   console.log("clicked")
// }
