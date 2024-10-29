const express = require('express');
const goalController = require('../../controllers/goalController');

const router = express.Router();

router.get('/', goalController.getAllGoals);

router.get('/:goalId', goalController.getOneGoal);

router.post('/', goalController.createNewGoal);

router.patch(
    '/:goalId',
    goalController.updateOneGoal
);

router.delete(
    '/:goalId',
    goalController.deleteOneGoal
);

module.exports = router;