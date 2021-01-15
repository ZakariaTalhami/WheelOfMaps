import _ from "lodash";

const evaluateObjectPath = (obj, path = [], defaultValue) => {
    if (_.isString(path)) path = _.split(path, ".");
    if (!_.isObject(obj) || _.isEmpty(path)) return obj || defaultValue;

    return evaluateObjectPath(obj[_.head(path)], _.drop(path), defaultValue);
};

const ObjectUtils = {
    evaluateObjectPath,
};

export default ObjectUtils;
