import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function NewTastingForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    

    // this will set todays date in the calendar input field
    const today = new Date();
    const date = today.setDate(today.getDate());
    const todaysDate = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd


    // this is the local state the wine information is stored inside
    const [newWineInfo, setNewWineInfo] = useState({
        date: todaysDate
    })


    const handleWineInfo = (event) => {
        setNewWineInfo({
            ...newWineInfo, [event.target.name]: event.target.value
        })
    }

    const addWineInformation = (event) => {
        event.preventDefault();
        // this will dispatch the local state to the saga to be placed in store
        dispatch({
            type: 'ADD_WINE_INFO',
            payload: newWineInfo
        })
        // this will push to the ratings page
        // this page will be a link to the api endpoint for this specific wine
        // using /api/wineInfo/wine.id where wine id is grabbed from DB SQL
        // via an axios.get id and add 1 to it
        axios.get('/api/wineInfo/wine-id')
            .then(response => {
                // console.log('id response is', response.data.max + 1)
                history.push(`/appearance-rating/${response.data.max + 1}`)
            })
            .catch((error) => {
                console.error('error is', error)
            })
    }
    

    

    return (
        <>
            <h2>Please enter the wines information below</h2>
            <form onSubmit={(event) => addWineInformation(event)}>
                {/* this will set the date to todays date on page load, changeable though */}

                < input
                    type="date"
                    name="date"
                    defaultValue={todaysDate}
                    onChange={handleWineInfo}
                    required
                />

                <input
                    onChange={handleWineInfo}
                    name="winery_name"
                    type='text'
                    placeholder='Winery Name'
                    value={newWineInfo.winery_name}
                    required
                />

                <input
                    onChange={handleWineInfo}
                    name="varietal"
                    type='text'
                    placeholder='Varietal of Grape'
                    value={newWineInfo.varietal}
                    required
                />

                <input
                    onChange={handleWineInfo}
                    name="vintage"
                    type='number'
                    placeholder='Vintage/Year Produced'
                    value={newWineInfo.vintage}
                    required
                />

                <input
                    onChange={handleWineInfo}
                    name="region"
                    type='text'
                    placeholder='Region Wine Was Produced'
                    value={newWineInfo.region}
                    required
                />

                <button type='submit'>Next</button>
            </form>
            <button
                onClick={() => history.push('/home')}
            >Back</button>
        </>
    )
};

export default NewTastingForm;