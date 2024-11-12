const Professons = require('../models/professionsModel');

const getProfessions = async (req, res, next) => {
    try {
        const professions = await Professons.find();
        res.status(200).json({
            professions
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = { getProfessions }