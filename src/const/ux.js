import ScrollTo from "vue-scrollto"

const scrollDuration = 500

export const scrollTopPage = () => ScrollTo.scrollTo("#top-page", scrollDuration, {offset: -60, force: true})
export const scrollSubPage = () => ScrollTo.scrollTo("#sub-page", scrollDuration, {offset: -200, force: true})
export const scrollTo = el => ScrollTo.scrollTo(el, scrollDuration, {offset: -200, force: true})
