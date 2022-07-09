import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';


function AppearanceTips() {

    const history = useHistory();

    return (
        <>
            <h2>How to judge appearance of wine:</h2>
            <div>Things to look for: 
                <div>Clarity: is it clear, hazy, somewhere in between? Is there any sediment?</div>
                <div>Intensity: How deep is the color? Think on a scale of pale - medium - deep color </div>
                <div>Color: What is the actual color of the wine? Try to be specific. Some colors to use are:
                    <div>White wine: lemon-green - lemon - gold - amber - brown</div>
                    <div>Rose wine: pink - salmon - orange</div>
                    <div>Red wine: purple - ruby - garnet - tawny - brown</div>
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