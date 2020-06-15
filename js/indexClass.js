"use strict";


/**
 * Classe représentant un compte
 * @property {string} _pays 
 * @property {number} _profit
 * @property {number} _supporter
 * @property {number} _probleme
 * @property {number} _bonus
 */
class Compte {
    /**
     * Constructeur de la classe compte
     * @constructs
     * @param pays {string}
     * @param profit {number}
     * @param supporter {number}
     * @param probleme {number}
     * @param bonus {number}
     */
    constructor(pays, profit, supporter, probleme, bonus) {
        this._pays = pays;
        this._profit = profit;
        this._supporter = supporter;
        this._probleme = probleme;
        this._bonus = bonus;
    }

    /**
     * @returns {string} pays
     */
    get pays() {
        return this._pays;
    }

    /**
     * @param {string} pays
     */
    set pays(pays) {
        this._pays = pays;
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