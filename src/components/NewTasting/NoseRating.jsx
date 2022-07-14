import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App/App.css';

const aromas = [ 'Citrus', 'Rose', 'Lime', 'Orange', 'Lavender', 'Apple', 'Peach', 'Pear', 'Apricot', 'Mango', 'Lychee', 'Plum', 'Cherry', 'Strawberry', 'Raspberry', 'Blackberry', 'Olive', 'Fig', 'Ginger', 'Pepper', 'Mint', 'Thyme', 'Anise', 'Cinnamon', 'Fennel', 'Grass', 'Tomato', 'Clay', 'Beets', 'Soil', 'Gravel', 'Petroleum', 'Butter', 'Sourdough', 'Mushroom', 'Vanilla', 'Coconut', 'Smoke', 'Cocoa']
const ITEM_HEIGHT = 75;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function NoseRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [noseRatingAndNotes, setNoseRatingAndNotes] = useState({
        noseRating: 50,
        noseNotes: []
    });

    const handleChange = (event) => {
        setNoseRatingAndNotes({
                ...noseRatingAndNotes, noseNotes: (event.target.value)
            })
      };

    useEffect(() => {
        // this is to fetch wine detail for the id of the url endpoint
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

    const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_NOSE_INFO',
            payload: noseRatingAndNotes
        })
        // push to next page
        history.push(`/palate-rating/${id}`)
    }


    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Aroma Ratings</h3>
            <Popup
                trigger={
                    <Button
                        color="secondary"
                        variant="outlined">
                        How to Judge Aroma</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge nose of wine:</h2>
                    <div className='body-text'>Things to look for:
                        <div className='body-text'>Cleanliness: Is the smell crisp or does it smell unclean?</div>
                        <div className='body-text'>Intensity: How intense is the smell of the wine? light - medium - pronounced </div>
                        <div className='body-text'>Aroma Characteristics: What does the wine smell like? Try to be specific. A wine can have many different aromas.
                        </div>
                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>

                <div className='body-text'>
                    {/* text box for tasting notes and dropdowns for a few starter ideas*/}
                    <div style={{marginTop: '15px'}}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel>Pick a few wine aromas</InputLabel>
                            <Select
                                multiple
                                value={noseRatingAndNotes.noseNotes}
                                onChange={handleChange}
                                // onChange={event => setNoseRatingAndNotes({
                                //     ...noseRatingAndNotes, noseNotes: (event.target.value)
                                // })}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {aromas.map((aroma) => (
                                    <MenuItem
                                        key={aroma}
                                        value={aroma}
                                    >
                                        {aroma}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {/* <TextField
                        sx={{
                            marginBottom: '20px',
                            marginTop: '20px',
                            width: '75%',
                        }}
                        multiline
                        rows={1}
                        type="text"
                        label="Other aromas found in the wine..."
                        variant="outlined"
                        onChange={handleChange}
                        // onChange={event => setNoseRatingAndNotes({
                        //     ...noseRatingAndNotes, noseNotes: (event.target.value)
                        // })}
                    /> */}
                    <Divider sx={{ marginTop: '15px' }} />

                    {/* slider input to change appearance rating */}
                    <div style={{ marginTop: '15px' }}>
                        <span>How intense are the aromas?</span>
                        <Slider
                            sx={{
                                width: '70%',
                                justifyContent: 'center'
                            }}
                            aria-label="Wine Rating"
                            defaultValue={50}
                            step={5}
                            min={0}
                            max={100}
                            value={noseRatingAndNotes.noseRating}
                            onChange={event => setNoseRatingAndNotes({
                                ...noseRatingAndNotes, noseRating: (Number(event.target.value))
                            })}
                        />
                        <span>Light</span>
                        <span style={{ marginRight: '65px', marginLeft: '65px' }}>Medium</span>
                        <span>Pronounced</span>
                    </div>
                    <Divider sx={{ marginTop: '15px' }} />




                    <div style={{ marginTop: '15px' }}>
                        <Button
                            sx={{
                                marginRight: '8px',
                                width: '25%',
                                height: '50px'
                            }}
                            className="button"
                            type="button"
                            color="primary"
                            onClick={() => history.push(`/appearance-rating/${wineInfo.id}`)}
                            variant="outlined">
                            Back</Button>
                        <Button
                            sx={{
                                marginLeft: '8px',
                                width: '25%',
                                height: '50px'
                            }}
                            type='submit'
                            color="primary"

                            variant="contained">
                            Next</Button>
                    </div>
                </div>

                {/* back btn will go to wine inputs page again
            is there a way to keep form resubmission here? */}
            </form>
        </>
    )
};

export default NoseRating;