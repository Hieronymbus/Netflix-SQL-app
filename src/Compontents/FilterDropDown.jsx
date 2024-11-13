function FilterDropDown({ options, isShown, isYear, setFilterValue }) {
    
    function handleDropDownValue(e) {
        let value = e.target.textContent;
        console.log(value);
        setFilterValue(value);
    };
    return (
        <div className={`absolute ${isShown ? '' : 'hidden'} z-40 top-0 bg-black text-white w-full left-0 h-fit border border-black rounded`}>
            <ul>
                {options.map((option, index) => {
                    return(
                        <li key={index} onClick={(e) => handleDropDownValue(e)} className='hover:cursor-pointer hover:bg-gray-600 py-2.5 mb-5 hover:text-gray-200'>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default FilterDropDown;