import React from 'react';

import { 
    Card,
    CardImg,
    HolderProvider,
    Media,
    Avatar,
    AvatarAddOn,
    CardFooter,
    CardBody
} from '@/components';


const status = [
    "danger",
    "success",
    "warning",
    "secondary"
];

const CourseCard = ({course, onLaunch, ...otherProps}) => {

    return (
        <React.Fragment>
            { /* START Card */}
            <Card className="mb-3">
                <HolderProvider.Icon
                    iconChar=""
                    size={ 32 }
                >
                <CardImg top src={course.image || ''} onClick={() => onLaunch(course)}/>
                </HolderProvider.Icon>
                <CardBody>
                    <div className="d-flex mb-3">
                        <span>
                            <a className="h6 text-decoration-none" href="#">
                                { course.name }
                            </a>
                            <br />
                            <a href="#" className="text-success">
                                { course.description }
                            </a>
                        </span>
                        <a href="#" className="ml-auto" onClick={() => onLaunch(course)}>
                            <i className="fa fa-external-link"></i>
                        </a>
                    </div>
                    <Media>
                        <Media left className="align-self-center mr-3">
                            <Avatar.Image
                                size="md"
                                src={ "" }
                                addOns={[
                                    <AvatarAddOn.Icon 
                                        className="fa fa-circle"
                                        color="white"
                                        key="avatar-icon-bg"
                                    />
                                ]}
                            /> 
                        </Media>
                        <Media body>
                            <div className="mt-0 d-flex text-inverse">
                                { "Admin" }
                            </div>
                            <span>
                                {"Role"}
                            </span>
                        </Media>
                    </Media>
                </CardBody>
                <CardFooter className="bt-0">
                    <span className="mr-3">
                        <i className="fa fa-eye mr-1"></i> <span className="text-inverse">233</span> 
                    </span>
                </CardFooter>
            </Card>
            { /* END Card */}
        </React.Fragment>
    )
}

export { CourseCard };
