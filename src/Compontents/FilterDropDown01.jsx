import FilterOptions from './FilterOptions.jsx';

function FilterDropDown({ onHandleCloseDropDown }) {
    return(
        <div>
            <FilterOptions onHandleCloseDropDown={onHandleCloseDropDown} />
        </div>
    )
};

export default FilterDropDown;