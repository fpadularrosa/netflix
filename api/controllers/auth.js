const { tokenSign } = require("../helpers/handleJwt");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const User = require("../models/User");

module.exports = {
    loginCtrl: async (req, res) => {
        const { email, password } = req.body
        if(!email || !password) return res.status(400);
        const user = await User.findOne({ where:{ email } });
        if(!user) res.status(401).json({ error: 'El email indicado no está registrado.' });

        const tokenSession = await tokenSign(user);
        const passCorrect = await compare(password, user.password);
        
        if(!passCorrect) res.status(401).json({ error: 'Credenciales inválidas.' })
        else res.status(200).json({ success: true, data: { user, tokenSession } })
    },
    registerCtrl: async (req, res) => {
        const { username, email, password } = req.body
        if(!email || !password || !username) return res.status(400);
        const user = await User.findOne({ where:{ email } });
        if(user) return res.status(400).json({ error: 'Este email ya está registrado.' });
        
        const hash = await encrypt(password);
        const newUser = await User.create({ username, email, password: hash })
        newUser && res.json({ success: true, data: newUser });
    }
}