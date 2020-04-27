const textCard = document.querySelector('.card__paragraph');
const textHeight = textCard.offsetHeight;
console.log(textCard.offsetHeight);

const box = textCard.textContent;
console.log(box);

if (textHeight < 100) {
    const str = box.substr(0, 121);
    textCard.textContent = str + "...";
}

import "./index.css"