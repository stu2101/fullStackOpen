import { HealthCheckEntry as HealthCheckEntryType } from "../types";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useStateValue } from "../state";

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    const style = {
        border: "2px solid grey"
    };

    const getFavoriteIcon = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return (<FavoriteIcon style={{ color: 'green' }} />);
            case 1:
                return (<FavoriteIcon style={{ color: 'yellow' }} />);
            case 2:
                return (<FavoriteIcon style={{ color: 'orange' }} />);
            case 3:
                return (<FavoriteIcon style={{ color: 'red' }} />);
        }
    };

    return (
        <div style={style}>
            {entry.date} <LocalHospitalIcon /> <br />
            {entry.description} <br />
            {getFavoriteIcon()} <br />
            {entry.diagnosisCodes ? "diagnosis codes:" : null}
            {entry.diagnosisCodes ?
                <ul>
                    {entry.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}
                </ul>
                : null}
            diagnose by {entry.specialist}
        </div>
    );
};

export default HealthCheckEntry;