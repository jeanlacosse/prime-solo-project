import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

// all favorites will be shown here from the list
function Favorites() {

    const history = useHistory();
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WINES' })
    }, [])

    const allWines = useSelector(store => store.wineInfo.allWinesList);

    // this will only display a wine if it has bee npreviously favorited
    return (
        <>
        <h2>My Favorite Wines</h2>
        {allWines.map((wineItem) => {
            if (wineItem.favorited === true) {
            return (
                <div key={wineItem.id}
                onClick={() => history.push(`/success-page/${wineItem.id}`)}>
                    {wineItem.date}
                    {wineItem.winery_name}
                    {wineItem.varietal}
                    {Number(wineItem.avg_overall).toFixed(2)}
                    <button 
                    onClick={() => dispatch({ type: 'DELETE_WINE_ITEM', payload: wineItem.id })}
                    >delete icon
                    </button>
                </div>
            )}
        })}
        <button 
        onClick={() => history.push('/wine-journal')}
        >Back to Journal</button>
        </>
    )
};

export default Favorites;