const adminMiddleware = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                msg: "Access Denied. Admin Only"
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = adminMiddleware;