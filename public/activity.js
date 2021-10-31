const activity = document.querySelector(".activity");

// handle activity after being succesffuly fetched
const handleActivity = (result) => {
  console.log(result);
  const imgBox = "#img-box";
  displayNumbers(result, imgBox, true);
  activity.style.borderBottom = "1px solid #CBFFD4";
};
const getActivity = () => {
  const value = getCookie("token");
  const userName = getCookie("username");

  const myHeaders = new Headers();
  myHeaders.append("auth-token", value);

  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`/activity?username=${userName}`, requestOptions)
    .then((response) => response.json())
    .then((result) => handleActivity(result))
    .catch((error) => alert("Something went wrong displaying activity", error));
};
// get activity when dom loads
getActivity();
// on activity click
activity.addEventListener("click", getActivity);
