const express = require('express');

const router = express.Router();
const userSignUpController = require('../controller/user-form/userSignUp')

router.post('/signup', userSignUpController)
// router.post('/example', async (req, res) => {
//     // const result = await someAsyncFunction();
//     res.send("result");
// });
// router.get('/', (req, res, next) => {
//     productData.find().then(result => {
//         res.status(200).json({
//             msg: "result"
//         })
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     })
// })



module.exports = router