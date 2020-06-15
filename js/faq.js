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
  document.getElementById("divParagraphe").className =
    "divParagraphe divParagrapheOut";
}
