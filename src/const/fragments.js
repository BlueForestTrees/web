export const IMPACT_TANK = "impactsTank"
export const FACETS = "facets"
export const TANK = "tank"
export const OWNER = "owner"
export const IMPACTS = "impacts"
export const ROOTS = "roots"
export const TRUNK = "trunk"


export const allFragments = [TRUNK, OWNER, ROOTS, "branches", IMPACTS, "damages", IMPACT_TANK, "damagesTank", FACETS, TANK]
export const treeHeadFragments = [TRUNK, OWNER]
export const treeFragments = [TRUNK, OWNER, TANK, IMPACT_TANK, FACETS]
export const infoFragments = [TRUNK, TANK, IMPACT_TANK, FACETS]

//Lien entre les fragments et les id d'entry de chaque fragment.
export const entryKeyFromFragmentName = {
    [IMPACT_TANK]: "_id",
    [FACETS]: "facetId",
    [TANK]: "_id"
}