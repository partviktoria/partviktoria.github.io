const urlGuild = 'https://cors-anywhere.herokuapp.com/https://raider.io/api/guilds/eu/ragnaros/Deep%20Tranquility/roster';
let urlChar;

let membersInfo = [];

fetch(urlGuild)
    .then((resp) => resp.json())
    .then(function(data) {
        for (let i = 0; i < data.guildRoster.roster.length; i++) {

            let links = [];
            let linkArmory = `https://worldofwarcraft.com/en-gb/character/eu/ragnaros/${data.guildRoster.roster[i].character.name}`;
            let linkRaiderIo = `https://raider.io/characters/eu/ragnaros/${data.guildRoster.roster[i].character.name}`;
            let linkWarcraftLogs = `https://www.warcraftlogs.com/character/eu/ragnaros/${data.guildRoster.roster[i].character.name}`;
            links.push(linkArmory);
            links.push(linkRaiderIo);
            links.push(linkWarcraftLogs);
            let member = new Members(data.guildRoster.roster[i].rank, data.guildRoster.roster[i].character.name, data.guildRoster.roster[i].character.itemLevelEquipped,
                Math.floor(data.guildRoster.roster[i].character.heartOfAzerothLevel), data.guildRoster.roster[i].character.items.corruption.total, data.guildRoster.roster[i].character.items.corruption.cloakRank,
                data.guildRoster.roster[i].character.class.slug, data.guildRoster.roster[i].character.items.corruption.added, data.guildRoster.roster[i].character.items.corruption.resisted,
                data.guildRoster.roster[i].character.items.items, links);
            membersInfo.push(member);
        }
        console.log(data);
        membersInfo.sort(function(a, b) { return a.rank - b.rank });
        for (let i = 0; i < membersInfo.length; i++) {
            addMembers(membersInfo[i]);
        }

        function showPage() {
            document.getElementById("loader").style.display = "none";
        }
        showPage();
    })
    .catch(function(error) {
        let errorDiv = document.querySelector("#error");
        let sp = document.createElement("span");
        sp.textContent = error;
        errorDiv.append(sp);
        document.getElementById("loader").style.display = "none";
        console.log(error);
    });

class Members {
    constructor(rank, name, ilvl, hoa, corruption, cloak, className, corruptionAdded, corruptionResisted, items, links) {
        this.rank = rank;
        this.name = name;
        this.ilvl = ilvl;
        this.hoa = hoa;
        this.corruption = corruption;
        this.cloak = cloak;
        this.className = className;
        this.corruptionAdded = corruptionAdded;
        this.corruptionResisted = corruptionResisted;
        this.items = items;
        this.links = links;
    }
}

let table = document.querySelector("#table");
let td;
let tr;
let a1;
let a2;
let a3;

function addMembers(obj) {
    tr = document.createElement("tr");
    table.appendChild(tr);
    let corruptedItems = [];

    for (let item in obj) {
        if (item == "items") {
            for (let gear in obj[item]) {
                if (obj[item][gear].corruption.added > 0 || obj[item][gear].corruption.resisted > 0) {
                    corruptedItems.push(gear);
                }
            }
        }
    }
    for (let item in obj) {
        let className = obj["className"];
        let color = "";
        switch (className) {
            case "death-knight":
                color = "#C41F3B";
                break;
            case "demon-hunter":
                color = "#A330C9";
                break;
            case "druid":
                color = "#FF7D0A";
                break;
            case "hunter":
                color = "#ABD473";
                break;
            case "mage":
                color = "#69CCF0";
                break;
            case "monk":
                color = "#00FF96";
                break;
            case "paladin":
                color = "#F58CBA";
                break;
            case "priest":
                color = "#FFFFFF";
                break;
            case "rogue":
                color = "#FFF569";
                break;
            case "shaman":
                color = "#2459FF";
                break;
            case "warlock":
                color = "#9482CA";
                break;
            case "warrior":
                color = "#C79C6E";
                break;
        }

        if (item == "name") {
            td = document.createElement("td");
            td.textContent = obj[item];
            tr.append(td);
            td.style.color = color;
        } else if (item == "rank") {
            td = document.createElement("td");
            let ranks = obj[item];
            switch (ranks) {
                case 0:
                    td.textContent = "Guild Master";
                    break;
                case 1:
                    td.textContent = "Officer";
                    break;
                case 4:
                    td.textContent = "Raider";
                    break;
                case 5:
                    td.textContent = "Support Raider";
                    break;
                case 6:
                    td.textContent = "Recruit";
                    break;
                case 8:
                    td.textContent = "Alt";
                    break;
                case 9:
                    td.textContent = "Friend & Family";
                    break;
            }
            tr.append(td);
        } else if (item == "corruption") {
            td = document.createElement("td");
            td.textContent = obj[item];
            tr.append(td);
            td.classList.add("tooltip");

            let t = document.createElement("span");
            t.setAttribute('style', 'white-space: pre;');
            t.textContent = `Added: ${obj.corruptionAdded}`;
            t.textContent += "\r\n";
            t.textContent += `Resisted: ${obj.corruptionResisted} `;
            t.textContent += "\r\n";
            t.textContent += "Corrupted item(s):";
            t.textContent += "\r\n";
            for (let j = 0; j < corruptedItems.length; j++) {
                t.textContent += `   ${corruptedItems[j]}`;
                t.textContent += "\r\n";
            }
            td.append(t);
            t.classList.add("tooltiptext");
        } else if (item == "links") {
            td = document.createElement("td");
            a1 = document.createElement("a");
            a1.setAttribute("href", obj[item][0]);
            a1.setAttribute("title", "Armory Profile");
            a1.setAttribute("target", "_blank");
            a1.innerHTML = '<img width="16" alt="WoW icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/32px-WoW_icon.svg.png">';
            td.append(a1);
            a2 = document.createElement("a");
            a2.setAttribute("href", obj[item][1]);
            a2.setAttribute("title", "Raider IO Profile");
            a2.setAttribute("target", "_blank");
            a2.innerHTML = '<img width="16" alt="WoW icon" src="https://cdnassets.raider.io/images/brand/Mark_2ColorWhite.svg">';;
            td.append(a2);
            a3 = document.createElement("a");
            a3.setAttribute("href", obj[item][2]);
            a3.setAttribute("title", "Warcraft Logs Profile");
            a3.setAttribute("target", "_blank");
            a3.innerHTML = '<img width="16" alt="WoW icon" src="https://dmszsuqyoe6y6.cloudfront.net/img/warcraft/favicon.png?v=2">';
            td.append(a3);
            tr.append(td);
        } else if (item != "className" && item != "corruptionAdded" && item != "corruptionResisted" && item != "items") {
            td = document.createElement("td");
            td.textContent = obj[item];
            tr.append(td);
        }
    }
};

let rankBtns = document.querySelectorAll(".rank-button");
rankBtns[0].classList.add("rank-button-active");
for (let i = 0; i < rankBtns.length; i++) {
    rankBtns[i].addEventListener("click", function() {
        if (rankBtns[i].classList.contains("rank-button-active")) {
            rankBtns[i].classList.remove("rank-button-active");
        } else {
            rankBtns[i].classList.add("rank-button-active");
        }
    });
}

let filteredDataRank = [, , , , , , , ];
for (let i = 0; i < rankBtns.length; i++) {
    rankBtns[i].addEventListener("click", function() {

        if (i != 0) {
            rankBtns[0].classList.remove("rank-button-active");
        } else {
            rankBtns[0].classList.add("rank-button-active");
            for (let j = 1; j < rankBtns.length; j++) {
                rankBtns[j].classList.remove("rank-button-active");
            }
        }

        let rankNum;
        switch (i) {
            case 0:
                break;
            case 1:
                rankNum = 0;
                break;
            case 2:
                rankNum = 1;
                break;
            case 3:
                rankNum = 4;
                break;
            case 4:
                rankNum = 5;
                break;
            case 5:
                rankNum = 6;
                break;
            case 6:
                rankNum = 8;
                break;
            case 7:
                rankNum = 9;
                break;
        }

        if (i == 0) {
            filteredDataRank = JSON.parse(JSON.stringify(membersInfo));

            let trs = document.querySelectorAll("tr");
            for (let j = 1; j < trs.length; j++) {
                table.removeChild(trs[j]);
            }

            for (let j = 0; j < filteredDataRank.length; j++) {
                addMembers(filteredDataRank[j]);
            }
            filteredDataRank = [, , , , , , , ];

            for (let btn of classBtns) {
                btn.classList.remove("classes-active", "priest-active");
                classBtns[0].classList.add("all-active");
            }
        } else {
            classBtns[0].classList.add("all-active");
            for (let btn of classBtns) {
                btn.classList.remove("classes-active", "priest-active");
            }
            filteredDataClass = [, , , , , , , , , , , , ];


            let preFilteredData = membersInfo.filter(rankFilter);

            function rankFilter(member) {
                return member.rank == rankNum;
            }
            if (rankBtns[i].classList.contains("rank-button-active")) {
                filteredDataRank.splice(i - 1, 1, preFilteredData)
            } else {
                filteredDataRank.splice((i - 1), 1, undefined);
            }

            let trs = document.querySelectorAll("tr");
            for (let j = 1; j < trs.length; j++) {
                table.removeChild(trs[j]);
            }

            for (let j = 0; j < filteredDataRank.length; j++) {
                if (filteredDataRank[j] != undefined) {
                    for (let k = 0; k < filteredDataRank[j].length; k++) {
                        addMembers(filteredDataRank[j][k]);
                    }
                }
            }
        }
    });
}


let classBtns = document.querySelectorAll(".class-button");
classBtns[0].classList.add("all-active");
for (let btn of classBtns) {
    btn.addEventListener("click", function() {
        if (btn.classList.contains("all")) {
            if (btn.classList.contains("all-active")) {
                btn.classList.remove("all-active");
            } else {
                btn.classList.add("all-active");
            }
        } else if (btn.classList.contains("priest")) {
            if (btn.classList.contains("priest-active")) {
                btn.classList.remove("priest-active");
            } else {
                btn.classList.add("priest-active");
            }
        } else {
            if (btn.classList.contains("classes-active")) {
                btn.classList.remove("classes-active");
            } else {
                btn.classList.add("classes-active");
            }
        }
    });
}

let filteredDataClass = [, , , , , , , , , , , , ];
for (let i = 0; i < classBtns.length; i++) {
    classBtns[i].addEventListener("click", function() {
        if (i != 0) {
            classBtns[0].classList.remove("all-active");
        } else {
            classBtns[0].classList.add("all-active");
            for (let j = 1; j < classBtns.length; j++) {
                classBtns[j].classList.remove("classes-active", "priest-active");
            }
        }

        let charClass;
        switch (i) {
            case 0:
                break;
            case 1:
                charClass = "death-knight";
                break;
            case 2:
                charClass = "demon-hunter";
                break;
            case 3:
                charClass = "druid";
                break;
            case 4:
                charClass = "hunter";
                break;
            case 5:
                charClass = "mage";
                break;
            case 6:
                charClass = "monk";
                break;
            case 7:
                charClass = "paladin";
                break;
            case 8:
                charClass = "priest";
                break;
            case 9:
                charClass = "rogue";
                break;
            case 10:
                charClass = "shaman";
                break;
            case 11:
                charClass = "warlock";
                break;
            case 12:
                charClass = "warrior";
                break;
        }
        for (let j = 1; j < rankBtns.length; j++) {

            if ((i == 0) && (rankBtns[0].classList.contains("rank-button-active"))) {
                filteredDataClass = JSON.parse(JSON.stringify(membersInfo));

                let trs = document.querySelectorAll("tr");
                for (let j = 1; j < trs.length; j++) {
                    table.removeChild(trs[j]);
                }

                for (let j = 0; j < filteredDataClass.length; j++) {
                    addMembers(filteredDataClass[j]);
                }
                filteredDataClass = [, , , , , , , , , , , , ];
            } else if (i == 0 && !(rankBtns[j].classList.contains("rank-button-active"))) {
                filteredDataClass = filteredDataRank;

                let trs = document.querySelectorAll("tr");
                for (let k = 1; k < trs.length; k++) {
                    table.removeChild(trs[k]);
                }

                for (let k = 0; k < filteredDataClass.length; k++) {
                    if (filteredDataClass[k] != undefined) {
                        for (let l = 0; l < filteredDataClass[k].length; l++) {
                            addMembers(filteredDataClass[k][l]);
                        }
                    }
                }

                filteredDataClass = [, , , , , , , , , , , , ];
            } else {

                let preFilteredDataClass = [];
                let preFilteredData;

                let filteredDataClassAll;

                function classFilter(member) {
                    return member.className == charClass;
                }


                if (rankBtns[0].classList.contains("rank-button-active")) {
                    filteredDataClassAll = JSON.parse(JSON.stringify(membersInfo));
                    for (let j = 0; j < filteredDataClassAll.length; j++) {
                        if (filteredDataClassAll[j] != undefined) {
                            preFilteredData = filteredDataClassAll.filter(classFilter);
                        }
                    }
                    preFilteredDataClass.push(preFilteredData);

                } else {
                    for (let j = 0; j < filteredDataRank.length; j++) {
                        if (filteredDataRank[j] != undefined) {
                            preFilteredData = filteredDataRank[j].filter(classFilter);

                            preFilteredDataClass.push(preFilteredData);
                        }
                    }
                }

                let classData = [];
                classData.push(preFilteredDataClass);

                if (classBtns[i].classList.contains("classes-active") || classBtns[i].classList.contains("priest-active")) {
                    filteredDataClass.splice(i - 1, 1, classData)
                } else {
                    filteredDataClass.splice((i - 1), 1, undefined);
                }

                let trs = document.querySelectorAll("tr");
                for (let j = 1; j < trs.length; j++) {
                    table.removeChild(trs[j]);
                }

                for (let j = 0; j < filteredDataClass.length; j++) {
                    if (filteredDataClass[j] != undefined) {
                        for (let k = 0; k < filteredDataClass[j][0].length; k++) {
                            for (let l = 0; l < filteredDataClass[j][0][k].length; l++) {
                                addMembers(filteredDataClass[j][0][k][l]);
                            }
                        }
                    }
                }
            }
        }
    });
}