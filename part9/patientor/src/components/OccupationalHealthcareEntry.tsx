import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../types";
import WorkIcon from '@material-ui/icons/Work';
import { useStateValue } from "../state";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    const style = {
        border: "2px solid grey"
    };

    return (
        <div style={style}>
            {entry.date} <WorkIcon /> {entry.employerName} <br />
            {entry.description} <br />
            {entry.diagnosisCodes ?
                <ul>
                    {entry.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}
                </ul>
                : null}
            <p>{entry.sickLeave ? `sick leave begins on ${entry.sickLeave.startDate}` : null}</p>
            <p>{entry.sickLeave ? `sick leave ends on ${entry.sickLeave.endDate}` : null}</p>
            diagnose by {entry.specialist}
        </div>
    );
};

export default OccupationalHealthcareEntry;