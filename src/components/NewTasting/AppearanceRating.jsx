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
import '../App/App.css';


function AppearanceRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // This is local state to hold the rating and the comments to be sent to the Redux store
    const [appearanceRatingAndNotes, setAppearanceRatingAndNotes] = useState({
        appearanceRating: 50,
        clarityRating: 50,
        appearanceNotes: '',
        color: '#ad0303',
    });

    let [qrCode, setQrCode] = useState('');

    useEffect(() => {
        // this is to fetch wine detail for the id of the url endpoint
        setQR();
        dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
    }, [id]);

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

    // this will set the qr code to bring others to the beginning of the rating pages for this specific wine
    const setQR = () => {
        axios.get(`/api/wineInfo/${id}/qrCode`)
            .then(response => {
                setQrCode(response.data.qrCode);

            })
            .catch((err) => {
                console.error('problem setting QR code', err)
            })
    }

    const addNotesAndRating = (event) => {
        event.preventDefault();

        // sends local state to store, not sent through a saga yet
        dispatch({
            type: 'ADD_APPEARANCE_INFO',
            payload: appearanceRatingAndNotes
        })
        // push to next page
        history.push(`/nose-rating/${id}`)
    }

    return (
        <>
            <h3>{wineInfo.vintage} {wineInfo.winery_name} {wineInfo.varietal} from {wineInfo.region}</h3>
            <h3 className='rating-header'>Appearance Rating</h3>
            {/* popup for seeing wine tasting tips in a modal */}
            <Popup
                trigger={<Button
                    color="secondary"
                    variant="outlined">
                    How to Judge Appearance</Button>}
                modal>
                {/* <Box
                sx={{
                    width: 200,
                    height: 200
                }}> */}
                <div className='popup'>
                    <h2>How to judge appearance of wine:</h2>
                    <div className='body-text'>Things to look for:
                        <div className='body-text'>Clarity: is it clear, hazy, somewhere in between? Is there any sediment?</div>
                        <div className='body-text'>Intensity: How deep is the color? Think on a scale of pale - medium - deep color </div>
                        <div className='body-text'>Color: What is the actual color of the wine? Try to be specific. Some colors to use are:
                            <div className='body-text'>White wine: lemon-green - lemon - gold - amber - brown</div>
                            <div className='body-text'>Rose wine: pink - salmon - orange</div>
                            <div className='body-text'>Red wine: purple - ruby - garnet - tawny - brown</div>
                        </div>
                    </div>

                </div>
                {/* </Box> */}
            </Popup>
            <form onSubmit={(event) => addNotesAndRating(event)}>
                {/* slider input to change appearance rating */}
                <div className='body-text'>
                    <div
                        style={{ marginTop: '15px' }}>
                        <span >What color is the wine?
                            <input type="color"
                                style={{ marginLeft: '15px' }}
                                value={appearanceRatingAndNotes.color}
                                onChange={event => setAppearanceRatingAndNotes({
                                    ...appearanceRatingAndNotes, color: event.target.value
                                })}
                            />
                        </span>
                    </div>
                    <Divider />
                    <div style={{ marginTop: '15px' }}>
                        <span>How intense is the wine color?</span>
                        <Slider
                            sx={{
                                width: '70%',
                                justifyContent: 'center'
                            }}
                            aria-label="Wine Rating"
                            defaultValue={50}

                            // valueLabelDisplay="auto"
                            step={5}
                            // marks
                            min={0}
                            max={100}
                            value={appearanceRatingAndNotes.appearanceRating}
                            onChange={event => setAppearanceRatingAndNotes({
                                ...appearanceRatingAndNotes, appearanceRating: (Number(event.target.value))
                            })}
                        />
                        <span>Pale</span>
                        <span style={{ marginRight: '75px', marginLeft: '75px' }}>Medium</span>
                        <span>Deep</span>
                    </div>
                    <Divider />
                    <div style={{ marginTop: '15px' }}>
                        <span>What is the clarity of the wine?</span>
                        <Slider
                            sx={{
                                width: '70%',
                                justifyContent: 'center'
                            }}
                            aria-label="Wine Rating"
                            defaultValue={50}

                            // valueLabelDisplay="auto"
                            step={5}
                            // marks
                            min={0}
                            max={100}
                            value={appearanceRatingAndNotes.clarityRating}
                            onChange={event => setAppearanceRatingAndNotes({
                                ...appearanceRatingAndNotes, clarityRating: (Number(event.target.value))
                            })}
                        />
                        <span style={{ marginRight: '75px' }}>Hazy</span>
                        <span style={{ marginLeft: '75px' }}>Clear</span>
                    </div>
                </div>

                <Divider />
                {/* text box for tasting notes */}
                <TextField
                    sx={{
                        marginBottom: '20px',
                        marginTop: '20px',
                        width: '75%',
                    }}
                    multiline
                    rows={1}
                    type="text"
                    label="Other notes on wine appearance"
                    variant="outlined"
                    onChange={event => setAppearanceRatingAndNotes({
                        ...appearanceRatingAndNotes, appearanceNotes: (event.target.value)
                    })}
                />

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
                        onClick={() => history.push('/new-tasting')}
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
            </form>
            <h5>Tasting with Friends?
                <div>
                    <Popup
                        trigger={
                            <Button
                                sx={{
                                    marginTop: '15px'
                                }}
                                color="secondary"
                                variant="contained">
                                Share with QR Code</Button>
                        } modal>
                        <div className='popup'><img src={qrCode} /></div>
                    </Popup>
                </div>
            </h5>
        </>
    )
};

export default AppearanceRating;