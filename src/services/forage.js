export default {
    getAccessToken: () => localStorage.getItem("token"),
    clearAccessToken: () => localStorage.removeItem("token"),
    setAccessToken: token => localStorage.setItem("token", token),
    getBasket: () => JSON.parse(localStorage.getItem("basket")),
    setBasket: basket => localStorage.setItem("basket", JSON.stringify(basket))
}