import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// material ui
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

function ReveiwPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        // this is to fetch wine detail for the id of teh url endpoint
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail);
    const wineRatingsAndNotes = useSelector((store) => store.wineInfo.wineRatingsAndNotes);

    function submitRatings() {
        dispatch({
            type: 'ADD-ALL-RATINGS',
            payload: wineRatingsAndNotes
        })
        // push to next page
        history.push(`/success-page/${id}`)
    }

    return (
        <>
            <h2>Review Your Tasting Notes</h2>
            {/* not yet adding in date until correct format */}
            {/* <div>Date tasted: {Date(wineInfo.date)}</div> */}
            <span>Wine tasted: {wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</span>
            <div>Scores</div>
            <div>Appearance {wineRatingsAndNotes.appearanceRating}
                <Popup trigger={<Button
                    sx={{
                        marginLeft: '15px',
                        color: '#41a641',
                        borderColor: '#41a641',
                        marginTop: '15px'
                    }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    Notes</Button>}><div className='popup'>{wineRatingsAndNotes.appearanceNotes}</div></Popup>
            </div>
            <div>Nose {wineRatingsAndNotes.noseRating}
                <Popup trigger={<Button
                    sx={{
                        marginLeft: '15px',
                        color: '#41a641',
                        borderColor: '#41a641',
                        marginTop: '15px'
                    }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    Notes</Button>}><div className='popup'>{wineRatingsAndNotes.noseNotes}</div></Popup>
            </div>
            <div>Palate {wineRatingsAndNotes.palateRating}
                <Popup trigger={<Button
                    sx={{
                        marginLeft: '15px',
                        color: '#41a641',
                        borderColor: '#41a641',
                        marginTop: '15px'
                    }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    Notes</Button>}><div className='popup'>{wineRatingsAndNotes.palateNotes}</div></Popup>
            </div>
            <div>Overall {wineRatingsAndNotes.overallRating}
                <Popup trigger={<Button
                    sx={{
                        marginLeft: '15px',
                        color: '#41a641',
                        borderColor: '#41a641',
                        marginTop: '15px'
                    }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    Notes</Button>}><div className='popup'>{wineRatingsAndNotes.overallNotes}</div></Popup>
            </div>
            <span>
                {/* this will add the wine to the favorites list */}
                <IconButton
                    sx={{
                        marginRight: '8px',
                        width: '25%',
                        height: '50px',
                        marginTop: '15px'
                    }}
                    className="button"
                    type="button"
                    color="primary"
                    onClick={() => dispatch({ type: 'FAVORITE_WINE_ITEM', payload: id })}
                    variant="outlined">
                    <FavoriteIcon /></IconButton>
                    
                    {/* this will send the ratings to the db via sagas */}
                <Button
                    sx={{
                        marginLeft: '8px',
                        width: '25%',
                        height: '50px',
                        marginTop: '15px',
                        
                    }}
                    onClick={submitRatings}
                    color="primary"

                    variant="contained">
                    Submit Rating</Button>
                
               
            </span>

        </>
    )
};

export default ReveiwPage;