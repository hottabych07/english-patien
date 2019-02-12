import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import PageHeader from '../../components/PageHeader/PageHeader'
import MainWrapper from '../../components/Main/Main'
import ScheduleWrapper from '../../components/ScheduleWrapper/ScheduleWrapper'
import './Schedule.css';
import {addUsers} from "../../actions/users";
import {addGroups} from "../../actions/groups";
import {addCourses} from "../../actions/courses";
import {addLessons} from "../../actions/lessons";
import {fetchCourses, fetchGroups, fetchUsers, fetchLessons} from "../../api";

class SchedulePage extends Component {

    componentDidMount() {
        fetchUsers().then(({data}) => {
            this.props.addUsers(data)
        });
        fetchGroups().then(({data}) => {
            this.props.addGroups(data)
        });
        fetchCourses().then(({data}) => {
            this.props.addCourses(data)
        })
        fetchLessons().then(({data}) => {
            this.props.addLessons(data)
        })
    }

    render() {
        return <div className={"SchedulePage"}>
                <ScheduleWrapper />
            </div>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addUsers,
    addGroups,
    addLessons,
    addCourses
}, dispatch);

export default connect(null, mapDispatchToProps)(SchedulePage);

