const { encrypt } = require('../helpers/handleBcrypt');
const { Content, User } = require('../database');

module.exports = {
    updateCtrl: async (req, res) => {
        if(req.headers.authorization) {
            if(req.body.password){
                const hash = await encrypt(req.body.password);
                req.body.password = hash
            }

            let userupd = await User.findByPk(req.params.id);
            userupd.set({
                ...req.body
            });
            userupd = await userupd.save();
            if(userupd) return res.json(userupd);
        } else return res.status(400).json({ error: 'you can update only your account!' });
    },
    getContent: async (req, res) => {
    },
    getUsers: async (req, res) => {
        const query = req.query.new;
        if(req.user.role === 'admin'){
            const users = query ? await User.findAll() : null
            if(users) return res.json(users);
        } else return res.status(400).json({ error:'U dont have access for see users.'})
    }
}