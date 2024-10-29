const { v4: uuid } = require('uuid');
const Goal = require('../database/Goal');

const getAllGoals = () => {
    try {
        const allGoals = Goal.getAllGoals();
        return allGoals;
    } catch (error) {
        throw error;
    }
};

const getOneGoal = (goalId) => {
    try {
        const goal = Goal.getOneGoal(goalId);
        return goal;
    } catch (error) {
        throw error;
    }
};

const createNewGoal = (newGoal) => {
    const goalToInsert = {
        ...newGoal,
        id: uuid(),
        createdAt: new Date().toLocaleString('en-US', {
            timeZone: 'UTC',
        }),
        updatedAt: new Date().toLocaleString('en-US', {
            timeZone: 'UTC',
        }),
    };
    try {
        const createdGoal = Goal.createNewGoal(
            goalToInsert
        );
        return createdGoal;
    } catch(error) {
        throw error;
    }
};

const updateOneGoal = (goalId, changes) => {
    try {
        const updatedGoal = Goal.updateOneGoal(
            goalId,
            changes
        );
        return updatedGoal;
    } catch (error) {
        throw error;
    }
};

const deleteOneGoal = (goalId) => {
    try {
        Goal.deleteOneGoal(goalId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllGoals,
    getOneGoal,
    createNewGoal,
    updateOneGoal,
    deleteOneGoal,
};