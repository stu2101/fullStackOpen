import diagnoseData from "../../data/diagnoses.json";   // needs |  "resolveJsonModule": true  | in tsconfig
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnoseData;

const getDiagnoses = () => {
    return diagnoses;
}

export default {
    getDiagnoses
}