const newGameBtn = document.querySelector("#newGameBtn");
const mainPage = document.querySelector("#mainPage");
const gamePage = document.querySelector("#gamePage");

const cardContainer = document.querySelector(".cardContainer");

const newGameBtnInGame = document.querySelectorAll(".newGameBtnInGame");
const pauseGameBtn = document.querySelector("#pauseGameBtn");

const victoryScreen = document.querySelector(".victoryScreen");
const victoryScreenBg = document.querySelector(".victoryScreenBg");

const finalTimeText = document.querySelector(".finalTimeText");

class Animal {
    constructor(name, latinName, family, distribution, animalLength, weight, lifespan, population, animalImg) {
        this.name = name;
        this.latinName = latinName;
        this.family = family;
        this.distribution = distribution;
        this.animalLength = animalLength;
        this.weight = weight;
        this.lifespan = lifespan;
        this.population = population;
        this.animalImg = animalImg;
    }
}

let animalContainer = [];
let belfoldiSzakallasagama = new Animal("Belföldi szakállas agáma", "(Pogona vitticeps)", "Agámafélék", "Ausztrália középső, illetve keleti része", "55-60 cm", "0,3-0,5 kg", "6-15 év", "Nem fenyegetett", "animals/belfoldiSzakallasAgama.jpg");
animalContainer.push(belfoldiSzakallasagama);
let komodoiVaranusz = new Animal("Komodói varánusz", "(Varanus komodoensis)", "Varánuszfélék", "Indonézia", "2,3-2,6 m", "70-90 kg", "5 év", "Sebezhető", "animals/komodoiVaranusz.jpg");
animalContainer.push(komodoiVaranusz);
let mississippiAlligator = new Animal("Mississippi aligátor", "(Alligator mississippiensis)", "Aligátorfélék", "Amerikai Egyesül Államok délkeleti része", "3-4,5 m", "200-450 kg", "30-50 év", "Nem fenyegetett", "animals/mississippiAlligator.jpg");
animalContainer.push(mississippiAlligator);
let kéknyelvuSzkink = new Animal("Ausztrál kéknyelvűszkink", "(Tiliqua scincoides)", "Vakondgyíkfélék", "Ausztrália szárazabb területei", "30-60 cm", "0,3-0,5 kg", "15-22 év", "Nem fenyegetett", "animals/kéknyelvuSzkink.jpg");
animalContainer.push(kéknyelvuSzkink);
let zoldAnakonda = new Animal("Zöld anakonda", "(Eunectes murinus)", "Óriáskígyófélék", "Dél-Amerika trópusi területi", "4,6-5 m", "30-70 kg", "10 év", "Nem fenyegetett", "animals/zoldAnakonda.jpg");
animalContainer.push(zoldAnakonda);
let haromszarvuKameleon = new Animal("Háromszarvú kaméleon", "(Trioceros jacksonii)", "Kaméleonfélék", "Kenya, Tanzánia, Uganda", "30-35 cm", "1-1,5 kg", "5-6,5 év", "Nem fenyegetett", "animals/haromszarvuKameleon.jpg");
animalContainer.push(haromszarvuKameleon);

let papaszemesPingvin = new Animal("Pápaszemes pingvin", "(Spheniscus demersus)", "Pingvinfélék", "Dél-afrikai Köztársaság, Namíbia", "40-60 cm", "2-4 kg", "10-27 év", "Veszélyezetett", "animals/papaszemesPingvin.jpg");
animalContainer.push(papaszemesPingvin);
let nandu = new Animal("Nandu", "(Rhea americana)", "Nandufélék", "Bolívia, Uruguay, Paraguay, Brazílis és Argentína", "1,27-1,4 m", "20-27 kg", "10-15 év", "Mérsékelten fenyegetett", "animals/nandu.jpg");
animalContainer.push(nandu);
let rozellaPapagaj = new Animal("Rozellapapagáj", "(Platycercus eximius)", "Papagájfélék", "Ausztrália délkeleti része", "29-33 cm", "90-120 g", "27 év", "Nem fenyegetett", "animals/rozellaPapagaj.jpg");
animalContainer.push(rozellaPapagaj);
let kacagojancsi = new Animal("Kacagójancsi", "(Dacelo novaeguineae)", "Jégmadárfélék", "Ausztrália déli és keleti része", "39-42 cm", "310-480 g", "11-15 év", "Nem fenyegetett", "animals/kacagojancsi.jpg");
animalContainer.push(kacagojancsi);
let feketeHattyu = new Animal("Fekete hattyú", "(Cygnus atratus)", "Récefélék", "Délnyugat-Ausztrália, Tasmánia", "110-140 cm", "3,7-9 kg", "30-40 év", "Nem fenyegetett", "animals/feketeHattyu.jpg");
animalContainer.push(feketeHattyu);
let uregiBagoly = new Animal("Üregi bagoly", "(Athene cunicularia)", "Bagolyfélék", "Észak- és Dél-Amerika", "19-28 cm", "140-240 g", "6-8 év", "Nem fenyegetett", "animals/uregiBagoly.jpg");
animalContainer.push(uregiBagoly);

let oroszlanfoka = new Animal("Kaliforniai oroszlánfóka", "(Zalophus californianus)", "Fülesfókafélék", "Kaliforniai-félsziget, Kaliforniai-öböl", "2,2-2,4 m", "275-390 kg", "30 év", "Nem fenyegetett", "animals/oroszlanfoka.jpg");
animalContainer.push(oroszlanfoka);
let aranykezuTamarin = new Animal("Aranykezű tamarin", "(Saguinus midas)", "Csuklyásmajomfélék", " Brazília északi része, Venezuela, Guyana, Suriname, Francia Guayana", "20-28 cm", "400-550 g", "10 év", "Nem fenyegetett", "animals/aranykezuTamarin.jpg");
animalContainer.push(aranykezuTamarin);
let kapibara = new Animal("Kapibara", "(Hydrochoerus hydrochaeris)", "Tengerimalacfélék", "Dél-Amerika", "106-134 cm", "35-66 kg", "8-10 év", "Nem fenyegetett", "animals/kapibara.jpg");
animalContainer.push(kapibara);
let sziberiaiTigris = new Animal("Szibériai tigris", "(Panthera tigris altaica)", "Macskafélék", "Szibéria", "2,3-3,3 m", "72-306 kg", "16-18 év", "Veszélyeztetett", "animals/sziberiaiTigris.jpg");
animalContainer.push(sziberiaiTigris);
let sivatagiRoka = new Animal("Sivatagi róka", "(Vulpes zerda)", "Kutyafélék", "Észak-Afrika, Sínai-félsziget, Arab-félsziget", "24-41 cm", "0,7-1,6 kg", "14 év", "Nem fenyegetett", "animals/sivatagiRoka.jpg");
animalContainer.push(sivatagiRoka);
let indiaiAntilop = new Animal("Indiai antilop", "(Antilope cervicapra)", "Tülkösszarvúak", "India", "120 cm", "31-45 kg", "10-15 kg", "Mérsékelten fenyegetett", "animals/indiaiAntilop.jpg");
animalContainer.push(indiaiAntilop);

let piraja = new Animal("Vöröshasú pirája", "(Pygocentrus nattereri)", "Pontylazacfélék", "Dél-Amerika", "20 cm", "3,9 kg", "10 év", "Nem fenyegetett", "animals/piraja.jpg");
animalContainer.push(piraja);
let elektromosAngolna = new Animal("Elektromos angolna", "(Electrophorus electricus)", "Elektromoskéshal-félék", "Dél-Amerika", "2,5 m", "20 kg", "12-22 év", "Nem fenyegetett", "animals/elektromosAngolna.jpg");
animalContainer.push(elektromosAngolna);
let tovisesRaja = new Animal("Tövises rája", "(Raja clavata)", "Valódi rájafélék", "Atlanti-óceán, Északi-tenger, Földközi-tenger, Indiai-Óceán", "85 cm", "2-4 kg", "12 év", "Mérsékelten fenyegetett", "animals/tovisesRaja.jpg");
animalContainer.push(tovisesRaja);
let vorosfarkuHarcsa = new Animal("Vörösfarkú harcsa", "(Phractocephalus hemioliopterus)", "Pimelodidae", "Amazónia", "120 cm", "80 kg", "2-10 év", "Nem fenyegetett", "animals/vorosfarkuHarcsa.jpg");
animalContainer.push(vorosfarkuHarcsa);
let nagyMacskacapa = new Animal("Nagy macskacápa", "(Scyliorhinus stellaris)", "Macskacápafélék", "Atlanti-óceán", "130-162 cm", "10 kg", "19 év", "Mérsékelten fenyegetett", "animals/nagyMacskacapa.jpg");
animalContainer.push(nagyMacskacapa);
let negycsikosPoroszhal = new Animal("Négycsíkos poroszhal", "(Dascyllus melanurus)", "Korállszirtihal-félék", "Csendes-óceán", "8 cm", "-", "15 év", "Nem fenyegetett", "animals/negycsikosPoroszhal.jpg");
animalContainer.push(negycsikosPoroszhal);

let axolotl = new Animal("Mexikói axolotl", "(Ambystoma mexicanum)", "Harántfogúgőte-félék", "Mexikó", "45 cm", "56-230 g", "10-15 év", "Súlyosan veszélyeztetett", "animals/axolotl.jpg");
animalContainer.push(axolotl);
let aranyFakuszobeka = new Animal("Arany fakúszóbéka", "(Dendrobates auratus)", "Nyílméregbékafélék", "Kolumbia, Costa Rica, Nicaragua, Panama", "3-4 cm", "10 g", "10 év", "Nem fenyegetett", "animals/aranyFakuszobeka.jpg");
animalContainer.push(aranyFakuszobeka);
let KekLevelibeka = new Animal("Kék levelibéka", "(Litoria caerulea)", "Levelibéka-félék", "Új-Guinea, Észak-Ausztrália", "10 cm", "-", "16 év", "Nem fenyegetett", "animals/KekLevelibeka.jpg");
animalContainer.push(KekLevelibeka);
let foltosSzalamandra = new Animal("Foltos szalamandra", "(Salamandra salamandra)", "Szalamandrafélék", "Európa, Nyugat-Ázsia, Észak-Afrika", "14-20 cm", "40 g", "14-30 év", "Nem fenyegetett", "animals/foltosSzalamandra.jpg");
animalContainer.push(foltosSzalamandra);
let barnaVarangy = new Animal("Barna varangy", "(Bufo bufo)", "Varangyfélék", "Európa, Ázsia, Északnyugat-Afrika", "7-13 cm", "10-120 g", "30-40 év", "Nem fenyegetett", "animals/barnaVarangy.jpg");
animalContainer.push(barnaVarangy);
let voroshasuUnka = new Animal("Vöröshasú unka", "(Bombina bombina)", "Unkafélék", "Európa", "4-5 cm", "2-14 g", "10 év", "Nem fenyegetett", "animals/voroshasuUnka.jpg");
animalContainer.push(voroshasuUnka);

let bengaliBotsaska = new Animal("Bengáli botsáska", "(Medauroidea extradentata)", "Valódi botsáskák", "Vietnám", "7-12 cm", "-", "5-7 hónap", "Nem fenyegetett", "animals/bengaliBotsaska.jpg");
animalContainer.push(bengaliBotsaska);
let martiniqueiFapok = new Animal("Martinique-i fapók", "(Caribena versicolor)", "Madárpókfélék", "Martinique, Guadeloupe, Karib-tenger szigetei", "14-17 cm", "-", "12 év", "Nem fenyegetett", "animals/martiniqueiFapok.jpg");
animalContainer.push(martiniqueiFapok);
let nappaliPavaszem = new Animal("Nappali pávaszem", "(Inachis io)", "Tarkalepkefélék", "Európa", "55-65 mm", "-", "11 hónap", "Nem fenyegetett", "animals/nappaliPavaszem.jpg");
animalContainer.push(nappaliPavaszem);
let poszmeh = new Animal("Réti poszméh", "(Bombus pratorum)", "Méhfélék", "Európa, Észak-Ázsia", "14-20 mm", "-", "28 nap", "Nem fenyegetett", "animals/poszmeh.jpg");
animalContainer.push(poszmeh);
let tiszavirag = new Animal("Tiszavirág", "(Palingenia longicauda)", "Tiszavirágok", "Tisza vízgyűjtő területei", "2,5-3,8 cm", "-", "1 nap (3 év lárvaként)", "Nem fenyegetett", "animals/tiszavirag.jpg");
animalContainer.push(tiszavirag);
let kekLegivadasz = new Animal("Kék légivadász", "(Ischnura elegans)", "Légivadászok", "Európa", "27-35 mm", "-", "2 hónap-3 év", "Nem fenyegetett", "animals/kekLegivadasz.jpg");
animalContainer.push(kekLegivadasz);

let chosenNumbers = [];
let chosenAnimals = [];

function createCard() {
    while (chosenNumbers.length < 36) {
        let randomNumber = Math.floor((Math.random() * 36));
        if (chosenNumbers.indexOf(randomNumber) === -1) {
            chosenNumbers.push(randomNumber);
            chosenAnimals.push(animalContainer[randomNumber]);
            chosenNumbers.push(randomNumber);
            chosenAnimals.push(animalContainer[randomNumber]);
        }
    }

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    shuffle(chosenAnimals);
}

let animalNames = ["", ""];
let counter = 0;
let match = false;
let pairCounter = 0;

newGameBtn.addEventListener("click", function() {
    animalNames = ["", ""];
    pairCounter = 0;
    counter = 0;
    match = false;

    mainPage.classList.add("mainPageHide");
    setTimeout(function() {
        mainPage.style.display = "none";
        startTimer();
    }, 500);

    gamePage.classList.add("gamePageShow");
    createNewGame();
})

for (let i = 0; i < newGameBtnInGame.length; i++) {
    newGameBtnInGame[i].addEventListener("click", function() {
        victoryScreen.style.display = "none";
        victoryScreenBg.style.display = "none";
        animalNames = ["", ""];
        pairCounter = 0;
        counter = 0;
        match = false;
        resetTimer();
        resetBoard();
        chosenNumbers = [];
        chosenAnimals = [];
        createNewGame();
    })
}


const minuteSpan = document.querySelector(".minute");
const secondSpan = document.querySelector(".second");
let seconds = 0;
let minutes = 0;
let timeCounter;

function startTimer() {
    timeCounter = setInterval(function() {
        if (seconds < 9) {
            secondSpan.innerHTML = `0${++seconds}`;
        } else {
            secondSpan.innerHTML = ++seconds;
        }

        if (seconds > 58) {
            setTimeout(function() {
                if (minutes < 9) {
                    minuteSpan.innerHTML = `0${++minutes}`;
                } else {
                    minuteSpan.innerHTML = ++minutes;
                }
            }, 1000);
            seconds = -1;
        }
    }, 1000)
}

pauseGameBtn.addEventListener("click", function() {
    if (pauseGameBtn.innerHTML == "Szünet") {
        pauseGameBtn.innerHTML = "Kezdés";
        clearInterval(timeCounter);
    } else {
        pauseGameBtn.innerHTML = "Szünet";
        startTimer();
    }
})

function resetTimer() {
    clearInterval(timeCounter);
    secondSpan.innerHTML = "00";
    minuteSpan.innerHTML = "00";
    seconds = 0;
    minutes = 0;
    startTimer();
};

function createNewGame() {
    chosenNumbers = [];
    chosenAnimals = [];
    createCard();
    deleteInfo();

    for (let i = 0; i < 36; i++) {
        let gameCardPlace = document.createElement("div");
        gameCardPlace.classList.add("gameCardPlace");
        let gameCardPlaceInner = document.createElement("div");
        gameCardPlaceInner.classList.add("gameCardPlaceInner");
        let gameCardBack = document.createElement("img");
        gameCardBack.setAttribute("src", "card-back.png");
        gameCardBack.classList.add("gameCard-back");
        let gameCardFront = document.createElement("img");

        gameCardFront.setAttribute("src", chosenAnimals[i].animalImg);
        gameCardFront.classList.add("gameCard-front");

        gameCardPlaceInner.append(gameCardBack);
        gameCardPlaceInner.append(gameCardFront);

        gameCardPlace.append(gameCardPlaceInner);
        cardContainer.appendChild(gameCardPlace);
    }

    const gameCardPlaces = document.querySelectorAll(".gameCardPlace");
    const gameCardPlaceInners = document.querySelectorAll(".gameCardPlaceInner");

    let cardPositions = [, , ];

    for (let i = 0; i < gameCardPlaces.length; i++) {

        gameCardPlaces[i].addEventListener("click", function() {

            if (pauseGameBtn.innerHTML == "Kezdés") {
                pauseGameBtn.innerHTML = "Szünet";
                startTimer();
            }

            if (counter < 2) {
                cardPositions[counter] = i;

                if (gameCardPlaces[i].style.transform != "rotateY(180deg)") {
                    gameCardPlaces[i].style.transform = "rotateY(180deg)";
                    gameCardPlaceInners[i].style.transform = "rotateY(180deg)";

                    writeInfo(chosenAnimals[i]);
                    animalNames[counter] = chosenAnimals[i].name;
                    counter++;

                    if (counter >= 2) {
                        evaluateMatch();

                        setTimeout(function() {

                            if (match) {
                                pairCounter++;
                                let cardPosition1 = cardPositions[0];
                                let cardPosition2 = cardPositions[1];
                                gameCardPlaces[cardPosition1].style.visibility = "hidden";
                                gameCardPlaces[cardPosition2].style.visibility = "hidden";

                                gameCardPlaces[cardPosition1].style.transform = "scale(1.3,1.3)";
                                gameCardPlaces[cardPosition2].style.transform = "scale(1.3,1.3)";


                                if (pairCounter > 17) {
                                    clearInterval(timeCounter);
                                    finalTimeText.innerHTML = `${minuteSpan.innerHTML}:${secondSpan.innerHTML}`
                                    victoryScreen.style.display = "block";
                                    victoryScreenBg.style.display = "block";
                                }

                            } else {
                                for (let j = 0; j < gameCardPlaces.length; j++) {
                                    gameCardPlaces[j].style.transform = "none";
                                    gameCardPlaceInners[j].style.transform = "none";
                                }
                            }
                            deleteInfo();
                            counter = 0;
                            animalNames = ["", ""];
                            cardPositions = [, ]

                        }, 1000);
                    }
                }
            }
        })
    }
}


function evaluateMatch() {
    if (animalNames[0] != 0 && (animalNames[0] == animalNames[1])) {
        match = true;
    } else {
        match = false;
    }
}

function resetBoard() {
    const gameCardsPlace = document.querySelectorAll(".gameCardPlace");
    for (let gameCard of gameCardsPlace) {
        cardContainer.removeChild(gameCard);
    }
}

const animalPic = document.querySelector("#animalPic");
const nameText = document.querySelector("#name");
const latinNameText = document.querySelector("#latin");
const familyText = document.querySelector("#family");
const distributionText = document.querySelector("#distribution");
const lengthText = document.querySelector("#length");
const weightText = document.querySelector("#weight");
const lifespanText = document.querySelector("#lifespan");
const populationText = document.querySelector("#population");

function writeInfo(animal) {
    animalPic.setAttribute("src", animal.animalImg);
    nameText.innerHTML = animal.name;
    latinNameText.innerHTML = animal.latinName;
    familyText.innerHTML = animal.family;
    distributionText.innerHTML = animal.distribution;
    lengthText.innerHTML = animal.animalLength;
    weightText.innerHTML = animal.weight;
    lifespanText.innerHTML = animal.lifespan;
    populationText.innerHTML = animal.population;
}

function deleteInfo() {
    animalPic.setAttribute("src", "");
    nameText.innerHTML = "";
    latinNameText.innerHTML = "";
    familyText.innerHTML = "";
    distributionText.innerHTML = "";
    lengthText.innerHTML = "";
    weightText.innerHTML = "";
    lifespanText.innerHTML = "";
    populationText.innerHTML = "";
}