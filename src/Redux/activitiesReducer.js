let initialState = {
    activities: [
        {
            id: 1,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Sketching out ideas',
            progress: 78
        },
        {
            id: 2,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Brainstorming session with your work mates',
            progress: 78
        },
        {
            id: 3,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Research the top 3 security threats',
            progress: 78
        },
        {
            id: 4,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Sketching out ideas',
            progress: 78
        },
        {
            id: 5,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Brainstorming session with your work mates',
            progress: 78
        },
        {
            id: 6,
            program: 'Cybersecurity',
            status: 'In Progres',
            time: '3 days left',
            task: 'Research the top 3 security threats',
            progress: 78
        },   
    ]
}

const activitiesReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default activitiesReducer;