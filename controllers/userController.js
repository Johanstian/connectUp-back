const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwtService = require('../services/jwtService');

const validateFields = (body, requiredFields) => {
    for (const field of requiredFields) {
        if (!body[field]) {
            return field;
        }
    }
    return null;
};


const getUsers = async (req, res, nest) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

const createUser = async (req, res) => {
    try {
        let params = req.body;
        if (!params.name || !params.lastName || !params.email || !params.password) {
            return res.status(400).send({
                status: 'error',
                message: 'There are fields to fill'
            })
        }

        let user = new User(params);

        const userCreated = await User.findOne({
            $or: [{ email: user.email.toLowerCase() }]
        });

        if (userCreated) {
            return res.status(409).send({
                status: 'error',
                message: 'Email already in Data Base'
            })
        }

        const salt = await bcrypt.genSalt(11);

        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;

        await user.save();

        return res.status(200).json({
            success: true,
            status: 'created',
            message: 'User created',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'error',
            message: 'Error creating user'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id );

        if (!user) {
            return res.status(400).json( { success: false, message: 'Usuario no encontrado' })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al obtener el usuario'
        })
    }
}

const login = async (req, res) => {
    try {
        let params = req.body;
        if (!params.email || !params.password) {
            return res.status(400).send({
                status: 'error',
                message: 'Complete all inputs'
            })
        }

        const userDB = await User.findOne({ email: params.email.toLowerCase() })
        if (!userDB) {
            return res.status(404).send({
                status: 'error',
                message: 'User not found'
            });
        }

        const validPassword = await bcrypt.compare(params.password, userDB.password)
        if (!validPassword) {
            return res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            })
        }

        const token = jwtService.createToken(userDB);

        return res.status(200).json({
            status: 'success',
            message: 'Login OK',
            token,
            userDB: {
                id: userDB._id,
                name: userDB.name,
                lastName: userDB.lastName,
                email: userDB.email,
            }
        })

    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error user authentication'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const requiredFields = [ 'name', 'lastName', 'email' ];
        const missingField = validateFields(req.body, requiredFields);
        if (missingField) {
            res.status(400);
            return next(new Error(`${missingField} es requerido`));
        }

        let existingUser = await User.findById( id );
        existingUser.set(req.body);
        const updatedUser = await existingUser.save();

        res.status(200).json({
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error user authentication'
        })
    }
}

module.exports = { getUsers, getUserById, createUser, login, updateUser };