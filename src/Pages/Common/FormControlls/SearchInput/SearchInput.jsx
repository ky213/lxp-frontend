import React from 'react';
import classes from './SearchInput.module.css';
import { searchicon } from '../../../../Assets/Images/searchicon';

const SearchInput = (props) => {
    return(
        <div className={classes.main}>
            {searchicon}
            <input placeholder={props.placeholder}/>
        </div>
    );
}

export default SearchInput;