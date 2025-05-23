const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const {validateUser} = require('../middlewares/sessionCheck');

const {userLogin, userRegister} = require('../controllers/authenticate');
const {addIncome, getallIncome, deleteIncome} = require('../controllers/incomeController');
const {deleteExpense, addExpense, getallExpense} = require('../controllers/expenseController');
const {dashboardData} = require('../controllers/dashboardController')

router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.post('/income/add', validateUser, addIncome);
router.get('/income/list', validateUser, getallIncome);
router.post('/income/delete',validateUser, deleteIncome);
router.post('/expense/add', validateUser, addExpense);
router.get('/expense/list', validateUser, getallExpense);
router.post('/expense/delete',validateUser, deleteExpense);

router.post('/incomexpense/status',validateUser, dashboardData);

module.exports = router;