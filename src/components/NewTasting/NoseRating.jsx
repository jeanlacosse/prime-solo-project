import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function NoseRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    
    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [appearanceRatingAndNotes, setAppearanceRatingAndNotes] = useState({
        appearanceRating: 5,
        appearanceNotes: ''
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
            type: 'ADD_APPEARANCE_INFO',
            payload: appearanceRatingAndNotes
        })
        // push to next page, do I need to do a url thing?
        history.push(`/nose-rating/${wineInfo.id}`)
      }

/*TODO
[x] useeffect to fetch wine detail
[x]use store to display wine infor at top of page
[x] create button for tips - no link yet
[] 1-10 slider create, set to local state
[] notes section input create, set to same local state or to store via a non saga dispatch
[] back button to go to wine inputs again,
[] next button goes to nose-rating
*/

    return (
        <>
        <h4>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h4>
        <h3>Appearance Rating</h3>
        {/* need to link this button to tips when I build out the tips page */}
        <button><Link to=""> 
        Tips on Evaluating Appearance
        </Link></button>
        <form onSubmit={(event) => addNotesAndRating(event)}>
            {/* slider input to change appearance rating */}
            <input 
            type="range"
            min='0'
            max='10'
            value={appearanceRatingAndNotes.appearanceRating} 
            onChange={event => setAppearanceRatingAndNotes({
                ...appearanceRatingAndNotes, appearanceRating: (Number(event.target.value))
            })}
            />
            <h5>{appearanceRatingAndNotes.appearanceRating}</h5>

            {/* text box for tasting notes */}
            <input 
            type="text"
            placeholder='Notes on wines appearance'
            onChange={event => setAppearanceRatingAndNotes({
                ...appearanceRatingAndNotes, appearanceNotes: (event.target.value)
            })}
            />
            <button type='submit'>Next</button>
            {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            <button 
            onClick={() => {history.push('/new-tasting')}}
            >Back</button>
        </form>
        </>
    )
};

export default NoseRating;