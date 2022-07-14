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


function OverallRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [overallRatingAndNotes, setOverallRatingAndNotes] = useState({
        overallRating: 50,
        overallNotes: '',
        journal_entry_id: id
    });

    useEffect(() => {
        // this is to fetch wine detail for the id of the url endpoint
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

    const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_OVERALL_INFO',
            payload: overallRatingAndNotes
        })
        // push to next page
        history.push(`/review-page/${wineInfo.id}`)
    }


    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Final/Overall Rating</h3>
            <Popup
                trigger={<Button
                    color="secondary"
                    variant="outlined">
                    How to Judge Overall Score</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge a wines overall score:</h2>
                    <div className='body-text'>Things to look for:
                        <div className='body-text'>Quality level: How does the wine hold up to all the ratings given?</div>
                        <div className='body-text'>faulty - poor - acceptable - good - very good - outstanding</div>
                        <div className='body-text'>Level of readiness:
                            too young - can drink now, but has potential for ageing - drink now, not suitable for ageing - too old
                        </div>
                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <div className='body-text'>
                    <h4>Considering all previous factors, how would you rate this wine?</h4>
                    <div>
                        <Slider
                            sx={{
                                width: '70%',
                                justifyContent: 'center'
                            }}
                            aria-label="Wine Rating"
                            defaultValue={50}

                            valueLabelDisplay="auto"
                            step={5}
                            min={0}
                            max={100}
                            value={overallRatingAndNotes.overallRating}
                            onChange={event => setOverallRatingAndNotes({
                                ...overallRatingAndNotes, overallRating: (Number(event.target.value))
                            })}
                        />

                    </div>
                    <span style={{marginRight: '75px'}}>Poor</span>
                    <span style={{marginLeft: '75px'}}>Outstanding</span>

                    <h2>{overallRatingAndNotes.overallRating}</h2>

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
                            onClick={() => history.push(`/palate-rating/${wineInfo.id}`)}
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
                </div>

                {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            </form>
        </>
    )
};

export default OverallRating;