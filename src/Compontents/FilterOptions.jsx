

function FilterOptions({ onHandleCloseDropDown, generateValue, setRatingValue, setReleaseYearValue }) {
    const yearValues = [1990, 2000, 2010, 2020];
    const durationValues = ['PG-13', 'R', 'TV-MA', 'PG', 'TV-14'];
    const ratingValues = ['1 Season', '2 Seasons', '125 min'];

    function mapValues(arr) { 
        const mapArr = arr.map((item, index) => {
            return(
                <li key={index} className='text-white hover:cursor-pointer bg-gray-500 my-5'>
                    {item}
                </li>
            )
        });
        return mapArr;
    };

    return(
        <div className=''>
            {/* <h1 className='text-white'>Hello world</h1> */}
            <button className='absolute top-0 right-0 text-red-200' onClick={onHandleCloseDropDown}>CLOSE</button>
            <ul className='text-white flex gap-10'>
                <div>
                    <p className="underline">Year</p>
                    {mapValues(yearValues)}
                </div>
                <div>
                    <p className="underline">Rating</p>
                    {mapValues(ratingValues)}
                </div>
                <div>
                    <p className="underline">Duration</p>
                    {mapValues(durationValues)}
                </div>
            </ul>
        </div>
    )
};

export default FilterOptions;