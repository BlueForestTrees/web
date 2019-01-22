export const IMPACT_TANK = "impactsTank"
export const FACETS = "facets"
export const TANK = "tank"
export const OWNER = "owner"

export const allFragments = ["trunk", OWNER, "roots", "branches", "impacts", "damages", IMPACT_TANK, "damagesTank", FACETS, TANK]
export const treeFragments = ["trunk", OWNER, TANK, IMPACT_TANK, FACETS]
export const infoFragments = ["trunk", TANK, IMPACT_TANK, FACETS]

//Lien entre les fragments et les id d'entry de chaque fragment.
export const entryKeyFromFragmentName = {
    [IMPACT_TANK]: "_id",
    [FACETS]: "facetId",
    [TANK]: "_id"
}