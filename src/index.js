const express = require('express');
const bodyParser = require('body-parser');
const v1GoalRouter = require('./v1/routes/goalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1/goals', v1GoalRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});