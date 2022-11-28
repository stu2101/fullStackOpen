import patients from "../../data/patients"
import { Patient, nonSensitivePatient, NewPatient, newEntry } from "../types"
import { v4 as uuidv4 } from 'uuid';


const getAll = (): Patient[] => {
    return patients;
}

const get = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const getNonSensitive = (): nonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        ...patient,
        id: uuidv4()
    }

    patients.push(newPatient)
    return newPatient;
}

const addEntry = (id: string, entry: newEntry) => {
    const patient = get(id);
    if (patient) {
        const newEntry = {...entry, id: uuidv4()};
        const newPatient = {...patient, entries: [...patient.entries, newEntry]}
        patients.splice(patients.indexOf(patient), 1, newPatient);
        return newEntry;
    }
    throw new Error("Error: patient doesn't exist");
}

export default {
    getAll,
    get,
    getNonSensitive,
    addPatient,
    addEntry
}