
import Button from '@mui/material/Button';
import { useParams, Link, useHistory } from 'react-router-dom'

function TastingTipsList() {

    const history = useHistory();

    return (
        <>
            <h2>Tips on Wine Tasting</h2>
            <Button
                onClick={() => {
                    history.push('/appearance-tips');
                }}
                sx={{
                    height: '50px',
                    marginTop: '20px'
                }}
                type='submit'
                color="primary"
                size='large'
                variant="contained">
                How to Judge Appearance
            </Button>
            <Button
                onClick={() => {
                    history.push('/nose-tips');
                }}
                sx={{
                    height: '50px',
                    marginTop: '20px'
                }}
                type='submit'
                color="primary"
                size='large'
                variant="contained">
                How to Judge Nose
            </Button>
            <Button
                onClick={() => {
                    history.push('/palate-tips');
                }}
                sx={{
                    height: '50px',
                    marginTop: '20px'
                }}
                type='submit'
                color="primary"
                size='large'
                variant="contained">
                How to Judge Palate
            </Button>
            <Button
                onClick={() => {
                    history.push('/overall-tips');
                }}
                sx={{
                    height: '50px',
                    marginTop: '20px'
                }}
                type='submit'
                color="primary"
                size='large'
                variant="contained">
                How to Judge Wine Overall
            </Button>
            <div>
                <Button
                    sx={{
                        marginTop: "20px",
                        width: '25%',
                        height: '50px'
                    }}
                    className="button"
                    type="button"
                    color="primary"
                    onClick={() => history.push('/wine-journal')}
                    variant="outlined">
                    Home</Button>
            </div>

        </>
    )
};

export default TastingTipsList;