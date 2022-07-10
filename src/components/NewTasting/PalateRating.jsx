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


function PalateRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [palateRatingAndNotes, setPalateRatingAndNotes] = useState({
        palateRating: 50,
        palateNotes: ''
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
            type: 'ADD_PALATE_INFO',
            payload: palateRatingAndNotes
        })
        // push to next page
        history.push(`/overall-rating/${id}`)
    }


    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Palate Rating</h3>
            <Popup
                trigger={<Button
                    color="secondary"
                    variant="outlined">
                    How to Judge Palate</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge palate of wine:</h2>
                    <div>Things to look for:
                        <div>Sweetness: dry - off-dry - medium-dry - medium-sweet - sweet - luscious</div>
                        <div>Acidity: low - medium - high</div>
                        <div>Tannin: low - medium - high</div>
                        <div>Alcohol: low - medium - high</div>
                        <div>Body: light - medium - full</div>
                        <div>Finish: short - medium - long</div>
                        <div>Flavour Characteristics: What does the wine taste like? Think sweet, salty, savory etc.</div>

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
                        value={palateRatingAndNotes.palateRating}
                        onChange={event => setPalateRatingAndNotes({
                            ...palateRatingAndNotes, palateRating: (Number(event.target.value))
                        })}
                    />
                    
                </div>
                <span className='poor'>Poor</span>
                <span className='outstanding'>Outstanding</span>

                <h2>{palateRatingAndNotes.palateRating}</h2>

                {/* text box for tasting notes */}
                <TextField
                    sx={{
                        marginBottom: '20px',
                        width: '75%',
                    }}
                    multiline
                    rows={3}
                    type="text"
                    label="Notes on wine palate"
                    variant="outlined"
                    onChange={event => setPalateRatingAndNotes({
                        ...palateRatingAndNotes, palateNotes: (event.target.value)
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
                        onClick={() => history.push(`/nose-rating/${wineInfo.id}`)}
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

export default PalateRating;