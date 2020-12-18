export const listModelAPIHandler = (model) => async (req, res) => {
    try {
        const objList = await model.find({});
        res.status(200);
        res.json(objList);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message: "Failed to fetch " + model.modelName,
            error,
        });
    }
};

export const createModelAPIHandler = (model) => async (req, res) => {
    const objDto = req.body;
    try {
        const obj = await model.create(objDto);
        res.json(obj);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message: "Failed to create " + model.modelName,
            error,
        });
    }
};

export const fetchModelAPIHandler = (model, lookUpKey) => async (req, res) => {
    try {
        const objId = req.params[lookUpKey];
        const obj = await model.findById(objId);
        res.status(200);
        res.json(obj);
    } catch (error) {
        console.log(error);
        res.status(404);
        res.json({
            message: "Failed to fetch " + model.modelName + " of " + objId,
            error,
        });
    }
};

export const updateModelAPIHandler = (model, lookUpKey) => async (req, res) => {
    const objId = req.params[lookUpKey];
    const objDto = req.body;
    try {
        const obj = await model.findOneAndUpdate({ _id: objId }, objDto);
        res.json(obj);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message: "Failed to create" + model.modelName,
            error,
        });
    }
};

export const deleteModelAPIHandler = (model, lookUpKey) => async (req, res) => {
    const objId = req.params[lookUpKey];
    try {
        await model.findOneAndDelete({ _id: objId });
        res.status(204);
        res.json("success");
    } catch (error) {
        console.log(error);
        res.status(404);
        res.json({
            message: "Failed to find " + model.modelName + " of " + objId,
            error,
        });
    }
};
