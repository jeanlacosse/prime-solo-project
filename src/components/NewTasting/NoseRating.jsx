import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '@mui/material/Button';


function NoseRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [noseRatingAndNotes, setNoseRatingAndNotes] = useState({
        noseRating: 5,
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
            <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
            <h3>Nose Rating</h3>
            <Popup
                trigger={
                    <Button
                        color="secondary"
                        variant="outlined">
                        How to Judge Nose</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge nose of wine:</h2>
                    <div>Things to look for:
                        <div>Cleanliness: Is the smell crisp or does it smell unclean?</div>
                        <div>Intensity: How intense is the smell of the wine? light - medium - pronounced </div>
                        <div>Aroma Characteristics: What does the wine smell like? Try to be specific. A wine can have many different aromas.
                        </div>
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
                        value={noseRatingAndNotes.noseRating}
                        onChange={event => setNoseRatingAndNotes({
                            ...noseRatingAndNotes, noseRating: (Number(event.target.value))
                        })}
                    />
                    Outstanding
                </div>

                <h5>{noseRatingAndNotes.noseRating}</h5>

                {/* text box for tasting notes */}
                <input
                    type="text"
                    placeholder='Notes on wines nose'
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