import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

// material ui
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function WineJournal() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WINES' })
    }, [])

    const allWines = useSelector(store => store.wineInfo.allWinesList);

    return (
        <>
            <h2>All Previous Tastings</h2>
            {/* mapping over the wines array to display them all on the dom */}
            {allWines.map((wineItem) => {
                return (

                    <span key={wineItem.id}>
                        <div
                            onClick={() => history.push(`/success-page/${wineItem.id}`)}>
                            {/* <div>{date.year}</div> */}
                            <div>{wineItem.vintage}</div>
                            <div>{wineItem.winery_name}</div>
                            <div>{wineItem.varietal}</div>
                            <div>Overall Rating: {Number(wineItem.avg_overall).toFixed(2)}</div>
                        </div>
                        
                        <IconButton
                           
                            className="button"
                            type="button"
                            color="secondary"
                            onClick={() => dispatch({ type: 'DELETE_WINE_ITEM', payload: wineItem.id })}
                            variant="outlined">
                            <DeleteOutlineOutlinedIcon /></IconButton>
                        <IconButton
                            
                            className="button"
                            type="button"
                            color="primary"
                            onClick={() => dispatch({ type: 'FAVORITE_WINE_ITEM', payload: wineItem.id })}
                            variant="outlined">
                            <FavoriteIcon /></IconButton>
                    </span>

                )
            })}

        </>
    )
};

export default WineJournal;