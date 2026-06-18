const menuBtn = document.getElementById("menu-btn");

const menu = document.getElementById("menu");

menuBtn.onclick = () => {

menu.classList.toggle("active");

};

// Animation

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll",()=>{

cards.forEach(card=>{

const top = card.getBoundingClientRect().top;

if(top < window.innerHeight-100){

card.style.opacity="1";
card.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(80px)";

card.style.transition=".8s";

});