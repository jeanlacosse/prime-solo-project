import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import '../App/App.css';


function NoseRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [noseRatingAndNotes, setNoseRatingAndNotes] = useState({
        noseRating: 50,
        noseNotes: ''
    });

    useEffect(() => {
        // this is to fetch wine detail for the id of teh url endpoint
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

    const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_NOSE_INFO',
            payload: noseRatingAndNotes
        })
        // push to next page
        history.push(`/palate-rating/${id}`)
    }


    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Nose Rating</h3>
            <Popup
                trigger={
                    <Button
                        color="secondary"
                        variant="outlined">
                        How to Judge Nose</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge nose of wine:</h2>
                    <div className='body-text'>Things to look for:
                        <div className='body-text'>Cleanliness: Is the smell crisp or does it smell unclean?</div>
                        <div className='body-text'>Intensity: How intense is the smell of the wine? light - medium - pronounced </div>
                        <div className='body-text'>Aroma Characteristics: What does the wine smell like? Try to be specific. A wine can have many different aromas.
                        </div>
                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <div>
                <Slider
                        sx={{
                            width: '60%',
                            justifyContent: 'center'
                        }}
                        aria-label="Wine Rating"
                        defaultValue={50}

                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        value={noseRatingAndNotes.noseRating}
                        onChange={event => setNoseRatingAndNotes({
                            ...noseRatingAndNotes, noseRating: (Number(event.target.value))
                        })}
                    />
                    
                </div>
                <span className='poor'>Poor</span>
                <span className='outstanding'>Outstanding</span>

                <h2>{noseRatingAndNotes.noseRating}</h2>

                {/* text box for tasting notes */}
                <TextField
                    sx={{
                        marginBottom: '20px',
                        width: '75%',
                    }}
                    multiline
                    rows={3}
                    type="text"
                    label="Notes on wine nose"
                    variant="outlined"
                    onChange={event => setNoseRatingAndNotes({
                        ...noseRatingAndNotes, noseNotes: (event.target.value)
                    })}
                />
                <div>
                    <Button
                        sx={{
                            marginRight: '8px',
                            width: '25%',
                            height: '50px'
                        }}
                        className="button"
                        type="button"
                        color="primary"
                        onClick={() => history.push(`/appearance-rating/${wineInfo.id}`)}
                        variant="outlined">
                        Back</Button>
                    <Button
                        sx={{
                            marginLeft: '8px',
                            width: '25%',
                            height: '50px'
                        }}
                        type='submit'
                        color="primary"

                        variant="contained">
                        Next</Button>
                </div>

                {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            </form>
        </>
    )
};

export default NoseRating;