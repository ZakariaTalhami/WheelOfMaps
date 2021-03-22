import axios from "axios";

/**
 * This is the base class for all the entities that will be handled in the system.
 * The base entity provide the base logic for saving entities and tracking dirty state.
 */
export default class baseEntity {
    // true of the entity is not synced with BE
    #isDirty = false;

    /**
     * Get whether the entity is has been modified (dirty)
     * @returns {Boolean} - is dirty
     */
    isDirty() {
        return this.#isDirty;
    }

    /**
     * Saves the dirty entity to the server
     * @returns {Promise} - http response from save.
     */
    save() {
        if (this.isDirty()) {
            const payload = this.serialize();
            const url = this.getUrl();
            return axios.post(url, payload);
        }
        // Return empty promise?
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
