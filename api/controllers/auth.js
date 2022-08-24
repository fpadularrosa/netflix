const { tokenSign } = require("../helpers/generateToken");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const User = require("../models/User");

module.exports = {
    loginCtrl: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email });
            const tokenSession = await tokenSign(user);
            const passCorrect = await compare(password, user.password);
            
            !user && res.status(401).json({ error: 'El email indicado no está registrado.' })
            !passCorrect && res.status(401).json({ error: 'Credenciales inválidas.' })
            res.status(200).json({ success: true, data: { user, tokenSession } })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    registerCtrl: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await User.findOne({ email });
            const hash = await encrypt(password);
            const newUser = await User.create({ username, email, password: hash })
            
            user && res.status(400).json({ error: 'Este email ya está registrado.' });
            newUser && res.json({ success: true, data: newUser });
            res.status(400).json({ error: 'No se pudo crear el usuario' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}