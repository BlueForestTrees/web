import Do from "../../const/do"

export default {
    [Do.SWITCH_LEFT_MENU]: state => state.nav.leftMenuVisible = !state.nav.leftMenuVisible,
    [Do.RIGHT_MENU_VISIBLE]: (state, visible) => state.nav.rightMenuVisible = visible
}