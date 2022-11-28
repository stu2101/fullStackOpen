import express from "express";
const app = express();
app.use(express.json())     // THIS NEEDS TO BE DONE TO ACCESS THE BODY!!!!!!

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator"

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    try {
        const height = req.query.height;
        const weight = req.query.weight;

        if (isNaN(Number(weight)) || isNaN(Number(height))) {
            res.send({ error: "malformatted parameters" });
        }

        res.send({ height, weight, bmi: calculateBmi(Number(height), Number(weight)) });
    }
    catch (error) {
        res.send({ error: "malformatted parameters" });
    }
});

app.post("/exercises", (req, res) => {
    const exercises = req.body.daily_exercises;
    const target = req.body.target;

    if (!exercises || !target) {
        res.status(400).send({error: "parameters missing"});
    }
    
    for (let i = 0; i < exercises.length; i++) {
        if (typeof exercises[i] !== "number") {
            res.status(400).send({error: "malformatted parameters"})
        }
    }

    if (isNaN(Number(target))) {
        res.status(400).send({error: "malformatted parameters"})
    }

    res.send(calculateExercises(exercises, target))
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});