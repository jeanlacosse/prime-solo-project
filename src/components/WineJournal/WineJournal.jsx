import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function WineJournal() {

    const history = useHistory();
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WINES' })
    }, [])

    const allWines = useSelector(store => store.wineInfo.allWinesList);

    return (
        <>
        <h2>All Your Previous Tastings</h2>
        {/* mapping over the wines array to display them all on the dom */}
        {allWines.map((wineItem) => {
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
                    <button 
                    onClick={() => dispatch({ type: 'FAVORITE_WINE_ITEM', payload: wineItem.id }) }
                    >favorite icon
                    </button>
                </div>
            )
        })}
         <button>
                <Link to="/new-tasting">
                    Start a New Tasting
                </Link>
            </button>

            <button>
                <Link to="/tasting-tips">
                    Wine Tasting Tips
                </Link>
            </button>

            <button>
                <Link to="/favorites">
                    Favorited Wines
                </Link>
            </button>
        </>
    )
};

export default WineJournal;