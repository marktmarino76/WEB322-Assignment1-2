const rooms = [
  {
    image: "../images/room1.jpg",
    type: "ENTIRE APARTMENT LIBSON",
    place: "Chiado Loft 7 with Patio!",
    price: "$130 CAD/night",
    rating: "4.87(363) Superhost",
  },
  {
    image: "../images/room2.jpg",
    type: "ENTIRE APARTMENT LISBOA",
    place: "Chiado Loft 12 Amazing Duplex with Terrace",
    price: "$195 CAD/night",
    rating: "4.96(210) Superhost",
  },
  {
    image: "../images/room3.jpg",
    type: "ENTIRE APARTMENT LIBSON",
    place: "Libson Sky View Loft - FREE WIFI",
    price: "$52 CAD/night",
    rating: "4.72(387) superhost",
  },
  {
    image: "../images/room4.jpg",
    type: "ENTIRE APARTMENT LIBSON",
    place: "Chiado Loft 7 with Patio!",
    price: "$130 CAD/night",
    rating: "4.87(363) superhost",
  },
  {
    image: "../images/room5.jpg",
    type: "ENTIRE APARTMENT LIBSON",
    place: "Chiado Loft 7 with Patio!",
    price: "$130 CAD/night",
    rating: "4.87(363) superhost",
  },
  {
    image: "../images/room6.jpg",
    type: "ENTIRE APARTMENT LIBSON",
    place: "Chiado Loft 7 with Patio!",
    price: "$130 CAD/night",
    rating: "4.87(363) superhost",
  },
];

window.onload = function () {
  populateListings(rooms);

};



function populateListings(roomArr) {
  let listingDiv = document.getElementById("roomListingRow");

  roomArr.forEach((room) => {
    makeListing(listingDiv, room);
  });
}
/////////////////////////////////////////////////////////////////////////////////
function makeListing(row, room) {
  let newColumn = document.createElement("div");
  newColumn.className = "col-md-4 card-container";

  let listingCard = document.createElement("div");
  listingCard.className = "card text-center mx-auto";
  listingCard.style = "width:80%;";
  newColumn.appendChild(listingCard);

  let listingImage = document.createElement("img");
  listingImage.className = "card-img";
  listingImage.src = room.image;
  listingCard.appendChild(listingImage);

  let listingBody = document.createElement("div");
  listingBody.className = "card-body";
  listingCard.appendChild(listingBody);

  let subtitle = document.createElement("h6");
  subtitle.className = "card-subtitle mb-2 text-muted";
  subtitle.innerHTML = room.type;
  listingBody.appendChild(subtitle);

  let title = document.createElement("h5");
  title.className = "card-title";
  title.innerHTML = room.place;

  listingBody.appendChild(title);

  let price = document.createElement("p");
  price.className = "card-price";
  listingBody.appendChild(price);

  let rating = document.createElement("p");
  rating.className = "card-rating";
  let starIcon = document.createElement("i");
  starIcon.className = "far fa-star";
  rating.innerText = room.rating;

  rating.prepend(starIcon);
  listingBody.appendChild(rating);

  row.appendChild(newColumn);
}
