import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../App/App.css';

import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';

function SuccessPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    let [qrCode, setQrCode] = useState('');

    useEffect(() => {
        setQR();
        dispatch({ type: 'FETCH_RATINGS_AND_INFO', payload: id });
    }, [id])

    const allWineInfo = useSelector((store) => store.wineInfo.allInfoRatingsAndNotes);

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

    return (
        <>
            <h2>Wine Ratings For:</h2>
            <h3>{allWineInfo.vintage} {allWineInfo.winery_name} {allWineInfo.varietal} from {allWineInfo.region}</h3>
            <Divider />
            <h3>Appearance Ratings:</h3>

            <div className='body-text'>

                {/* slider for intensity */}
                <h4>Color Intensity</h4>
                <Slider
                    sx={{
                        width: '70%',
                        justifyContent: 'center'
                    }}
                    aria-label="Wine Rating"
                    valueLabelDisplay="auto"
                    readOnly
                    value={Number(allWineInfo.avg_appearance).toFixed(2)}
                />
                <span>Pale</span>
                <span style={{ marginRight: '75px', marginLeft: '75px' }}>Medium</span>
                <span>Deep</span>

                {/* slider for clarity */}
                <h4>Level of Clarity</h4>
                <Slider
                    sx={{
                        width: '70%',
                        justifyContent: 'center',
                        // marginTop: '15px'
                    }}
                    aria-label="Wine Rating"
                    valueLabelDisplay="auto"
                    readOnly
                    value={Number(allWineInfo.avg_clarity).toFixed(2)}
                />
                <span style={{ marginRight: '100px' }}>Hazy</span>
                <span style={{ marginLeft: '100px' }}>Clear</span>
                {/* shows all colors picked */}
                <div style={{ marginTop: '15px' }}>All Colors Picked</div>
                <div>
                    {allWineInfo.colors ?
                        allWineInfo.colors.map((color) => {
                            if (color === null) {
                                return;
                            }
                            else {
                                return (
                                    <input type="color"
                                        value={color}
                                        readOnly
                                    />
                                )
                            }

                        })
                        :
                        <div>loading...</div>
                    }
                </div>
                <div >
                    {/* this popup shows all notes */}
                    <Popup trigger={<Button
                        sx={{ color: '#41a641', borderColor: '#41a641' }}
                        size='small'
                        color="primary"
                        variant="outlined">
                        All Notes</Button>} modal><div className='popup'>{allWineInfo.appearnotes ?
                            allWineInfo.appearnotes.map((note) => {
                                return (
                                    <div>
                                        {note}
                                    </div>
                                )
                            })
                            :
                            <div>loading...</div>
                        }</div></Popup>
                </div>
            </div>
            <Divider
                sx={{ marginTop: '15px', marginBottom: '15px' }} />

            <h3>Aroma Ratings:</h3>
            <div className='body-text'>

                {/* slider for intensity */}
                <h4>Aroma Intensity</h4>
                <Slider
                    sx={{
                        width: '70%',
                        justifyContent: 'center'
                    }}
                    aria-label="Wine Rating"
                    valueLabelDisplay="auto"
                    readOnly
                    value={Number(allWineInfo.avg_nose).toFixed(2)}
                />
                <span>light</span>
                <span style={{ marginRight: '65px', marginLeft: '65px' }}>Medium</span>
                <span>Pronounced</span>


                <Popup trigger={<Button
                    sx={{ color: '#41a641', borderColor: '#41a641', marginTop: '15px' }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    All Aromas Picked</Button>} modal><div>
                        {allWineInfo.nosenotes ?
                            allWineInfo.nosenotes.map((note) => {
                                return (
                                    <div>
                                        {note}
                                    </div>
                                )
                            })
                            :
                            <div>loading...</div>
                        }
                    </div></Popup>
            </div>

            <Divider
                sx={{ marginTop: '15px', marginBottom: '15px' }} />

            <h3>Palate Ratings:</h3>
            <div className='body-text'>

                {/* slider for intensity */}
                <div>
                    <h4>Sweetness</h4>
                    <Slider
                        sx={{
                            width: '70%',
                            justifyContent: 'center'
                        }}
                        aria-label="Wine Rating"
                        valueLabelDisplay="auto"
                        readOnly
                        value={Number(allWineInfo.avg_palate).toFixed(2)}
                    />
                </div>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>dry</span>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>off-dry</span>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>medium-sweet</span>
                <span style={{ marginRight: '10px', marginLeft: '10px' }}>sweet</span>


                <h4>Acid Level</h4>
                <Slider
                    sx={{
                        width: '70%',
                        justifyContent: 'center'
                    }}
                    aria-label="Wine Rating"
                    valueLabelDisplay="auto"
                    readOnly
                    value={Number(allWineInfo.avg_acid).toFixed(2)}
                />
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>Low</span>
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>Medium</span>
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>High</span>

                <h4>Tannin Level</h4>
                <Slider
                    sx={{
                        width: '70%',
                        justifyContent: 'center'
                    }}
                    aria-label="Wine Rating"
                    valueLabelDisplay="auto"
                    readOnly
                    value={Number(allWineInfo.avg_tannin).toFixed(2)}
                />
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>Low</span>
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>Medium</span>
                <span style={{ marginRight: '40px', marginLeft: '40px' }}>High</span>


                <Popup trigger={<Button
                    sx={{ color: '#41a641', borderColor: '#41a641', marginTop: '15px' }}
                    size='small'
                    color="primary"
                    variant="outlined">
                    All Flavors Picked</Button>} modal><div className='popup'>
                        {allWineInfo.palatenotes ?
                            allWineInfo.palatenotes.map((note) => {
                                return (
                                    <div>
                                        {note}
                                    </div>
                                )
                            })
                            :
                            <div>loading...</div>
                        }
                    </div></Popup>
            </div>

            <Divider
                sx={{ marginTop: '15px', marginBottom: '15px' }} />

            <h3>Final Ratings:</h3>

            <Slider
                sx={{
                    width: '70%',
                    justifyContent: 'center'
                }}
                aria-label="Wine Rating"
                valueLabelDisplay="auto"
                readOnly
                value={Number(allWineInfo.avg_overall).toFixed(2)}
            />
            <span style={{ marginRight: '75px' }}>Poor</span>
            <span style={{ marginLeft: '75px' }}>Outstanding</span>

            <h2>{Number(allWineInfo.avg_overall).toFixed(2)}</h2>

            <Divider
                sx={{ marginTop: '15px', marginBottom: '15px' }} />

            <h5>Tasting with friends?
                <div>
                    <Popup
                        trigger={<Button
                            sx={{
                                marginTop: '15px'
                            }}
                            color="secondary"
                            variant="contained">
                            Share with QR Code</Button>} modal>
                        <div className='popup'><img src={qrCode} /></div>
                    </Popup>
                </div>
            </h5>
            <Button
                onClick={() => {
                    history.push('/wine-journal');
                }}
                sx={{
                    height: '50px'
                }}
                type='submit'
                color="primary"
                size='large'

                variant="contained">
                To Wine Journal</Button>

        </>
    )
};

export default SuccessPage;