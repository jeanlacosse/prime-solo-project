import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../App/App.css';

import Button from '@mui/material/Button';

function NewTastingForm() {

    const dispatch = useDispatch();
    const history = useHistory();


    // this creates a date for today to be saved in DB
    const today = new Date().toLocaleDateString('en-US')

    // this is the local state the wine information is stored inside
    const [newWineInfo, setNewWineInfo] = useState({
        date: today
    })


    const handleWineInfo = (event) => {
        setNewWineInfo({
            ...newWineInfo, [event.target.name]: event.target.value
        })
    }
    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

    const addWineInformation = (event) => {
        event.preventDefault();
        // this will dispatch the local state to the saga to be placed in store
        dispatch({
            type: 'ADD_WINE_INFO',
            payload: newWineInfo, history
        })
        console.log('wine id is:', wineInfo.id)
    }


    return (
        <>
            <h2>Please enter the wines information below</h2>
            <form onSubmit={(event) => addWineInformation(event)}>

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


                <Button
                    sx={{
                        marginLeft: '25px',
                    }}
                    className="button"
                    type="button"
                    color="primary"
                    onClick={() => history.push('/wine-journal')}
                    variant="outlined">
                    Back</Button>
                <Button
                    sx={{
                        marginLeft: '15px',
                    }}
                    type='submit'
                    color="primary"

                    variant="contained">
                    Start Rating</Button>
            </form>

        </>
    )
};

export default NewTastingForm;