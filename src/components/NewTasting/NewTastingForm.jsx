import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function NewTastingForm() {

    const dispatch = useDispatch();

    // this is the local state the wine information is stored inside
    let [newWineInfo, setNewWineInfo] = useState({})


    const handleWineInfo = (event) => {
        setNewWineInfo({
            ...newWineInfo, [event.target.name]: event.target.value
        })
    }
    const addWineInformation = (event) => {
        event.preventDefault();

        // this will dispatch the local state to the saga to be placed in store
    }

    // this will set todays date in the input field
    const today = new Date();
    const date = today.setDate(today.getDate());
    const todaysDate = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    
    return (
        <>
            <h2>Please enter the wines information below</h2>
            <form onSubmit={(event) => addWineInformation(event)}>
                {/* this will set the date to todays date on page load, changeable though */}

                < input 
                type="date" 
                name="date" 
                defaultValue = {todaysDate} 
                />

                <input
                    onChange={handleWineInfo}
                    name="winery_name"
                    type='text'
                    placeholder='Winery Name'
                    value={newWineInfo.winery_name}
                />

                <input
                    onChange={handleWineInfo}
                    name="varietal"
                    type='text'
                    placeholder='Varietal of Grape'
                    value={newWineInfo.varietal}
                />

                <input
                    onChange={handleWineInfo}
                    name="vintage"
                    type='text'
                    placeholder='Vintage/Year Produced'
                    value={newWineInfo.vintage}
                />

                <input
                    onChange={handleWineInfo}
                    name="region"
                    type='text'
                    placeholder='Region Wine Was Produced'
                    value={newWineInfo.region}
                />

                <button type='submit'>Next</button>
            </form>
        </>
    )
};

export default NewTastingForm;