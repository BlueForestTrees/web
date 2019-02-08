import Do from "../../const/do"

export default {
    [Do.SWITCH_LEFT_MENU]: state => state.nav.leftMenuVisible = !state.nav.leftMenuVisible,
    [Do.RIGHT_MENU_VISIBLE]: (state, visible) => state.nav.rightMenuVisible = visible,
    [Do.SET_NAV_MAIN_TAB]: (state, v) => state.nav.main.tab = v,
    [Do.SET_NAV_TREE_PICKER_TAB]: (state, v) => state.nav.tree.picker.tab = v,
    [Do.SET_NAV_SEARCH_CAT_OPENED]: (state, v) => state.nav.search.cat.opened = v,
    [Do.SET_NAV_SEARCH_OWNER_OPENED]: (state, v) => state.nav.search.owner.opened = v,
}