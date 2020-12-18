import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../Common/ProgressBar/ProgressBar';
import classes from './Activity.module.css';
import { setCurrentActivity } from '../../Redux/activitiesReducer';
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Common/Preloader/Preloader';
import { setIsFetching } from '../../Redux/commonReducer';


const Activity = (props) => {
    let widthProgressBar = 83;
    let heightProgressBar = 16;

    useEffect(()=>{
        let activityId = props.match.params.activityId;
        props.activities.forEach(item => {
            if(item.id == activityId){
                props.setCurrentActivity(item);
            }
        });
    },[]);

    return(
        <div className={classes.main}>
            {!props.activity ? <Preloader/> :
            <div className={classes.container}>
                <div className={classes.leftSide}>
                    <div className={classes.block + " " + classes.withoutPadding}>
                        <div className={classes.infoBlock}>
                            <p>Welcome back,</p>
                            <h3>{props.user.fullName}</h3>
                        </div>
                        <div className={classes.infoBlock}>
                            <label>Learning Hours</label>
                            <span><strong>34 hrs</strong> and <strong>54 mins</strong></span>
                        </div>
                        <hr className={classes.line}/>
                        <div className={classes.infoBlock}>
                            <label>Annual Learning Goal</label>
                            <span><strong>34 hrs</strong></span>
                        </div>
                    </div>
                    <div className={classes.block + " " + classes.programs}>
                        <div className={classes.programsHeader}>
                            <h4>Related activities</h4>
                            <NavLink to="/programs">View all</NavLink>
                        </div>
                        <div className={classes.progressBlock}>
                            <label>Sketching out ideas for securin....</label>
                            <div className={classes.progressContainer}>
                                <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={78}/>
                                <span>78%</span>
                            </div>
                        </div>
                        <div className={classes.progressBlock}>
                            <label>Team brainstorming</label>
                            <div className={classes.progressContainer}>
                                <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={42}/>
                                <span>42%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.tabHeader}>
                        <h1>Activity details</h1>
                        <span>Private</span>
                    </div>
                    <div className={classes.activity}>
                        <div className={classes.activityHeader}>
                            <span className={classes.fullPath}><span className={classes.path}>Cybersecurity awareness &gt;</span> Cybersecurity</span>
                            <div className={classes.headerRightSide}>
                                <button className={classes.editBut}>
                                    <i className="far fa-edit"></i>
                                    edit
                                </button>
                                <button className={classes.removeBut}>
                                    <i className="far fa-trash-alt"></i>
                                    delete
                                </button>
                            </div>
                        </div>
                        <h2>{props.activity.task}</h2>
                        <div className={classes.activityFoot}>
                            <div className={classes.activityProgressBlock}>
                                <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={props.activity.progress}/>
                                <span>{props.activity.progress}%</span>
                            </div>
                            <div className={classes.activityFootRight}>
                                <span>{props.activity.time}</span>
                                <button className={classes.mark}>Mark as complete</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.videoBlock}>
                        <div className={classes.video}>
                            <button>
                                <i className="fas fa-play-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}


let WithUrlDataContainerComponent = withRouter(Activity);

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    activity: state.activities.currentActivity,
    activities: state.activities.activities,
    user: state.user.user
})

export default connect(mapStateToProps, {
    setCurrentActivity,
    setIsFetching
})(WithUrlDataContainerComponent);