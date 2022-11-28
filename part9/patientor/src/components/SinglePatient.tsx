import { Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useEffect } from "react";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import React from "react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const SinglePatient = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();   // this gets the id from the url

    const patient = Object.values(patients).find(
        (patient: Patient) => patient.id === id
    );

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        if (patient && id) {
            try {
                const { data: newEntry } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                dispatch(updatePatient({ ...patient, entries: [...patient.entries, newEntry] }));
                closeModal();

            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
        else {
            throw new Error("Error: Patient doesnt exist or id is incorrect");
        }
    };

    useEffect(() => {
        const fetchPatient = async () => {
            if (patient && id) {
                try {
                    const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                    dispatch(updatePatient(patientFromApi));
                    console.log("fetched: ", patientFromApi);
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                throw new Error("Error: Patient doesnt exist or id is incorrect");
            }
        };

        // since patients from the backend have ssn and patients in the app state don't, we'll use
        // ssn property to check whether we should fetch a patient or not
        if (patient && !Object.prototype.hasOwnProperty.call(patient, "ssn")) {
            fetchPatient().catch(e => console.error(e));
        }
    }, [id, patient]);  // patients must be here or else if user refreshes while in single patient page, info from backend disappears

    if (patient) {
        return (
            <div>
                <h2>{patient.name}</h2>
                gender: {patient.gender} <br />
                ssn: {patient.ssn} <br />
                occupation: {patient.occupation} <br />

                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>

                {patient.entries && patient.entries.length > 0 ? <h3>entries</h3> : null}
                {patient.entries
                    ? patient.entries.map(e => {
                        return (
                            <EntryDetails key={e.id} entry={e} />
                        );
                    })
                    : null
                }
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
            </div>
        );
    }
    return null;
};

export default SinglePatient;