"use strict";
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
  document.getElementById("divLogin").className = "divParagraphe loginOut";
}

/**
 * Ouvre formulaire pour créer compte
 */
btnPopup.onclick = function() {
  document.getElementById("popupBg").classList.add('gridDisplay');
}

/**
 * Ferme le formulaire pour créer compte
 */
btnClose.onclick = function() {
  document.getElementById("popupBg").classList.remove('gridDisplay');
}

/**
 * Classe représentant un compte
 * @property {string} _email adresse email
 * @property {string} _identifiant identifiant
 */
class Compte {
  /**
   * Constructeur de la classe compte
   * @constructs
   * @param email {string}
   * @param identifiant {string}
   */
  constructor(email, identifiant) {
      this._email = email;
      this._identifiant = identifiant;
  }

  /**
   * @returns {string}
   */
  get email() {
      return this._email;
  }

  /**
   * @param {string} email
   */
  set email(email) {
      this._email = email;
  }

  /**
   * @returns {string}
   */
  get identifiant() {
      return this._identifiant;
  }

  /**
   * @param identifiant
   */
  set identifiant(identifiant) {
      this._identifiant = identifiant;
  }
}

document.getElementById('btnCreer').onclick = function() {
  console.log("allo");
  let mail =  document.getElementById("email").value;
  let pseudo = document.getElementById("identifiant").value;
  let compte = new Compte(mail, pseudo);
  sessionStorage.setItem("adresseEmail", mail);
  sessionStorage.setItem("pseudonyme", pseudo);
}

function onLoad() {
  console.log(sessionStorage.getItem("adresseEmail"));
  console.log(sessionStorage.getItem("pseudonyme"));
}