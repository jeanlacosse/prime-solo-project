import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function NoseTips() {

    const history = useHistory();

    return (
        <>
         <h2>How to judge nose of wine:</h2>
            <div>Things to look for: 
                <div>Cleanliness: Is the smell crisp or does it smell unclean?</div>
                <div>Intensity: How intense is the smell of the wine? light - medium - pronounced </div>
                <div>Aroma Characteristics: What does the wine smell like? Try to be specific. A wine can have many different aromas.
                    
                    <div>Please refer to the wine aroma wheel for some examples</div>
                    <div><img src="https://scalar.usc.edu/works/from-vine-to-wine/media/D-415-WineAromaWheel-ACNoble.jpg" alt="" /></div>
                </div>
            </div>
        <button
                onClick={() => { history.push('/tasting-tips') }}>
            Back</button>
        </>
    )
};

export default NoseTips;         