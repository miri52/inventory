"use strict";

const inventoryContainer = document.querySelector(".inventory-container");

function renderItems(data) {
  let html = "";
  data.items.forEach((item) => {
    html += `
      <div class="item-card">
        <a
          class="item-link"
          href=${item.link}
          target="_blank"
        >
          <img
            class="item-img ${item.reserved && "item-img-reserved"}"      
            alt="${item.name}"
            src=${item.img}
          />
        </a>
        ${
          item.reserved
            ? '<img class="reserved-tag" alt="reservado" src="images/reservado.png" />'
            : ""
        }
        <h3>${item.name}</h3>
        <p class="item-info">${item.info}</p>
        <div class="item-dimensions">
          <span>Lar</span><span>Prof</span><span>Alt</span> <span>${
            item.dimensions.lar
          } cm</span
          ><span>${item.dimensions.prof} cm</span><span>${
      item.dimensions.alt
    } cm</span>
        </div>
        <p class="item-price">
          ${item.price.new} €
          <span class="old-price">${item.price.original} €</span> 
        </p>
      </div>
    `;
  });
  inventoryContainer.innerHTML = html;
}
async function getItems() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("Problem getting information about the items");
    const data = await res.json();
    renderItems(data);
  } catch (err) {
    console.error(err.message);
  }
}

window.addEventListener("load", getItems);
