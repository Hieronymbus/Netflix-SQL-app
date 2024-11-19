
function FilterOptions({ onHandleCloseDropDown, generateValue, setRatingValue, setDurationValue, setReleaseYearValue }) {

    const yearValues = [1990, 2000, 2010, 2020];
    const  ratingValues = ['PG-13', 'R', 'TV-MA', 'PG', 'TV-14'];
    const durationValues = ['1 Season', '2 Seasons', '125 min'];

    function setFilterValue(filterType, item) {
        console.log(item + ' ' + filterType);
        if(filterType === 'year') {
            setReleaseYearValue(item);
        } else if(filterType === 'duration') {
            setDurationValue(item);
        } else if(filterType === 'rating') {
            setRatingValue(item);
        };
    };

    function mapValues(arr, filterType) { 
        const mapArr = arr.map((item, index) => {
            return(
                <p key={index} onClick={() => setFilterValue(filterType, item)} className='text-white hover:cursor-pointer active:bg-green-500 bg-gray-500 my-5'>
                    {item}
                </p>
            )
        });
        return mapArr;
    };

    return(
        <div className=''>
            {/* <h1 className='text-white'>Hello world</h1> */}
            <button className='absolute top-0 right-0 text-red-200' onClick={onHandleCloseDropDown}>CLOSE</button>
            <button className='absolute bottom-0 right-0 text-green-200' onClick={generateValue}>SUBMIT</button>
            <div className='text-white flex gap-10'>
                <div>
                    <p className="underline">Year</p>
                    {mapValues(yearValues, 'year')}
                </div>
                <div>
                    <p className="underline">Rating</p>
                    {mapValues(ratingValues, 'rating')}
                </div>
                <div>
                    <p className="underline">Duration</p>
                    {mapValues(durationValues, 'duration')}
                </div>
            </div>
        </div>
    )
};

export default FilterOptions;