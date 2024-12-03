
function FilterOptions({ onHandleCloseDropDown, generateValue, setRatingValue, setDurationValue, setReleaseYearValue }) {

    const yearValues = [1990, 2000, 2010, 2020];
    const  ratingValues = ['PG-13', 'R', 'TV-MA', 'PG', 'TV-14'];
    const durationValues = ['1 Season', '2 Seasons', '125 min'];

    function setFilterValue(filterType, item) {
        switch(filterType) {
            case 'year':
                setReleaseYearValue(item);
                break;
            case 'duration':
                setDurationValue(item);
                break;
            case 'rating':
                setRatingValue(item);
                break;
        };
    };

    function mapValues(arr, filterType) { 
        const mapArr = arr.map((item, index) => {
            return(
                <p  key={index} 
                    onClick={() => setFilterValue(filterType, item)} 
                    className='text-white hover:cursor-pointer active:bg-green-500 bg-gray-500 my-5'
                >
                    {item}
                </p>
            )
        });
        return mapArr;
    };

    return(
        <div className=''>
            <div className='flex absolute gap-2.5 pr-2.5 pt-2.5 top-0 right-0'>
                <button className='bg-slate-950 rounded p-1 text-2xl text-green-500 border border-black' onClick={generateValue}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <button className='bg-slate-950 rounded p-1 text-2xl text-white border border-black' onClick={onHandleCloseDropDown}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
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