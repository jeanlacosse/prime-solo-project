import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Ratings() {
    const dispatch = useDispatch();
    const history = useHistory();

    // only need to add to store if I would be submitting this in another page and not one
    // where I can just use local state

    const [howManyHotDogsEaten, setHowManyHotDogsEaten] = useState(5);
    const [howGoodFireworks, setHowGoodFireworks] = useState(5);
    const [howBadNeedVacation, setHowBadNeedVacation] = useState(5);
    const [howMuchLikeWatermelon, setHowMuchLikeWatermelon] = useState(5);


    const addRatings = (event) => {
        event.preventDefault();

        dispatch({
            type: 'ADD-ALL-RATINGS',
            payload: {
                howManyHotDogsEaten,
                howGoodFireworks,
                howBadNeedVacation,
                howMuchLikeWatermelon

            }

        })

        history.push('/successPage');
    }

    return (
        <>
            {/* TODO
        turn this into a few questions that can be answered on a sliding scale
        place accross multiple pages/routes
        have it go to a success page
        */}

            <form onSubmit={(event) => addRatings(event)}>
            <h3>How many hot dogs did you eat this weekend?</h3>
                {/* hot dogs eaten */}
                <label htmlFor="">
                    Rating
                    <input
                        type="range"
                        min='0'
                        max='10'
                        placeholder="Rating"
                        value={howManyHotDogsEaten}
                        onChange={evt => setHowManyHotDogsEaten(Number(evt.target.value))}
                    />
                </label>
                <h4>{howManyHotDogsEaten}</h4>

                {/* how good were the fireworks */}
                <h3>How good were the fireworks you saw/set off?</h3>
                <label htmlFor="">
                    Rating
                    <input
                        type="range"
                        min='0'
                        max='10'
                        placeholder="Rating"
                        value={howGoodFireworks}
                        onChange={evt => setHowGoodFireworks(Number(evt.target.value))}
                    />
                </label>
                <h4>{howGoodFireworks}</h4>

                 {/* how good were the fireworks */}
                 <h3>How badly do you need another vacation?</h3>
                <label htmlFor="">
                    Rating
                    <input
                        type="range"
                        min='0'
                        max='10'
                        placeholder="Rating"
                        value={howBadNeedVacation}
                        onChange={evt => setHowBadNeedVacation(Number(evt.target.value))}
                    />
                </label>
                <h4>{howBadNeedVacation}</h4>

                 {/* how good were the fireworks */}
                 <h3>Watermelon is my favorite fruit. 1 = no way, 10 = hell yes</h3>
                <label htmlFor="">
                    Rating
                    <input
                        type="range"
                        min='0'
                        max='10'
                        placeholder="Rating"
                        value={howMuchLikeWatermelon}
                        onChange={evt => setHowMuchLikeWatermelon(Number(evt.target.value))}
                    />
                </label>
                <h4>{howMuchLikeWatermelon}</h4>
{/* anotehr stretch! Do a dropdown for yes/no questions and then final page displays how many yes and how many no */}
{/* stretch..! make an input for "favorite food eaten" and have it turned into an array_agg
that would get mapped over and would display all the comments people make on the form in the ratings page */}

                <button type='submit'>Submit answers</button>
            </form>
        </>
    )
}

export default Ratings;