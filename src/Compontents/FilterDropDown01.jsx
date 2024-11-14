import FilterOptions from './FilterOptions.jsx';

function FilterDropDown({ onHandleCloseDropDown, generateValue, setDurationValue, setRatingValue, setReleaseYearValue }) {
    return(
        <div>
            <FilterOptions onHandleCloseDropDown={onHandleCloseDropDown} generateValue={generateValue} setDurationValue={setDurationValue} setRatingValue={setRatingValue} setReleaseYearValue={setReleaseYearValue} />
        </div>
    )
};

export default FilterDropDown;