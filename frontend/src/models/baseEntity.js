import axios from "axios";

/**
 * This is the base class for all the entities that will be handled in the system.
 * The base entity provide the base logic for saving entities and tracking dirty state.
 */
export default class baseEntity {
    // true of the entity is not synced with BE
    #isDirty = false;
    #isNew = false;
    _id;

    constructor(_id) {
        this.#isNew = !_id;
        this._id = _id;
    }

    /**
     * Create A new and empty entity
     * @returns {baseEntity} - empty entity
     */
    static createEmpty() {
        // this.name gets the class name of the static method
        return eval(`new ${this.name}()`);
    }

    /**
     * Get whether the entity is has been modified (dirty)
     * @returns {Boolean} - is dirty
     */
    isDirty() {
        return this.#isDirty;
    }

    /**
     * Set dirty state to true
     */
    setDirty() {
        this.#isDirty = true;
    }

    /**
     * Get whether the entity is new
     * @returns {Boolean} - is new
     */
    isNew() {
        return this.#isNew;
    }

    /**
     * Saves the dirty entity to the server
     * @returns {Promise} - http response from save.
     */
    save() {
        let savePromise;
        const payload = this.serialize();
        const url = this.getUrl();
        if (this.isNew()) {
            savePromise = axios.post(url, payload);
        } else if (this.isDirty()) {
            savePromise = axios.put(`${url}/${this._id}`, payload);
        }

        return savePromise;
    }

    /**
     *  Converts the entity object to json string
     *  @returns {string} - entity as json
     */
    serialize() {
        return JSON.stringify(this);
    }

    /**
     * Get the URL of the entity on the server.
     * @returns {string} - URL
     */
    getUrl() {
        throw "getUrl() needs to be overriden in the child";
    }
}
