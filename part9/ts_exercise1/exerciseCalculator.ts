interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exercises: Array<number>, target: number): Result => {
    const sum = exercises.reduce((a, b) => a + b, 0);
    const average = sum / exercises.length;

    const ratings = {
        1: "not very good, try harder",
        2: "not too bad but could be better",
        3: "excellent!"
    };

    let rating;

    if ((average / target) * 100 < 50) {
        rating = 1;
    }
    else if ((average / target) * 100 < 100) {
        rating = 2;
    }
    else {
        rating = 3;
    }

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(day => day > 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratings[rating as keyof typeof ratings],
        target: target,
        average: average
    };
};