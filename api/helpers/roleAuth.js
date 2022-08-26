const roleAuth = (role) => {
    return (req, res, next) => {
        if ((req.session.role && req.session.role === role) || (req.session.role === role[0] || req.session.role === role[1])) {
            next();
        } else return res.sendStatus(403);
    }
}

module.exports = roleAuth;