const { SignJWT, jwtVerify } = require('jose');

module.exports = {
    tokenSign: async (user) => {
        const jwtConstructor = new SignJWT(
        {
            id: user.userId,
            role: user.role
        });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(encoder.encode(process.env.JWT_SECRET))
    
        return jwt;
    },
    verify: async (req, res, next) => {
        const { authorization } = req.headers
        if(!authorization) return res.status(401).json({ err: 'no authorized' });
        const encoder = new TextEncoder();
        try {
            const dataJWT = await jwtVerify(authorization, encoder.encode(process.env.JWT_SECRET));
            const role = dataJWT.payload.role;
            req.session.role = role;
            next();
        } catch (error) {
            res.status(400).json(error)
        }
    }
}