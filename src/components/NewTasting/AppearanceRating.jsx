import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function AppearanceRating() {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('params id', id);

    useEffect(() => {
        // this is to fetch wine detail for the last id inputed into the DB for that user,
        // It will line up exactly with the url endpoint and always get the last wines id
        // axios.get('/api/wineInfo/wine-id')
        //     .then(response => {
                // console.log('id response is', response.data.max)
                dispatch({ type: 'FETCH_WINE_DETAIL', payload: id});
            // })
            // .catch((error) => {
            //     console.error('error is', error)
            // })
        
      }, [ id ]);


    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)
    console.log('wine info on appearance is is', wineInfo)
/*TODO
[] useeffect to fetch wine detail
[]use store to display wine infor at top of page
[] create button for tips - no link yet
[] 1-10 slider create, set to local state
[] notes section input create, set to same local state or to store via a non saga dispatch
[] back button to go to wine inputs again,
[] next button goes to nose-rating
*/

    return (
        <>
        <h1>made it to ratings page</h1>
        
        </>
    )
};

export default AppearanceRating;