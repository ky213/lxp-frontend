import React, { useState } from 'react';
import classes from './SearchModal.module.css';

const SearchModal = (props) => {
    const [searchValue, setSearchValue] = useState('');

    return(
        <div className={classes.main}>
            <div className={classes.arrow}>
                <div class={classes.innerArrow}></div>
            </div>
            <div className={classes.body}>
                <div className={classes.searchField}>
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                    <input placeholder="Search..." name={"value"} onChange={(e)=>{setSearchValue(e.target.value)}}/>
                </div>
            </div>
            
        </div>
    );
}

export default SearchModal;