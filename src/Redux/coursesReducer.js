import img1 from '../Assets/Images/Mocks/img1.jpg';
import img2 from '../Assets/Images/Mocks/img2.jpg';

let initialState = {
    courses: [
        {
            id: 1,
            img: img1,
            title: 'Copyrighting for the web, explained',
            status: 'In Progress',
            program: 'Writing',
            time: '3 days left'
        },
        {
            id: 2,
            img: img2,
            title: 'Cybersecurity Awareness: Basics',
            status: 'Completed',
            program: 'Cybersecurity',
            time: 'Overdue'
        },
        {
            id: 3,
            img: img2,
            title: 'Using G suite to manage your work',
            status: 'In Progress',
            program: 'Information Technology',
            time: '3 days left'
        },
        {
            id: 4,
            img: img1,
            title: 'Copyrighting for the web, explained',
            status: 'In Progress',
            program: 'Writing',
            time: 'Joined'
        },
        
        {
            id: 5,
            img: img2,
            title: 'Copyrighting for the web, explained',
            status: 'Completed',
            program: 'Writing',
            time: 'Joined'
        },
        {
            id: 6,
            img: img2,
            title: 'Using G suite to manage your work',
            status: 'In Progress',
            program: 'Information Technology',
            time: '2 month ago'
        },
        {
            id: 7,
            img: img1,
            title: 'Cybersecurity Awareness: Basics',
            status: 'In Progress',
            program: 'Cybersecurity',
            time: 'Overdue'
        },
        {
            id: 8,
            img: img2,
            title: 'Copyrighting for the web, explained',
            status: 'In Progress',
            program: 'Writing',
            time: '3 days left'
        },
        {
            id: 9,
            img: img2,
            title: 'Copyrighting for the web, explained',
            status: 'In Progress',
            program: 'Writing',
            time: 'Joined'
        },
    ]
}

const coursesReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default coursesReducer;