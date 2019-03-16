export const IMPACT_TANK = "impactsTank"
export const FACETS = "facet"
export const TANK = "tank"
export const OWNER = "owner"
export const IMPACTS = "impact"
export const ROOTS = "roots"
export const TRUNK = "trunk"
export const BRANCHES = "branches"

//Lien entre les fragments et les id d'entry de chaque fragment.
export const entryKeyFromFragmentName = {
    [IMPACT_TANK]: "_id",
    [FACETS]: "facetId",
    [TANK]: "_id",
    [IMPACTS]: "impactId"
}