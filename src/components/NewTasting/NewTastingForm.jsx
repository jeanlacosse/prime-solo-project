import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../App/App.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
            <h2>Begin the tasting by entering some basic information about the wine below.</h2>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={(event) => addWineInformation(event)}

            >
                <div>
                    <TextField
                        required
                        name="winery_name"
                        type='text'
                        label="Winery Name"
                        variant="standard"
                        onChange={handleWineInfo}
                        value={newWineInfo.winery_name}
                    />
                    <TextField
                        required
                        name="varietal"
                        
                        type='text'
                        label="Varietal of Grape"
                        variant="standard"
                        onChange={handleWineInfo}
                        value={newWineInfo.varietal}
                    />
                    <TextField
                        required
                        name="vintage"
                        
                        type='text'
                        label="Vintage/Year Produced"
                        variant="standard"
                        onChange={handleWineInfo}
                        value={newWineInfo.vintage}
                    />
                    <TextField
                        required
                        name="region"
                        
                        type='text'
                        label="Region Produced"
                        variant="standard"
                        onChange={handleWineInfo}
                        value={newWineInfo.region}
                    />
                </div>
                <Button
                    sx={{
                        marginLeft: '25px',
                        marginTop: '25px'
                    }}
                    className="button"
                    size="large"
                    type="button"
                    color="primary"
                    onClick={() => history.push('/wine-journal')}
                    variant="outlined">
                    Back</Button>
                <Button
                    sx={{
                        marginLeft: '15px',
                        marginTop: '25px'
                    }}
                    type='submit'
                    color="primary"
                    size="large"

                    variant="contained">
                    Start Rating</Button>
            </Box>
           

        </>
    )
};

export default NewTastingForm;