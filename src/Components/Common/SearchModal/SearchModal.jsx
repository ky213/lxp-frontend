import React, { useState } from 'react';
import CustomSelect from '../Cutsom/Select/CustomSelect';
import classes from './SearchModal.module.css';
import { searchicon } from '../../../Assets/Images/searchicon.js';


const SearchModal = (props) => {
    const [searchValue, setSearchValue] = useState('');

    let filerOne = ['Search everything', 'option1', 'option2'];
    let filerTwo = ['By anyone', 'option1', 'option2'];
    let filerThree = ['In all segments', 'option1', 'option2'];

    const [filterOneValue, setFilterOneValue] = useState(filerOne[0]);
    const [filterTwoValue, setFilterTwoValue] = useState(filerTwo[0]);
    const [filterThreeValue, setFilterThreeValue] = useState(filerThree[0]);

    return(
        <div className={classes.main}>
            <div className={classes.arrow}>
                <div class={classes.innerArrow}></div>
            </div>
            <div className={classes.body}>
                <div className={classes.searchField}>
                    <button>
                        {searchicon}
                    </button>
                    <input placeholder="Search..." name={"value"} onChange={(e)=>{setSearchValue(e.target.value)}}/>
                </div>
                <div className={classes.filters}>
                    <CustomSelect options={filerOne} setFunction={setFilterOneValue}/>
                    <CustomSelect options={filerTwo} setFunction={setFilterTwoValue}/>
                    <CustomSelect options={filerThree} setFunction={setFilterThreeValue}/>
                </div>
            </div>
            
        </div>
    );
}

export default SearchModal;