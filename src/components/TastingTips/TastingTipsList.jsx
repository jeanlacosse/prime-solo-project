import { Link } from 'react-router-dom';

function TastingTipsList() {
    return (
        <>
            <h2>made it to tips page</h2>
            <button>
                <Link to="/appearance-tips">
                    How to Judge Appearance
                </Link>
            </button>

            <button>
                <Link to="/nose-tips">
                How to Judge Nose
                </Link>
            </button>

            <button>
                <Link to="/palate-tips">
                How to Judge Palate
                </Link>
            </button>

            <button>
                <Link to="/overall-tips">
                How to Judge Wine Overall 
                </Link>
            </button>
        </>
    )
};

export default TastingTipsList;