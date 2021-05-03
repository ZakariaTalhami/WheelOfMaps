/**
 * Binds all the methods within a class to "this"
 */
class Binder {}

/**
 * Get all the methods in the given instance
 * @param {Object} instance
 * @return {Array} - list of methods
 */
Binder.getAllMethods = function (instance) {
    var props = [];
    var obj = instance;
    while ((obj = Object.getPrototypeOf(obj)) && obj != Object.prototype) {
        props = props.concat(Object.getOwnPropertyNames(obj));
    }

    return props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof instance[e] == "function") return true;
    });
};

/**
 * Binds the instance's methods
 * @param {Object} instance
 */
Binder.bind = function (instance) {
    Binder.getAllMethods(instance).forEach((mtd) => {
        instance[mtd] = instance[mtd].bind(instance);
    });
};

export default Binder;
