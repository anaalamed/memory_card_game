/**
 * @param {string} s stands for 'selector'
 * @param {any} p stands for 'parent' container. defaults to 'document'
 */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => p.querySelectorAll(s);
const random = (max, min = 0) => Math.round(Math.random() * (max - min) + min);

// global variables
let wrapper = $(".wrapper");
let cards;
// prettier-ignore
const icons = [
  "🤩",
  "🥦",
  "🐋",
  "🍬",
  "🐰",
  "🚀",
  "🍒",
  "🍕",
  "🍫",
  "🐶",
  "🎉",
  "🎈",
  "🍇",
  "🍔",
  "🌶",
  "🍤",
  "🍱",
  "🥧",
  "🍦",
  "🍭",
  "🍼",
  "🍺",
  "🎱",
  "⚽",
  "🏆"
];
const cards_num = 8;

let cards_pair = [];
let icons_pair = [];
let is_equal;
let count = 0;

function start_game() {
  cards = create_cards(cards_num);
  // console.log({ cards });
  setTimeout(() => {
    hide_cards(cards);
  }, 1000);
  wrapper.addEventListener("click", check);
}
start_game();

function create_cards(num) {
  let arr_icons = create_random_icons(num);
  for (let i = 0; i < num; i++) {
    wrapper.innerHTML += `
      <div class="card">
        <div class="card__face card__face--front">${arr_icons[i]}</div>
        <div class="card__face card__face--back"></div>
      </div>`;
  }
  return (cards = $$(".card"));
}

function create_random_icons(num) {
  let arr = [];
  while (arr.length < num) {
    let icon = icons[random(icons.length - 1)];
    if (!arr.includes(icon)) {
      arr.push(icon);
      arr.push(icon);
    }
  }
  shuffle(arr);
  // console.log({arr});
  return arr;
}

function shuffle(arr) {
  // debugger
  let j; // random index
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    j = Math.round(Math.random() * (cards_num - 1));

    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function hide_cards(card) {
  card.forEach((element) => {
    element.classList.add("is-flipped");
  });
}

function check(event) {
  if (event.target.classList.contains("card__face--back")) {
    console.log(event.target);
    let card = event.target.parentNode;
    card.classList.remove("is-flipped");
    console.log({ card });

    cards_pair.push(card);
    icons_pair.push(card.childNodes[1].innerHTML);
    console.log({ cards_pair });
    console.log({ icons_pair });

    if (cards_pair.length === 2) {
      is_equal = icons_pair[0] === icons_pair[1] ? 1 : 0;
      console.log({ is_equal });

      if (is_equal === 1) {
        cards_pair.forEach((item) => item.classList.add("right"));
        count++;
        console.log({ count });
        cards_pair = [];
        icons_pair = [];
        is_equal = 0;
      } else {
        setTimeout(() => {
          hide_cards(cards_pair);
          cards_pair = [];
          icons_pair = [];
          is_equal = 0;
        }, 1000);
        wrapper.removeEventListener("click", check);
        setTimeout(() => {
          wrapper.addEventListener("click", check);
        }, 1200);
      }

      if (count === cards_num / 2) {
        setTimeout(() => {
          alert("You won!!!!\n🎉🎉🎉🎉🎉🎉🎉🎉🎉");
        }, 16);
      }
    }
  }
}
