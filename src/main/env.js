import {debug} from "../../../api/src/main/util/debug";

const ENV = {
    VERSION,
    NODE_ENV: process.env.NODE_ENV
};

debug(`BlueForest v.${ENV.VERSION} - ${ENV.NODE_ENV}`);

export default ENV;