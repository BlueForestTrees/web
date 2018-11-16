export const ARBRE_RESSOURCE = "Arbre des ressources"
export const ARBRE_USAGE = "Arbre des usages"
export const PUZZLE = "Puzzle"
export const QUESTION = "Question"


export const maquettes = {
    [ARBRE_RESSOURCE]: {text: "Objectif: pouvoir naviguer dans les ressources des ressources d'un produit.", slides: ['Arbre des ressources 1', 'Arbre des ressources 2', 'Arbre des ressources 3', 'Arbre des ressources 4']},
    [ARBRE_USAGE]: {text: "Objectif: pouvoir naviguer dans les usages des usages possibles d'un produit.", slides: ['Arbre des usages 1', 'Arbre des usages 2', 'Arbre des usages 3', 'Arbre des usages 4']},
    [PUZZLE]: {text: "Objectif: pouvoir mettre en place des équivalences entre deux ou plusieurs produit ou services.", slides: ['puzzle 1', 'puzzle 2', 'puzzle 3', 'puzzle 4', 'puzzle 5']},
    [QUESTION]: {text: "Objectif: Etonner par des faits, faire entrer dans la navigation des ressources.", slides: ['question 1']}
}

export default {
    ARBRE_RESSOURCE, ARBRE_USAGE, PUZZLE, QUESTION, maquettes
}