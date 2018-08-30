import Do from "../../const/do"

export default {
    [Do.CLOSE_COMPARE_LEFT]: state => state.compare.left = null,
    [Do.CLOSE_COMPARE_RIGHT]: state => state.compare.right = null
}