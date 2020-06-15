"use strict";
let seconds = 0,    //secondes temps de jeu
    minutes = 0,    //minutes temps de jeu
    hours = 0,    //heures temps de jeu
    argent = 0,   //argent ressource
    problemes = 0,    //problèmes ressource
    journaliste = 0,    //journalistes ressource
    popularite = 1,   //popularité ressource
    temps,    //minuterie
    flag = false,   //flag vérifie si timer roule
    nbGuerre = 0,   //nb de guerres en cours
    income = 1,   //profits par 6 secondes
    problemeTotal = 0,    //problèmes totaux du joueur
    supporters = 0,   //supporters ressource
    supporterTotal = 1,   //supporters totaux du joueur
    bonus = 0,    //bonus ressource
    playerCash = 10000,   //argent du joueur
    tdNb = 1, //indice de colonne du tableau a modifier
    objetInventaire = 0;    //objets dans l'inventaire

const h2 = document.getElementsByTagName('h2')[0],    //horloge du jeu
    btnPlay = document.getElementById('boutonPlay'),    //bouton play
    btnPause = document.getElementById('boutonPause'),    //bouton pause      
    war = document.getElementById('buttonWar'),   //bouton war
    joueurArgent = document.getElementById('joueurArgent'),   //label argent du joueur
    joueurProfit = document.getElementById('joueurProfit'),   //label profit total du joueur
    joueurPop = document.getElementById('joueurPop'),   //label popularité du joueur
    btnShop = document.getElementById('btnShop'),   //bouton shop
    btnClose = document.getElementById('btnClose'),   //bouton fermer shop
    progresTweet = document.getElementById('progresArgent'),    //progress bar ressource argent
    progresEspionner = document.getElementById('progresPop'),   //progress bar ressource popularité
    progresCorrompre = document.getElementById('progresProb'),    //progress bar ressource problèmes
    progresProvoquer = document.getElementById('progresBonus'),   //progress bar ressource bonus
    problemesRes = document.getElementById('problemesRes'),   //label ressource problèmes créés
    cashRes = document.getElementById('cashRes'),   //label ressource argent
    journalisteRes = document.getElementById('journalisteRes'),   //label ressource problèmes solved
    supporterRes = document.getElementById('supporterRes'),   //label ressource popularité
    bonusRes = document.getElementById('bonusRes'),   //label ressource bonus
    imgTab1 = document.getElementById('imgTab1'),   //image tableau guerre #1
    imgTab2 = document.getElementById('imgTab2'),   //image tableau guerre #2
    imgJoueur1 = document.getElementById('imgJoueur1'),   //image joueur #1
    imgJoueur2 = document.getElementById('imgJoueur2'),   //image joueur #2
    inventaire = document.getElementById("divInventaire"),  //div inventaire
    pays = ["Chine", "Russie", "Canada", "Mexique", "Bolivie", "Corée", "Japon", "Venezuela", "Iran", "France", "Palestine", "Irak", "Soudan", "Longueil", "Laval"];   //tableau nom de pays random




/**
 * Ajoute une seconde à la minuterie, à chaque 6 secondes : additionne la valeur de profitabilité du joueur à son argent total et recalcule la popularité.
 */
function add() {
    seconds++;
    if (seconds % 6 == 0) {
        playerCash += income;
        popularite *= (supporterTotal / income) * 1.5;
        if (popularite > 1)
            popularite = 1;
        popularite -= (problemeTotal * 0.1);
        if (popularite > 1)
            popularite = 1;
        if (popularite <= 0.009)
            if (!alert('Vous avez été destitué! Recommencer?')) { window.location.reload(); }
        setJoueurStats();
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }

    }

    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

/**
 * Ajoute une seconde à la minuterie
 */
function timer() {
    temps = setTimeout(add, 1000);
}

/**
 * Ajuste les statistiques du joueur (argent, pop, profit)
 */
function setJoueurStats() {
    joueurArgent.innerHTML = Math.round(playerCash) + "$";
    joueurProfit.innerHTML = Math.round(income) + "$";
    joueurPop.innerHTML = popularite.toFixed(2) * 100 + "%";
}

/**
 * Démarre la minuterie
 */
btnPlay.onclick = function () {
    if (flag == false) {
        timer();
        flag = true;
    }
}

/**
 * Stop la minuterie et les ressources
 */
btnPause.onclick = function () {
    progresTweet.style.webkitAnimationPlayState = 'paused';
    progresEspionner.style.webkitAnimationPlayState = 'paused';
    progresCorrompre.style.webkitAnimationPlayState = 'paused';
    progresProvoquer.style.webkitAnimationPlayState = 'paused';
    clearTimeout(temps);
    flag = false;
}

/**
 * Ouvre le shop
 */
btnShop.onclick = function () {
    document.getElementById("popupBg").classList.add('gridDisplay');
}

/**
 * Ferme le shop
 */
btnClose.onclick = function () {
    document.getElementById("popupBg").classList.remove('gridDisplay');
}

/**
 * Acheter objet journal
 */
document.getElementById('btnBuyJournal').onclick = function () {
    if (playerCash >= 200) {
        putObjetInventaire("css/images/journal.png");
        playerCash -= 200;
    }
    setJoueurStats();
}

/**
 * Acheter objet cash
 */
document.getElementById('btnBuyMoney').onclick = function () {
    if (playerCash >= 200) {
        putObjetInventaire("css/images/cash.png");
        playerCash -= 200;
    }
    setJoueurStats();
}

/**
 * Acheter objet bombe
 */
document.getElementById('btnBuyBomb').onclick = function () {
    if (playerCash >= 500) {
        putObjetInventaire("css/images/bomb.png");
        playerCash -= 200;
    }
    setJoueurStats();
}

/**
 * Acheter objet doggo
 */
document.getElementById('btnBuyDoggo').onclick = function () {
    if (playerCash >= 500) {
        putObjetInventaire("css/images/dogo.png");
        playerCash -= 200;
    }
    setJoueurStats();
}

/**
 * Acheter objet pepe
 */
document.getElementById('btnBuyPepe').onclick = function () {
    if (playerCash >= 700) {
        putObjetInventaire("css/images/pepe.png");
        playerCash -= 700;
    }
    setJoueurStats();
}

/**
 * Acheter objet Grumpy
 */
document.getElementById('btnBuyGrumpy').onclick = function () {
    if (playerCash >= 1100) {
        putObjetInventaire("css/images/grumpy.png");
        playerCash -= 1100;
    }
    setJoueurStats();
}

/**
 * Met l'objet acheté dans l'inventaire
 * @param {string} stringUrl Path de l'objet acheté
 */
function putObjetInventaire(stringUrl) {
    let inventaire1 = inventaire.children[0],   //objet d'inventaire #1
        inventaire2 = inventaire.children[1],     //objet d'inventaire #2
        inventaire3 = inventaire.children[2],     //objet d'inventaire #3
        inventaire4 = inventaire.children[3],     //objet d'inventaire #4
        inventaire5 = inventaire.children[4],     //objet d'inventaire #5
        inventaire6 = inventaire.children[5],     //objet d'inventaire #6
        inventaire7 = inventaire.children[6],     //objet d'inventaire #7
        inventaire8 = inventaire.children[7];     //objet d'inventaire #8

    if (objetInventaire == 0 && inventaire1.getAttribute('src') == "css/images/blackDot.png") {
        inventaire1.src = stringUrl;
        inventaire1.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 1 && inventaire2.getAttribute('src') == "css/images/blackDot.png") {
        inventaire2.src = stringUrl;
        inventaire2.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 2 && inventaire3.getAttribute('src') == "css/images/blackDot.png") {
        inventaire3.src = stringUrl;
        inventaire3.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 3 && inventaire4.getAttribute('src') == "css/images/blackDot.png") {
        inventaire4.src = stringUrl;
        inventaire4.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 4 && inventaire5.getAttribute('src') == "css/images/blackDot.png") {
        inventaire5.src = stringUrl;
        inventaire5.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 5 && inventaire6.getAttribute('src') == "css/images/blackDot.png") {
        inventaire6.src = stringUrl;
        inventaire6.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 6 && inventaire7.getAttribute('src') == "css/images/blackDot.png") {
        inventaire7.src = stringUrl;
        inventaire7.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 7 && inventaire8.getAttribute('src') == "css/images/blackDot.png") {
        inventaire8.src = stringUrl;
        inventaire8.setAttribute('draggable', true);
        objetInventaire++;
    } else if (objetInventaire == 8) {
        alert('inventaire plein');
    }
}

/**
 * Démarre une guerre
 */
war.onclick = function () {
    checkWarItem(imgTab1);
    checkWarItem(imgTab2);
    let argentResult = Math.round(argent * (1 + bonus)),    //Statistique argent selon ressource
        supporterResult = Math.round(supporters * (1 + bonus)),     //Statistique popularité selon ressource
        paysCible = pays[Math.floor(Math.random() * pays.length)],    //Pays choisi au hasard dans l'array
        bonusResult = "x " + bonus.toFixed(2);

    if (nbGuerre < 5) {
        document.getElementById('tdPays' + tdNb).innerHTML = paysCible;
        document.getElementById('tdProfit' + tdNb).innerHTML = argentResult;
        document.getElementById('tdProb' + tdNb).innerHTML = Math.round(problemes);
        document.getElementById('tdPop' + tdNb).innerHTML = supporterResult;
        document.getElementById('tdBonus' + tdNb).innerHTML = bonusResult;
        nbGuerre++;
        tdNb++;
        clearRes();
        document.getElementById('joueurNbGuerres').innerHTML = nbGuerre + "/5";
    } else {
        alert("Déjè 5 guerres !")
    }
}

/**
 * Remet les ressources à 0
 */
function clearRes() {
    income += argent;
    income *= (1 + bonus);
    problemeTotal += problemes;
    supporterTotal += supporters;
    supporterTotal *= (1 + bonus);
    argent = 0;
    problemes = 0;
    supporters = 0;
    journaliste = 0;
    bonus = 0;
    cashRes.innerHTML = argent;
    problemesRes.innerHTML = problemes;
    supporterRes.innerHTML = supporters;
    journalisteRes.innerHTML = journaliste;
    bonusRes.innerHTML = bonus;
}

/**
 * Augmenter les profits après chaque complétion de la ressource argent et créer un problème après chaque 4 complétions
 */
function cashFunction() {
    argent += 5;
    problemes += 0.125;
    cashRes.innerHTML = argent;
    if (problemes % 1 == 0)
        problemesRes.innerHTML = problemes;
}

/**
 * Augmenter les supporters après chaque complétion de la ressource popularité
  */
function supporterFunction() {
    supporters += 5;
    supporterRes.innerHTML = supporters;
}

/**
 * Diminuer les problèmes après chaque 4 complétions de la ressource problèmes
 */
function mediaFunction() {
    journaliste++;
    if (problemes > 0)
        problemes -= 0.125;
    problemesRes.innerHTML = Math.ceil(problemes);
    journalisteRes.innerHTML = journaliste;
}
/**
 * Ajouter 0.1 au facteur du bonus à chaque complétion de la ressource bonus
 */
function bonusFunction() {
    bonus += 0.05;
    bonusRes.innerHTML = Math.round(bonus);
}

/**
 * Vérifie quel objet se trouve dans l'emplacement afin d'appliquer à la guerre les bonus prévus
 * @param {string} imgTab emplacement (div) à vérifier
 */
function checkWarItem(imgTab) {
    if (imgTab.hasChildNodes()) {
        let objet = imgTab.firstChild.getAttribute('src');      //src de l'image contenue dans le div imgTab
        switch (objet) {
            case "css/images/journal.png":
                supporters += 20;
                break;
            case "css/images/cash.png":
                argent += 20;
                break;
            case "css/images/bomb.png":
                supporters *= 1.2;
                argent *= 1.2;
                break;
            case "css/images/dogo.png":
                problemes--;
                break;
            case "css/images/pepe.png":
                bonus++;
                break;
            case "css/images/grumpy.png":
                supporters *= 2;
                argent *= 2;
                break;
        }
        imgTab.innerHTML = "";
    }
}

/**
 * Active la ressource argent et la minuterie et désactive les autres ressources.
 */
function activateTweet() {
    progresTweet.style.webkitAnimationPlayState = 'running';
    progresEspionner.style.webkitAnimationPlayState = 'paused';
    progresCorrompre.style.webkitAnimationPlayState = 'paused';
    progresProvoquer.style.webkitAnimationPlayState = 'paused';
    btnPlay.click();
    progresTweet.addEventListener('animationiteration', cashFunction);
}

/**
 * Active la ressource popularité et la minuterie et désactive les autres ressources.
 */
function activateSpy() {
    progresEspionner.style.webkitAnimationPlayState = 'running';
    progresTweet.style.webkitAnimationPlayState = 'paused';
    progresCorrompre.style.webkitAnimationPlayState = 'paused';
    progresProvoquer.style.webkitAnimationPlayState = 'paused';
    btnPlay.click();
    progresEspionner.addEventListener('animationiteration', supporterFunction);
}

/**
 * Active la ressource problèmes et la minuterie et désactive les autres ressources.
 */
function activateCorrompre() {
    progresCorrompre.style.webkitAnimationPlayState = 'running';
    progresEspionner.style.webkitAnimationPlayState = 'paused';
    progresTweet.style.webkitAnimationPlayState = 'paused';
    progresProvoquer.style.webkitAnimationPlayState = 'paused';
    progresCorrompre.addEventListener('animationiteration', mediaFunction);
    btnPlay.click();
}

/**
 * Active la ressource bonus et la minuterie et désactive les autres ressources.
 */
function activateProvoquer() {
    progresProvoquer.style.webkitAnimationPlayState = 'running';
    progresCorrompre.style.webkitAnimationPlayState = 'paused';
    progresEspionner.style.webkitAnimationPlayState = 'paused';
    progresTweet.style.webkitAnimationPlayState = 'paused';
    progresProvoquer.addEventListener('animationiteration', bonusFunction);
    btnPlay.click();
}

/**
 * Allouer le drop
 * @param {Event} ev Drop
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Drag l'élément
 * @param {Event} ev Drag
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * Drop l'élément et replace l'élément existant si applicable
 * Pour objet de guerre
 * @param {Event} ev Drop
 */
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");     //élément transféré
    let target = document.getElementById(ev.target.id);     //target du drop
    ev.target.appendChild(document.getElementById(data));
    document.getElementById('divInventaire').innerHTML += '<img src="css/images/blackDot.png" draggable="false" ondragstart="drag(event)"/>';
    objetInventaire--;
}

/**
 * Drop l'élément et applique le bonus associé
 * Pour objet du joueur
 * @param {Event} ev Drop
 */
function dropJoueur(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");   //élément transféré
    ev.target.appendChild(document.getElementById(data));
    let source = document.getElementById(data).getAttribute('src');   //src de l'image
    document.getElementById('divInventaire').innerHTML += '<img src="css/images/blackDot.png" draggable="false" ondragstart="drag(event)"/>';
    bonusItemJoueur(source, ev.target.id);
    objetInventaire--;
}

/**
 * Applique le bonus associé à l'item pendant le temps désigné, ensuite efface l'item et les effets du bonus
 * @param {string} source path de l'image de l'objet
 * @param {string} ev_target div contenant l'image
 */
function bonusItemJoueur(source, ev_target) {
    switch (source) {
        case "css/images/journal.png":
            supporterTotal += 20;
            let node = document.getElementById(ev_target); //id du div contenant l'image
            let timeoutJournal = setTimeout(function () {
                functionJournal(node);
            }, 30000);
            // node.removeChild(list.childNodes[0]);
            // document.getElementById(data).remove();
            break;
        case "css/images/cash.png":
            // todo
            break;
        case "css/images/bomb.png":
            // todo
            break;
        case "css/images/dogo.png":
            // todo
            break;
        case "css/images/pepe.png":
            // todo
            break;
        case "css/images/grumpy.png":
            // todo
            break;
    }
}

/**
 * Supprime l'image journal et son bonus
 * @param {string} node div contenant l'image
 */
function functionJournal(node) {
    supporterTotal -= 20;
    node.removeChild(node.childNodes[0]);
}

/**
 * Lance une animation de sortie et retard le chargement de l'url de 500ms
 * @param {string} URL url à charger
 */
function delay(URL) {
    setTimeout(function () {
        window.location = URL;
    }, 500);
    document.getElementById("nav").className = "nav navOut";
    document.getElementById("img").className = "home imgOut";
    document.getElementById("divJoueur").className = "divJoueur divJoueurOut";
    document.getElementById("divTableau").className = "divTableau divTableauOut";
    document.getElementById("divRessource").className =
        "divRessource divRessourceOut";
    document.getElementById("divInventaire").className =
        "divInventaire divInventaireOut";
}



