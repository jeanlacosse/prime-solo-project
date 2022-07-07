import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function WineJournal() {

    const dispatch = useDispatch(); 
    // TODO
    // get store info
    // map over store info to dom, each is a span/card/div thing
    
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WINES' })
    }, [])

    return (
        <>
        <h1>made it to journal page</h1>
        </>
    )
};

export default WineJournal;