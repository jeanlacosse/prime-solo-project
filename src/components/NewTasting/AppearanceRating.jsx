import {useSelector} from 'react-redux';

function AppearanceRating() {

    const wineInfo = useSelector((store) => store.wineInfo.wineDetail)

console.log('wine info is ', wineInfo)

    return (
        <>
        <h1>made it to ratings page</h1>
        
        </>
    )
};

export default AppearanceRating;