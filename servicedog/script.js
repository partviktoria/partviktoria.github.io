const nav = document.querySelector('.navbar');

function styleNavBar() {
    if (window.scrollY <= 50) {
        nav.classList.remove("navbarActive");
    } else {
        nav.classList.add("navbarActive");
    }
}
styleNavBar();
window.addEventListener('scroll', function() {
    styleNavBar();
});

//MODAL
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const homeImgs = document.querySelectorAll(".homeImg");
for (let i = 0; i < homeImgs.length; i++) {
    homeImgs[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = paintingTexts[i].innerHTML;
    }
}

const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

//LIGHTBOX
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}