import Binder from "../utils/Binder";

class GenericCRUDController {
    constructor(EntityModel, lookUpKey) {
        console.log(EntityModel);
        if (!EntityModel) {
            throw "Entity Model must be defined";
        }
        this.entity = EntityModel;
        this.lookUpKey = lookUpKey;

        Binder.bind(this, GenericCRUDController);
    }

    async list(req, res) {
        console.log("List");
        console.log(this);
        try {
            const objList = await this.entity.all();
            res.status(200);
            res.json(objList);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                message: "Failed to fetch " + this.entity.modelName,
                error,
            });
        }
    }

    async create(req, res) {
        const entityDTO = req.body;
        try {
            const entityObj = await this.entity.create(entityDTO);
            res.json(entityObj);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                message: "Failed to create " + this.entity.modelName,
                error,
            });
        }
    }

    async getById(req, res) {
        try {
            const entityId = req.params[this.lookUpKey];
            const entityObj = await this.entity.getById(entityId);
            res.status(200);
            res.json(entityObj);
        } catch (error) {
            console.log(error);
            res.status(404);
            res.json({
                message:
                    "Failed to fetch " + this.entity.modelName + " of " + objId,
                error,
            });
        }
    }

    async update(req, res) {
        const entityId = req.params[this.lookUpKey];
        const entityDTO = req.body;
        try {
            const entityObj = await this.entity.update(entityId, entityDTO);
            res.json(entityObj);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                message: "Failed to update " + this.entity.modelName,
                error,
            });
        }
    }

    async delete(req, res) {
        const entityId = req.params[this.lookUpKey];
        try {
            await this.entity.delete(entityId);
            res.status(204);
            res.json("success");
        } catch (error) {
            console.log(error);
            res.status(404);
            res.json({
                message:
                    "Failed to find " +
                    this.entity.modelName +
                    " of " +
                    entityId,
                error,
            });
        }
    }

    async validation() {}
}

export default GenericCRUDController;
