import { HospitalEntry as HospitalEntryType } from "../types";
import { useStateValue } from "../state";
import WarningIcon from '@material-ui/icons/Warning';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    const style = {
        border: "2px solid grey"
    };

    return (
        <div style={style}>
            {entry.date} <WarningIcon style={{color: "orange"}}/> <br />
            {entry.description} <br />
            {entry.diagnosisCodes ? "diagnosis codes:" : null}
            {entry.diagnosisCodes ?
                <ul>
                    {entry.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}
                </ul>
                : null}
            <p>{entry.discharge ? `discharge date: ${entry.discharge.date}` : null}</p>
            <p>{entry.discharge ? `discharge criteria: ${entry.discharge.criteria}` : null}</p>
            diagnose by {entry.specialist}
        </div>
    );
};

export default HospitalEntry;