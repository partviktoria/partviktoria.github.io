let width = (window.innerWidth);

const nav = document.querySelector('.top-nav');

function styleNavBar() {
    if (window.scrollY <= 50) {
        nav.classList.add("nav-transparent");
        nav.classList.remove("nav-colored");
    } else {
        nav.classList.add("nav-colored");
        nav.classList.remove("nav-transparent");
    }
}

styleNavBar();

window.addEventListener('scroll', function() {
    styleNavBar();
});

const intro = document.querySelector("#intro");
const bemutatkozas = document.querySelector("#bemutatkozas");
const tapasztalat = document.querySelector("#tapasztalat");
const portfolio = document.querySelector("#portfolio");
const kapcsolat = document.querySelector("#kapcsolat");

const navItems = document.querySelectorAll(".nav-item");
let scrollHeight = 0;

function addScrollSpy() {
    scrollHeight = intro.clientHeight;
    if (window.scrollY > scrollHeight - 300 && window.scrollY < (scrollHeight + bemutatkozas.clientHeight - 300)) {
        navItems[0].classList.add("nav-active");
    } else {
        navItems[0].classList.remove("nav-active");
    }
    scrollHeight += bemutatkozas.clientHeight;
    if (window.scrollY > (scrollHeight - 300) && window.scrollY < (scrollHeight + tapasztalat.clientHeight - 300)) {
        navItems[1].classList.add("nav-active");
    } else {
        navItems[1].classList.remove("nav-active");
    }
    scrollHeight += tapasztalat.clientHeight;
    if (window.scrollY > (scrollHeight - 300) && window.scrollY < (scrollHeight + portfolio.clientHeight - 300)) {
        navItems[2].classList.add("nav-active");
    } else {
        navItems[2].classList.remove("nav-active");
    }
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        navItems[2].classList.remove("nav-active");
        navItems[3].classList.add("nav-active");
    } else {
        navItems[3].classList.remove("nav-active");
    }
}

addScrollSpy();
window.addEventListener('scroll', function(event) {
    addScrollSpy();
});

const links = document.querySelector(".nav-mobile-links");

function showNav() {
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
}

function hideNav() {
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
}

//PORTFOLIO GALLERY
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

let slideIndex = 1;

function plusSlides(n, className) {
    showSlides(slideIndex += n, className);
}

function currentSlide(n, className) {
    showSlides(slideIndex = n, className);
}

function showSlides(n, className) {

    let slides = document.getElementsByClassName(className);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

}


//PAINTINGS MODAL
const imgsPainting = document.querySelectorAll(".imgs-painting");
const paintingTexts = document.querySelectorAll(".text-painting");
const modal = document.getElementById("paintingModal");
const modalImg = document.getElementById("paintingModalContent");
const captionText = document.getElementById("caption");
for (let i = 0; i < imgsPainting.length; i++) {
    imgsPainting[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = paintingTexts[i].innerHTML;
    }
}
const span = document.getElementsByClassName("close")[5];
span.onclick = function() {
    modal.style.display = "none";
}