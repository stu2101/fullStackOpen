export const calculateBmi = (height: number, weight: number): string => {

    if (isNaN(height) || isNaN(weight)) {
        throw new Error("Values should be numbers!");
    }

    const bmi = weight / (height / 100) ** 2;

    if (bmi < 18.5) {
        return "Low (underweight)";
    }
    else if (bmi < 25) {
        return "Normal (healthy weight)";
    }
    else if (bmi < 30) {
        return "High (overweight)";
    }
    else {
        return "Very high (obese)";
    }
};


