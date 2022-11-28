import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, HealthCheckOptions, SelectHealth, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating, Patient } from "../types";
import { useStateValue } from "../state";

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthOptions: HealthCheckOptions[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                healthCheckRating: HealthCheckRating.LowRisk,
                diagnosisCodes: undefined,
                type: "HealthCheck"

            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.healthCheckRating && values.healthCheckRating !== 0) {
                    errors.healthCheckRating = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date of entry"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description of entry"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Name"
                            name="specialist"
                            component={TextField}
                        />
                        <SelectHealth label="Health Rating" name="healthCheckRating" options={healthOptions} />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddPatientForm;
