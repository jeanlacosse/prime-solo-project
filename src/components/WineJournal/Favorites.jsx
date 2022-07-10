import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

// material ui
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// all favorites will be shown here from the list
function Favorites() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WINES' })
    }, [])

    const allWines = useSelector(store => store.wineInfo.allWinesList);

    // this will only display a wine if it has bee npreviously favorited
    return (
        <>
            <h2>My Favorite Wines</h2>
            {allWines.map((wineItem) => {
                if (wineItem.favorited === true) {
                    return (
                        <Card
                            sx={{
                                display: 'inline-block'
                            }}
                            variant='outlined'
                            key={wineItem.id}>
                            <CardContent>
                                <Typography
                                    onClick={() => history.push(`/success-page/${wineItem.id}`)}>
                                    {/* <div key={wineItem.id} */}
                                    {/* onClick={() => history.push(`/success-page/${wineItem.id}`)}> */}
                                    {/* {wineItem.date} */}
                                    <div>{wineItem.vintage}</div>
                                    <div>{wineItem.winery_name}</div>
                                    <div>{wineItem.varietal}</div>
                                    <div>Overall Rating: {Number(wineItem.avg_overall).toFixed(2)}</div>
                                </Typography>
                            </CardContent>
                            <IconButton

                                className="button"
                                type="button"
                                color="secondary"
                                onClick={() => dispatch({ type: 'DELETE_WINE_ITEM', payload: wineItem.id })}
                                variant="outlined">
                                <DeleteOutlineOutlinedIcon /></IconButton>
                            {/* </div> */}
                        </Card>
                    )
                }
            })}
            <div>
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
                </div>
        </>
    )
};

export default Favorites;