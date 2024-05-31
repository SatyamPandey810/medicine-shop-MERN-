async function userLogout(req, res) {
    try {
        res.clearCookies("token")

        res.json({
            message: "Logout successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}

module.exports=userLogout