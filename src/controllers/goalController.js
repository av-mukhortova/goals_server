const goalService = require('../services/goalService');

const getAllGoals = (req, res) => {
    try {
        const allGoals = goalService.getAllGoals();
        res.send({ status: 'OK', data: allGoals });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

const getOneGoal = (req, res) => {
    const {
        params: { goalId },
    } = req;
    if (!goalId) {
        return;
    }
    try {
        const goal = goalService.getOneGoal(goalId);
        res.send({ status: 'OK', data: goal });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

const createNewGoal = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.deadline
    ) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'name', 'deadline'",
            },
        });
        return;
    }
    const newGoal = {
        name: body.name,
        deadline: body.deadline,
    };
    try {
        const createdGoal = goalService.createNewGoal(
            newGoal
        );
        res.status(201).send({
            status: 'OK',
            data: createdGoal,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

const updateOneGoal = (req, res) => {
    const {
        body,
        params: { goalId },
    } = req;
    if (!goalId) {
        return;
    }
    try {
        const updatedGoal = goalService.updateOneGoal(
            goalId,
            body
        );
        res.send({ status: 'OK', data: updatedGoal });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

const deleteOneGoal = (req, res) => {
    const {
        params: { goalId },
    } = req;
    if (!goalId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':goalId' can not be empty",
            },
        });
    }
    try {
        goalService.deleteOneGoal(goalId);
        res.status(204).send({ status: 'OK' });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

module.exports = {
    getAllGoals,
    getOneGoal,
    createNewGoal,
    updateOneGoal,
    deleteOneGoal,
};