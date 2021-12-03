const API_KEY = "563492ad6f91700001000001e49f48c837304e169f7eabf3eb682023";

document.addEventListener("DOMContentLoaded", () => {
  getSingedUser();
  

  document.querySelector("#wyloguj").addEventListener("click", (e) => {
    sessionStorage.setItem("userId", null);
    self.location = "index.html";
    //window.location.href = "index.html";
  });
});

function getSingedUser() {
  var loggedUserId = sessionStorage.getItem("userId");
  var usersData = JSON.parse(sessionStorage.getItem("users"))
    ? JSON.parse(sessionStorage.getItem("users"))
    : [];
  if (loggedUserId != "null") {     // download API only if user is logged in
    document.getElementById("usernameNavbar").innerHTML =
      usersData[loggedUserId].username;
      getImg();
  }else{
      alert("Jesteś niezalogowany!");
  }
}

async function getImg() {
  const baseUrl = "https://api.pexels.com/v1/curated?per_page=12";
  const data = await fetchImages(baseUrl);
  generateHTML(data.photos);
  console.log(data);
}

async function fetchImages(baseUrl) {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await response.json();
  return data;
}

async function generateHTML(photos) {
  photos.forEach((photo) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <img src="${photo.src.medium}">
        <h3>${photo.photographer}</h3>
    `;
    document.querySelector(".gallery").appendChild(item);
  });
}
