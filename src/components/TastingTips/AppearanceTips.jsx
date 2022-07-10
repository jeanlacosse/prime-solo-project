import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App/App.css';

import Button from '@mui/material/Button';


function AppearanceTips() {

    const history = useHistory();

    return (
        <>
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
            <Button
                    sx={{
                        marginTop: "20px",
                        width: '25%',
                        height: '50px'
                    }}
                    className="button"
                    type="button"
                    color="primary"
                    onClick={() => history.push('/tasting-tips')}
                    variant="outlined">
                    Back</Button>
            
        </>
    )
};

export default AppearanceTips; 