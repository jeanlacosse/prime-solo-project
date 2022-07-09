import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '@mui/material/Button';


function PalateRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [palateRatingAndNotes, setPalateRatingAndNotes] = useState({
        palateRating: 5,
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
            <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
            <h3>Palate Rating</h3>
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
                <div>Poor
                <input
                    type="range"
                    min='0'
                    max='10'
                    value={palateRatingAndNotes.palateRating}
                    onChange={event => setPalateRatingAndNotes({
                        ...palateRatingAndNotes, palateRating: (Number(event.target.value))
                    })}
                />
                Outstanding
                </div>
                <h5>{palateRatingAndNotes.palateRating}</h5>

                {/* text box for tasting notes */}
                <input
                    type="text"
                    placeholder='Notes on wines palate'
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