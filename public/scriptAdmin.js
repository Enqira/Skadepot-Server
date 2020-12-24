// search
const searchInput = document.getElementById("search-input")
// searchInput.addEventListener("input", search)
document.getElementById("search-btn").addEventListener("click", search)

function search() {
  const myHeaders = new Headers()
  myHeaders.append("auth-token", process.env.TOKEN)

  myHeaders.append("Content-Type", "application/json")

  //   var raw = JSON.stringify({ title: "9780738285320" })

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // body: raw,
    redirect: "follow"
  }

  //   display images
  const displayImages = result => {
    console.log(result.uploadDate)
    const imgBox = document.getElementById("img-box")

    const images = result.imgURL
    for (let i = 0; i < images.length; i++) {
      console.log(images[i])
      const img = document.createElement("IMG")
      img.src = "http://localhost:3001" + images[i]
      imgBox.appendChild(img)
    }
  }

  // fetch data
  fetch(`http://localhost:3001/search?num=${searchInput.value}`, requestOptions)
    .then(response => response.json())
    .then(result => displayImages(result))
    .catch(error => console.log("error", error))
}
