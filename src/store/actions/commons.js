import On from "../../const/on"

export const deleteCatch = (dispatch, chain) => chain.catch(e => {
    let snack
    switch (e.status) {
        case 401:
            snack = {text: "Connectez-vous pour supprimer un élément.", color: "orange", icon: "power_off", action: On.GO_LOGIN}
            break
        case 403:
            snack = {text: "Seul le propriétaire a le droit de supprimer.", color: "orange"}
            break
        default:
            snack = {text: "Erreur pendant la suppression", color: "red"}
            break
    }
    dispatch(On.SNACKBAR, snack)
    return null
})