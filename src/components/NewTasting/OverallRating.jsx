import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function OverallRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [overallRatingAndNotes, setOverallRatingAndNotes] = useState({
        overallRating: 5,
        overallNotes: '',
        journal_entry_id: id
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
            type: 'ADD_OVERALL_INFO',
            payload: overallRatingAndNotes
        })
        // push to next page
        history.push(`/review-page/${wineInfo.id}`)
    }


    return (
        <>
            <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
            <h3>Final/Overall Rating</h3>
            <Popup
                trigger={<button>How to Judge Appearance</button>}
                modal>
                <div className='popup'>
                    <h2>How to judge appearance of wine:</h2>
                    <div>Things to look for:
                        <div>Clarity: is it clear, hazy, somewhere in between? Is there any sediment?</div>
                        <div>Intensity: How deep is the color? Think on a scale of pale - medium - deep color </div>
                        <div>Color: What is the actual color of the wine? Try to be specific. Some colors to use are:
                            <div>White wine: lemon-green - lemon - gold - amber - brown</div>
                            <div>Rose wine: pink - salmon - orange</div>
                            <div>Red wine: purple - ruby - garnet - tawny - brown</div>
                        </div>
                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <input
                    type="range"
                    min='0'
                    max='10'
                    value={overallRatingAndNotes.overallRating}
                    onChange={event => setOverallRatingAndNotes({
                        ...overallRatingAndNotes, overallRating: (Number(event.target.value))
                    })}
                />
                <h5>{overallRatingAndNotes.overallRating}</h5>

                {/* text box for tasting notes */}
                <input
                    type="text"
                    placeholder='Notes on wine overall'
                    onChange={event => setOverallRatingAndNotes({
                        ...overallRatingAndNotes, overallNotes: (event.target.value)
                    })}
                />
                <button
                    onClick={() => { history.push(`/palate-rating/${wineInfo.id}`) }}
                >Back</button>
                <button type='submit'>Next</button>
                {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            </form>
        </>
    )
};

export default OverallRating;