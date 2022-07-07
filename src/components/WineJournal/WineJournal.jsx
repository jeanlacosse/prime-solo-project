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


    function deleteListItem() {

    }

    function favoriteListItem() {
        
    }

    return (
        <>
        <h1>made it to journal page</h1>
        {allWines.map((wineItem) => {
            return (
                <div key={wineItem.id}
                onClick={() => {
                    history.push(`/success-page/${wineItem.id}`)
                }}
                >
                    {wineItem.date}
                    {wineItem.winery_name}
                    {wineItem.varietal}
                    {Number(wineItem.avg_overall).toFixed(2)}
                    <button 
                    onClick={deleteListItem}
                    >delete icon
                    </button>
                    <button 
                    onClick={favoriteListItem}
                    >favorite icon
                    </button>
                </div>
            )
        })}
        </>
    )
};

export default WineJournal;