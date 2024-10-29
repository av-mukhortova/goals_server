const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllGoals = () => {
    try {
        return DB.goals;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneGoal = (goalId) => {
    try {
        const goal = DB.goals.find(
            (goal) => goal.id === goalId
        );
        if (!goal) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return goal;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        };
    }
};

const createNewGoal = (newGoal) => {
    const isAlreadyAdded =
        DB.goals.findIndex(
            (goal) => goal.name === newGoal.name
        ) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Goal with the name '${newGoal.name}' already exists`,
        };
    }
    try {
        DB.goals.push(newGoal);
        saveToDatabase(DB);
        return newGoal;
    } catch(error) {
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

const updateOneGoal = (goalId, changes) => {
    try {
        const isAlreadyAdded =
            DB.goals.findIndex(
                (goal) => goal.name === changes.name
            ) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Goal with the name '${changes.name}' already exists`,
            };
        }
        const indexForUpdate = DB.goals.findIndex(
            (goal) => goal.id === goalId
        );
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find goal with the id '${goalId}'`,
            };
        }
        const updatedGoal = {
            ...DB.goals[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', {
                timeZone: 'UTC',
            }),
        };
        DB.goals[indexForUpdate] = updatedGoal;
        saveToDatabase(DB);
        return updatedGoal;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        };
    }
};

const deleteOneGoal = (goalId) => {
    try {
        const indexForDeletion = DB.goals.findIndex(
            (goal) => goal.id === goalId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        DB.goals.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        };
    }
};

module.exports = { getAllGoals, getOneGoal, createNewGoal, updateOneGoal, deleteOneGoal };