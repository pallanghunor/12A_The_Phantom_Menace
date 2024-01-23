import { Data } from "./data.js";

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let starhipsCards = document.querySelector("#starships-cards");
let vehiclesCards = document.querySelector("#vehicles-cards");

let allStarships = await Data.getStarShipsData();
console.log(allStarships);
let allVehicles = await Data.getVehiclesData();
console.log(allVehicles);

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

function cardsLoaded(selectionId) {
  let carouselId;
  let cards;
  let ids;
  let link;
  if (selectionId == "starships-cards") {
    cards = starhipsCards;
    carouselId = "#starships-cards";
    ids = allStarships.map((x) => x.id);
    link = "https://bgs.jedlik.eu/swimages/starships";
  }
  if (selectionId == "vehicles-cards") {
    cards = vehiclesCards;
    ids = allVehicles.map((x) => x.id);
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
    for (let r = 0; r < 2; r++) {
      Code += `
                <div class="row">
            `;
      for (let b = 0; b < 3; b++) {
        if (ids[currentIdIndex] != undefined) {
          Code += `
            <div class="col-12 col-md-4 box" id="${ids[currentIdIndex]}">
              <img src="${link}/${ids[currentIdIndex]}.jpg" class="kepek">
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
    card.addEventListener('click', createPopup(card.getAttribute('id')))//createPopup(card.getAttribute('id')))
  });
}

const popupNode = document.querySelector('.popup');
const popupContent = document.querySelector(".popup-content")
const overlay = document.querySelector(".overlay");

function createPopup(id){
  console.log(id);
  // let closeBtn = document.querySelector(".close-btn");
  popupContent.innerHTML = "";
  let content = document.createElement('h1');
  content.innerText = id;
  content.style.color = "red";
  popupContent.append(content);
  overlay.addEventListener("click", closePopup);
  // closeBtn.addEventListener("click", closePopup);
  return openPopup;
}

function openPopup(){
  popupNode.classList.add("active");
}
function closePopup(){
  popupNode.classList.remove("active");
}


cardsLoaded("starships-cards");
cardsLoaded("vehicles-cards");
cardAddEventListener();