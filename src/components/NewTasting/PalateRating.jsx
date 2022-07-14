import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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

const flavors = ['Fruity', 'Floral', 'Herbal', 'Cream', 'Bready', 'Earthy', 'Buttery', 'Vanilla', 'Nuttiness', 'Coffee', 'Tabacco', 'Oaky']
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


function PalateRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [palateRatingAndNotes, setPalateRatingAndNotes] = useState({
        palateRating: 50,
        acidRating: 50,
        tanninRating: 50,
        palateNotes: []
    });

    const handleChange = (event) => {
        setPalateRatingAndNotes({
                ...palateRatingAndNotes, palateNotes: (event.target.value)
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
            type: 'ADD_PALATE_INFO',
            payload: palateRatingAndNotes
        })
        // push to next page
        history.push(`/overall-rating/${id}`)
    }


    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Palate Rating</h3>
            <Popup
                trigger={<Button
                    color="secondary"
                    variant="outlined">
                    How to Judge Palate</Button>}
                modal>
                <div className='popup'>
                    <h2>How to judge palate of wine:</h2>
                    <div className='body-text'>Things to look for:
                        <div className='body-text'>Sweetness: dry - off-dry - medium-dry - medium-sweet - sweet - luscious</div>
                        <div className='body-text'>Acidity: low - medium - high</div>
                        <div className='body-text'>Tannin: low - medium - high</div>
                        <div className='body-text'>Alcohol: low - medium - high</div>
                        <div className='body-text'>Body: light - medium - full</div>
                        <div className='body-text'>Finish: short - medium - long</div>
                        <div className='body-text'>Flavour Characteristics: What does the wine taste like? Think sweet, salty, savory etc.</div>

                    </div>

                </div>
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                <div className='body-text'>
{/* Taste picker dropdown */}
                <div style={{marginTop: '15px'}}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel>Pick a few wine flavors</InputLabel>
                            <Select
                                multiple
                                value={palateRatingAndNotes.palateNotes}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {flavors.map((flavor) => (
                                    <MenuItem
                                        key={flavor}
                                        value={flavor}
                                    >
                                        {flavor}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

                    {/* slider input to change appearance rating */}
                    <div style={{ marginTop: '15px' }}>
                        <span>How sweet is the wine?</span>
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
                            value={palateRatingAndNotes.palateRating}
                            onChange={event => setPalateRatingAndNotes({
                                ...palateRatingAndNotes, palateRating: (Number(event.target.value))
                            })}
                        />

                    </div>
                    <span style={{ marginRight: '10px', marginLeft: '10px' }}>dry</span>
                    <span style={{ marginRight: '10px', marginLeft: '10px' }}>off-dry</span>
                    <span style={{ marginRight: '10px', marginLeft: '10px' }}>medium-sweet</span>
                    <span style={{ marginRight: '10px', marginLeft: '10px' }}>sweet</span>

                    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

                    {/* Begin acidity slider */}

                    <div>
                        <span>How acidic is the wine?</span>
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
                            value={palateRatingAndNotes.acidRating}
                            onChange={event => setPalateRatingAndNotes({
                                ...palateRatingAndNotes, acidRating: (Number(event.target.value))
                            })}
                        />

                    </div>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>Low</span>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>Medium</span>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>High</span>

                    {/* Begin Tannins slider */}

                    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

                    <div>
                        <span>How strong are the tannins?</span>
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
                            value={palateRatingAndNotes.tanninRating}
                            onChange={event => setPalateRatingAndNotes({
                                ...palateRatingAndNotes, tanninRating: (Number(event.target.value))
                            })}
                        />

                    </div>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>Low</span>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>Medium</span>
                    <span style={{ marginRight: '40px', marginLeft: '40px' }}>High</span>

                    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />


                    {/* text box for tasting notes */}
                    {/* <TextField
                    sx={{
                        marginBottom: '20px',
                        width: '75%',
                    }}
                    multiline
                    rows={1}
                    type="text"
                    label="Notes on wine palate"
                    variant="outlined"
                    onChange={event => setPalateRatingAndNotes({
                        ...palateRatingAndNotes, palateNotes: (event.target.value)
                    })}
                /> */}


                    <div>
                        <Button
                            sx={{
                                marginRight: '8px',
                                width: '25%',
                                height: '50px'
                            }}
                            className="button"
                            type="button"
                            color="primary"
                            onClick={() => history.push(`/nose-rating/${wineInfo.id}`)}
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

export default PalateRating;