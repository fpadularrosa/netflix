const { encrypt } = require('../helpers/handleBcrypt');
const { Content, User } = require('../database');

module.exports = {
    patchUser: async (req, res) => {
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
    },
    getContent: async (req, res) => {
        const content = await Content.findAll()
        content && res.json(content);
    },
    getUsers: async (req, res) => {
        const users = await User.findAll()
        users && res.json(users);
    },
    postContent: async (req, res) => {
        const { title, img, desc, video, year, genre } = req.body
        if(title && img && desc && video && year && genre){
            const newContent = await Content.create({ title, img, desc, video, year, genre });
            newContent && res.json({ success: true, data: newContent });
        }else return res.status(400).json("You dont send all data.")
    },
    patchContent : async (req, res) => {
        if(req.body.password){
            const hash = await encrypt(req.body.password);
            req.body.password = hash
        }

        let contentupd = await Content.findByPk(req.params.id);
        contentupd.set({
            ...req.body
        });
        contentupd = await contentupd.save();
        contentupd && res.json({ success: true, contentupd});
    },
}