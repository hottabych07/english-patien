import React, {Component} from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler'
import {Button, Icon, Modal, LocaleProvider, message, Select} from 'antd'
import withDragDropContext from './withDnDContext';
import {connect} from "react-redux";
import moment from 'moment'
import 'moment/locale/ru';
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import {bindActionCreators} from "redux";
import 'react-big-scheduler/lib/css/style.css'
import clone from 'clone';

import './ScheduleWrapper.css';
import CourseForm from "../CourseForm/CourseForm";
import LessonForm from "../LessonForm/LessonForm";
import {filterGroups, filterTeachersResourses, filterLessonsEvents, filterGroupsResourses} from "../../filters";
import {addCourses} from "../../actions/courses";
import {deleteLesson, updateLesson} from "../../actions/lessons";
import {fetchUpdateLesson, fetchDeleteLesson} from "../../api";

const Option = Select.Option;
moment.locale('ru');

class ScheduleWrapper extends Component {
    constructor(props) {
        super(props);

        console.log(ViewTypes.Week);
        console.log(DemoData.resources);
        console.log(DemoData.events);
        this.state = {
            isTeachers: true,
            showCourseForm: false,
            showLessonForm: false,
            editableId: ''
        };

        console.log('LOCALE:', moment.locale('ru'));;


        let schedulerData = new SchedulerData(
            new moment().format('YYYY-MM-DD'),
            ViewTypes.Week,
            false,
            false,
            {
                schedulerWidth: '1000',
                dayResourceTableWidth: 176,
                weekResourceTableWidth: 176,
                monthResourceTableWidth: 176,
                dayCellWidth: 30,
                weekCellWidth: 130,
                monthCellWidth: 90,

                tableHeaderHeight: 50,
                eventItemHeight: 30,
                eventItemLineHeight: 44,
                resourceName: 'Преподаватели',
                taskName: 'Занятие',
                nonAgendaDayCellHeaderFormat: 'HH:mm',
                views: [
                    {viewName: 'День', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
                    {viewName: 'Неделя', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
                    {viewName: 'Месяц', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                 ],
            // minuteStep: 15
        }, undefined, moment);

        console.log('initial teachers',this.props.teachers);
        console.log('initial lessons',this.props.lessons);
        schedulerData.setResources(clone(this.props.teachers));
        schedulerData.setEvents(clone(this.props.lessons));

        this.state.viewModel = schedulerData;
    }

    toggleShowForm = (name, flag = false, id = '') => {
        this.setState({
            [name + 'Form']: flag,
            editableId: id
        })
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps',this.props);
        console.log('componentWillReceiveProps nextProps',nextProps);
        if (this.state.isTeachers) {
            this.changeSchedule(nextProps.lessons, nextProps.teachers,'Преподаватели');
        } else {
            this.changeSchedule(nextProps.lessonsByGroups, nextProps.groupsResourses, 'Группы');
        }
    }

    updateContent = (flag = '') => {
        if (flag) {
            if (flag === '0') {
                this.changeSchedule(this.props.lessons, this.props.teachers,'Преподаватели');
            } else if (flag === '1') {
                this.changeSchedule(this.props.lessonsByGroups, this.props.groupsResourses, 'Группы');
            }
        } else {
            if (this.state.isTeachers) {
                this.changeSchedule(this.props.lessons, this.props.teachers,'Преподаватели');
            } else {
                this.changeSchedule(this.props.lessonsByGroups, this.props.groupsResourses, 'Группы');
            }
        }
    };

    changeSchedule = (lessons = [], resourses = [], resourceName = 'Преподаватели') => {
        this.state.viewModel.setResources(clone(resourses));
        this.state.viewModel.setEvents(clone(lessons));
        this.state.viewModel.config.resourceName = resourceName;
        this.setState({})
    };

    selectRow = (val) => {
        if (val === '0') {
            console.log('0');
            this.setState({
                isTeachers: true,
            });
            this.updateContent('0')
        } else {
            console.log('1', this.props.groupsResourses, this.props.lessonsByGroups);
            this.setState({
                isTeachers: false,
            });
            console.log('after select:', this.state);
            this.updateContent('1')
        }

    };

    render() {
        const {viewModel} = this.state;
        console.log('rendered state',this.state);
        console.log('rendered props',this.props);
        let leftHeader = <Select defaultValue="0" onSelect={this.selectRow}>
                <Option value={'0'}>По преподавателям</Option>
                <Option value={'1'}>По группам</Option>
        </Select>;
        return <LocaleProvider locale={ru_RU}>
            <div className={"SheduleWrapper"}>
            <Scheduler schedulerData={viewModel}
                       prevClick={this.prevClick}
                       nextClick={this.nextClick}
                       onSelectDate={this.onSelectDate}
                       onViewChange={this.onViewChange}
                       eventItemClick={this.eventClicked}
                       viewEventClick={this.ops1}
                       viewEventText="Изменить"
                       viewEvent2Text="Удалить"
                       viewEvent2Click={this.ops2}
                       updateEventStart={this.updateEventStart}
                       updateEventEnd={this.updateEventEnd}
                       moveEvent={this.moveEvent}
                       leftCustomHeader={leftHeader}
                       //newEvent={this.newEvent}
            />
            <Button onClick={() => this.toggleShowForm('showCourse', true)}>
                <Icon type="plus-circle"/>
                Добавить курс
            </Button>
            <Button onClick={() => this.toggleShowForm('showLesson', true)}>
                <Icon type="plus-circle"/>
                Добавить занятие
            </Button>
            <Modal
                visible={this.state.showCourseForm}
                destroyOnClose={true}
                width={"500px"}
                height={"566px"}
                onCancel={(() => {
                    this.toggleShowForm('showCourse', false)
                }).bind(this)}
                className={'modalBody'}
            >
                <CourseForm
                    onSave={() => {}}
                    onCancel={(() => {
                        this.toggleShowForm('showCourse', false)
                    }).bind(this)}
                />
            </Modal>
            <Modal
                visible={this.state.showLessonForm}
                destroyOnClose={true}
                width={"600px"}
                height={"566px"}
                onCancel={(() => {
                    this.toggleShowForm('showLesson', false)
                }).bind(this)}
                className={'modalBody'}
            >
                <LessonForm
                    onSave={() => {}}
                    updateSchedule={this.updateContent.bind(this)}
                    editableId={this.state.editableId}
                    onCancel={(() => {
                        this.toggleShowForm('showLesson', false)
                    }).bind(this)}
                />
            </Modal>
        </div>
        </LocaleProvider>
    }

    prevClick = (schedulerData) => {
        schedulerData.prev();
        this.updateContent();
        this.setState({
            viewModel: schedulerData
        })
    };

    nextClick = (schedulerData) => {
        schedulerData.next();
        this.updateContent();
        this.setState({
            viewModel: schedulerData
        })
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        this.updateContent();
        this.setState({
            viewModel: schedulerData
        })
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        this.updateContent();
        this.setState({
            viewModel: schedulerData
        })
    };

    eventClicked = (schedulerData, event) => {
        console.log(event);

        this.toggleShowForm('showLesson', true, this.handleId(event.id));
    };

    handleId = (id) => {
        if (!this.state.isTeachers) {
            return id.split('_')[0];
        }
        return id
    };

    ops1 = (schedulerData, event) => {
        console.log(event);
        this.toggleShowForm('showLesson', true, this.handleId(event.id));
    };

    ops2 = (schedulerData, event) => {
        let id = '';
        if (this.state.isTeachers) {
            id = event.id;
        } else {
            id = event.id.match(/[^_]*/i)[0]
        }
        fetchDeleteLesson(id).then((status) => {
            if (status === 204) {
                this.props.deleteLesson({
                    id
                });
                message.success('Занятие успешно удалено!')
            } else {
                message.error('Ошибка удаления!')
            }

        });
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        };
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })
    };

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    };

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    };

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        console.log('before move',event, slotId, slotName, start, end);
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        console.log('after move', schedulerData, event);
        this.setState({
            viewModel: schedulerData
        });

        let startDate = moment(start, 'YYYY-MM-DD HH:mm:ss');
        let endDate = moment(end, 'YYYY-MM-DD HH:mm:ss');

        let {
            id,
            title,
            resourceId,
            groups,
            course,
            bgColor,
            location,
            teachers = [],
            type
        } = event;
        let currEvents = [];
        let flag = false;
        if (!this.state.isTeachers) {
            currEvents = schedulerData.events.filter((item) => ((item.id !== id) && (item.resourceId == resourceId)));
            currEvents.forEach((item) => {
                if (item.id.split('_')[0] === id.split('_')[0]) {
                    console.log('GROUPS DETECTED!');
                    flag = true;
                }
            })
        } else {
            flag = true;
            console.log('TEACHERS DETECTED!');
            teachers.forEach((id) => {
                if (id == resourceId) {
                    flag = false;
                }
            })
        }

        if (flag) {
            console.log('UPDATE SCHEDULE');
            this.updateContent();
        } else {
        let editableLesson = {
            id: this.handleId(id),
            name: title,
            start_time: startDate.format('YYYY-MM-DD') + 'T' + startDate.format('HH:mm:ss') + '+07:00',
            end_time: endDate.format('YYYY-MM-DD') + 'T' + endDate.format('HH:mm:ss') + '+07:00',
            teacher: resourceId,
            groups,
            course,
            bgColor,
            location,
            type
        };

        if (this.state.isTeachers) {
            editableLesson.teacher = resourceId;
        } else {
            let newGroups = [];
            schedulerData.events.forEach(item => {
                if (item.id.split('_')[0] === id.split('_')[0]) {
                    newGroups.push(item.resourceId);
                }
            });
            console.log('RESULT OF COMBINATION GROUPS:',newGroups);
            editableLesson.groups = newGroups;
        }

        console.log(editableLesson);
            fetchUpdateLesson(editableLesson, editableLesson.id).then((data) => {
                this.props.updateLesson(data);

                //this.updateContent();
            })
        }

    }
}

const mapStateToProps = (state) => ({
    teachers: filterTeachersResourses(state),
    groups: filterGroups(state),
    groupsResourses: filterGroupsResourses(state),
    lessons: filterLessonsEvents(state),
    lessonsByGroups: filterLessonsEvents(state, true),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCourses,
    updateLesson,
    deleteLesson
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withDragDropContext(ScheduleWrapper));
