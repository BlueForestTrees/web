import {debug} from "../../../api/src/main/util/debug";

const ENV = {
    VERSION,
    NODE_ENV: process.env.NODE_ENV
};

debug({ENV});


export default ENV;