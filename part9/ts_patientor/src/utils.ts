import { Entry, Gender, NewPatient, newEntry, HealthCheckRating } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: pargeGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    }

    return newPatient;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date)
    }
    return date;
}

const isSsn = (ssn: string): boolean => {
    const regex = /\b\d{6}-[a-zA-Z0-9]*/;
    return regex.test(ssn)
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error("Incorrect or missing social security number");
    }
    return ssn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const pargeGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender)
    }
    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation)
    }
    return occupation;
}

export const isEntry = (entry: Entry): boolean => {
    if (entry.type !== "Hospital" || "HealthCheck" || "OccupationalHealthcare") {
        return false;
    };
    return true;
}

// const parseEntries = (entries: Entry[]) => {
//     entries.forEach(e => {
//         isEntry(e)
//     });
//     return entries;
// }


export const toNewEntry = (object: any): newEntry => {
    switch (object.type) {
        case "HealthCheck":
            const HealthCheckEntry: newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                type: object.type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
            return HealthCheckEntry;
        case "Hospital":
            const HospitalEntry: newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                type: object.type,
                discharge: object.discharge
            }
            return HospitalEntry;
        case "OccupationalHealthcare":
            const OccupationalHealthcareEntry: newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                type: object.type,
                employerName: parseName(object.employerName),
                sickLeave: object.sickLeave
            }
            return OccupationalHealthcareEntry;
        default:
            throw new Error(`Error trying to add entry: ${JSON.stringify(object)}`);
    }
}

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing occupation: " + description)
    }
    return description;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error("Incorrect or missing rating: " + rating)
    }
    return rating;
}