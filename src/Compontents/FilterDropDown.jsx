function FilterDropDown({ options }) {
    return (
        <div className='absolute hidden z-40 top-0 bg-black text-white w-full left-0 h-fit border border-black rounded'>
            <ul>
                {options.map((option, index) => {
                    return(
                        <li key={index} className='hover:cursor-pointer py-2.5 mb-5 hover:text-gray-200'>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default FilterDropDown;