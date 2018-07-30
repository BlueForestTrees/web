const ENV = {
    VERSION,
    NODE_ENV: process.env.NODE_ENV
}

console.log(`BlueForest v.${ENV.VERSION} - ${ENV.NODE_ENV}`)

export default ENV