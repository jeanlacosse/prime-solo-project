import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


/*TODO
[x] fetch wine detail on page load
[x] grab ratings and notes from store
[x] show wineInfo and  scores on dom in a table
[] submit notes button
    [] runs saga to post to db
    [] history.push to success page
[] favorite btn to run saga to put to DB journal__entry favorited
[] no back btn yet
*/
function ReveiwPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        // this is to fetch wine detail for the id of teh url endpoint
                dispatch({ type: 'FETCH_WINE_DETAIL', payload: id});
      }, [ id ]);

      const wineInfo = useSelector((store) => store.wineInfo.wineDetail);
      const wineRatingsAndNotes = useSelector((store) => store.wineInfo.wineRatingsAndNotes);

    return(
        <>
        <h2>Review Your Tasting Notes</h2>
        <div>Date tasted: {Date(wineInfo.date)}</div>
        <span>Wine tasted: {wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</span>
        <div>Scores</div>
        <div>Appearance {wineRatingsAndNotes.appearanceRating}
        <Popup trigger={<button>Notes</button>}><div className='popup'>{wineRatingsAndNotes.appearanceNotes}</div></Popup>
        </div>
        <div>Nose {wineRatingsAndNotes.noseRating}
        <Popup trigger={<button>Notes</button>}><div className='popup'>{wineRatingsAndNotes.noseNotes}</div></Popup>
        </div>
        <div>Palate {wineRatingsAndNotes.palateRating}
        <Popup trigger={<button>Notes</button>}><div className='popup'>{wineRatingsAndNotes.palateNotes}</div></Popup>
        </div>
        <div>Overall {wineRatingsAndNotes.overallRating}
        <Popup trigger={<button>Notes</button>}><div className='popup'>{wineRatingsAndNotes.overallNotes}</div></Popup>
        </div>
        </>
    )
};

export default ReveiwPage;