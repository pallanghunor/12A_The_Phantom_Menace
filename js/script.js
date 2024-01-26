import { Data } from "./data.js";

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let starhipsCards = document.querySelector("#starships-cards");
let vehiclesCards = document.querySelector("#vehicles-cards");
let crawl = document.querySelector("#crawl");

let allStarships = await Data.getStarShipsData();
let allVehicles = await Data.getVehiclesData();
let crawlData = await Data.getSpecificFilmData();
let filmDatas = await Data.getAllFilmsData();

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 250;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};


function openingCrawlLoaded(){
  crawl.innerHTML = "";
  let text = "";
  text = `
    <div class="title">
      <p>Episode ${crawlData[0].episode_id}</p>
      <h1>${crawlData[0].title}</h1>
    </div>
    <p>${crawlData[0].opening_crawl}</p>
  `;
  crawl.innerHTML = text;
}

openingCrawlLoaded();


function cardsLoaded(selectionId) {
  let carouselId;
  let cards;
  let ids;
  let name;
  let link;
  if (selectionId == "starships-cards") {
    cards = starhipsCards;
    carouselId = "#starships-cards";
    ids = allStarships.map((x) => x.id);
    name = allStarships.map((x) => x.name);
    link = "https://bgs.jedlik.eu/swimages/starships";
  }
  if (selectionId == "vehicles-cards") {
    cards = vehiclesCards;
    ids = allVehicles.map((x) => x.id);
    name = allVehicles.map((x) => x.name);
    carouselId = "#vehicles-cards";
    link = "https://bgs.jedlik.eu/swimages/vehicles";
  }
  cards.innerHTML = "";
  let Code = "";
  let currentIdIndex = 0;
  Code += `
        <div class="carousel-indicators">
        <button type="button" data-bs-target="${carouselId}" data-bs-slide-to="0" class="active"></button>
    `;
  for (let i = 1; i < ids.length / 6; i++) {
    Code += `
          <button type="button" data-bs-target="${carouselId}" data-bs-slide-to="${i}"></button>
      `;
  }
  Code += `
        </div>
        <div class="carousel-inner">
    `;
  for (let i = 0; i < ids.length / 6; i++) {
    if (i == 0) {
      Code += `
            <div class="carousel-item active">
        `;
    } else {
      Code += `
                <div class="carousel-item">
            `;
    }
    for (let r = 0; r < 1; r++) {
      Code += `
                <div class="row d-flex justify-content-evenly">
            `;
      for (let b = 0; b < 6; b++) {
        if (ids[currentIdIndex] != undefined) {
          Code += `
            <div class=" box ${carouselId}" id="${ids[currentIdIndex]}">
              <img src="${link}/${ids[currentIdIndex]}.jpg" class="kepek">
              <div class="overlay">
                <div class="content">
                  ${name[currentIdIndex]}
                </div>
              </div>
            </div>
            `;
          currentIdIndex++;
        } else{
          break;
        }
      }
      Code += `
                </div>
            `;
    }
    Code += `
            </div>
        `;
  }
  Code += `
        </div>
    `;

  Code += `
        <button class="carousel-control-prev" type="button" data-bs-target="${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    `;

  cards.innerHTML = Code;
}

function cardAddEventListener(){
  let cards = document.querySelectorAll(".box");
  cards.forEach(card => {
    card.addEventListener('click', () => createPopup(card.getAttribute('id'),card.getAttribute('class')))//createPopup(card.getAttribute('id')))
  });
}

const popupNode = document.querySelector('.popup');
const popupContent = document.querySelector(".popup-content-stat")
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");

function createPopup(id, carousel){
  function closePopup(){
    popupNode.classList.remove("active");
    enableScroll();
  }
  popupNode.classList.add("active");
  disableScroll();
  FillPopupWindow(id, carousel);
  overlay.addEventListener("click", closePopup);
  closeBtn.addEventListener("click", closePopup);
}

function disableScroll() {
  // Save the current scroll position
  var scrollPosition = window.scrollY;

  // Add a class to the body to disable scrolling
  document.body.classList.add('no-scroll');

  // Set the body's top position to the negative of the scroll position
  document.body.style.top = `-${scrollPosition}px`;
}

function enableScroll() {
  // Remove the class that disables scrolling
  document.body.classList.remove('no-scroll');

  // Reset the body's top position
  document.body.style.top = '';
}

function FillPopupWindow(id, carousel){
  popupContent.innerHTML = "";
  let content = document.createElement('h1');
  let name;
  let ids;
  let movies;
  let filmlink;
  filmlink = "https://bgs.jedlik.eu/swimages/films/";
  let code = "";
  const filmek = [];

  for (let i = 0; i < 6; i++) {
    filmek.push(filmDatas[i].episode_id);
  }

  name = allStarships.map((x) => x.name);
  ids = allStarships.map((x) => x.id);
  movies = allStarships.map((x) => x.films);
  let ugrasok = 0;
  let final = 0;
  ids.forEach(i => {
    if (i == id) {
      final = ugrasok;
    }
    ugrasok++;
  });
  code += `<div>
  <h1>${name[final]}</h1>
  </div>`;
  
  code += `<div class="container">
  <div class="row">
  `
  let attend = [];
  attend.push(movies[final]);
  console.log(attend[0].length);
  for (let e = 0; e < attend[0].length; e++) {
    console.log(attend[0][e]);
    console.log(filmDatas[attend[0][e]-1].title);
    // code += `<h2>${filmDatas[attend[0][e]-1].title}</h2>`

    code += `
    <div class="col-12 col-md-4 filmbox">
      <div class="overlay">
        <div class="content">
        <img src="${filmlink}/${attend[0][e]}.jpg" class="filmkepek">
        <div class="overlay">
                <div class="content">
                ${filmDatas[attend[0][e]-1].title}
                </div>
              </div>
        </div>
        </div>
        </div>`
}
code += `
  
</div>
</div>`


  popupContent.append(content);
  popupContent.innerHTML = code;
}

cardsLoaded("starships-cards");
cardsLoaded("vehicles-cards");
cardAddEventListener();