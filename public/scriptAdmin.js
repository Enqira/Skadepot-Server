// search
const searchInput = document.getElementById("search-input")
// searchInput.addEventListener("input", search)
document.getElementById("search-btn").addEventListener("click", search)

// document.querySelector(".numLi").addEventListener("click", selectedNum)

// handle results from search
const handleResult = result => {
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

    li.textContent = n.num
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

// when search btn clicked
function search() {
  removeNumbers()
  removeImages()
  removeInfo()

  const myHeaders = new Headers()
  myHeaders.append("auth-token", tokenHere)

  myHeaders.append("Content-Type", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // body: raw,
    redirect: "follow"
  }

  // fetch data
  fetch(`http://localhost:3001/search?num=${searchInput.value}`, requestOptions)
    .then(response => response.json())
    .then(result => handleResult(result))
    .catch(error => alert("error", error))
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
    imgBox.appendChild(newImg)
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

  usernameLi.textContent = `User: ${res.username}`
  commentLi.textContent = `Comment: ${res.comment}`

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
