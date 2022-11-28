export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type NewPatient = Omit<Patient, "id">

export type nonSensitivePatient = Omit<Patient, "ssn" | "entries">

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Discharge = {
    date: string;
    criteria: string
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: Discharge;
}

export type SickLeave = {
    startDate: string;
    endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type newEntry = UnionOmit<Entry, "id">;