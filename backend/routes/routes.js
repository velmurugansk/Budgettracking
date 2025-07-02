const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const {validateUser, verify} = require('../middlewares/sessionCheck');
const upload = require('../middlewares/uploadmiddleware');

const {userLogin, userRegister, userDetails, userLogout} = require('../controllers/authenticate');
const {addIncome, getallIncome, deleteIncome} = require('../controllers/incomeController');
const {deleteExpense, addExpense, getallExpense} = require('../controllers/expenseController');
const {dashboardData} = require('../controllers/dashboardController');


router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.post('/auth/logout', userLogout);
router.get('/user/list', validateUser, userDetails);
router.post('/income/add', validateUser, addIncome);
router.get('/income/list', validateUser, getallIncome);
router.post('/income/delete',validateUser, deleteIncome);
router.post('/expense/add', validateUser, addExpense);
router.get('/expense/list', validateUser, getallExpense);
router.post('/expense/delete',validateUser, deleteExpense);
router.get('/verify', verify);

router.post('/incomexpense/status',validateUser, dashboardData);

router.post('/upload/image', upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(200).json({status: false, message: 'No file uploaded!'});
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({status: true, imageurl : imageUrl});
});

module.exports = router;