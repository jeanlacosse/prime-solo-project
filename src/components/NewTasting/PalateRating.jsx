import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


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
                dispatch({ type: 'FETCH_WINE_DETAIL', payload: id});
      }, [ id ]);

      const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

      const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_PALATE_INFO',
            payload: palateRatingAndNotes
        })
        // push to next page
        history.push(`/overall-rating/${wineInfo.id}`)
      }


    return (
        <>
        <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
        <h3>Palate Rating</h3>
        {/* need to link this button to tips when I build out the tips page */}
        <button><Link to=""> 
        Tips on Evaluating Palate
        </Link></button>
        <form onSubmit={(event) => addNotesAndRating(event)}>
            {/* slider input to change appearance rating */}
            <input 
            type="range"
            min='0'
            max='10'
            value={palateRatingAndNotes.palateRating} 
            onChange={event => setPalateRatingAndNotes({
                ...palateRatingAndNotes, palateRating: (Number(event.target.value))
            })}
            />
            <h5>{palateRatingAndNotes.palateRating}</h5>

            {/* text box for tasting notes */}
            <input 
            type="text"
            placeholder='Notes on wines nose'
            onChange={event => setPalateRatingAndNotes({
                ...palateRatingAndNotes, palateNotes: (event.target.value)
            })}
            />
            <button 
            onClick={() => {history.push(`/nose-rating/${wineInfo.id}`)}}
            >Back</button>
            <button type='submit'>Next</button>
            {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
        </form>
        </>
    )
};

export default PalateRating;