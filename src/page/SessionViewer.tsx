import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import Footer from '../component/Footer';
import SessionDatePicker from '../component/SessionDatePicker';
import SessionTable from '../component/SessionTable';
import { Session, SessionList } from '../model/Session';

export interface Props extends RouteComponentProps<any> {
    sessions: SessionList;
    selectedDate?: string;
}

export interface State {}

class SessionViewer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    selectedDate() {
        const availableDates = Object.keys(Session.partitionByDate(this.props.sessions)).sort();

        if (this.props.selectedDate && availableDates.includes(this.props.selectedDate)) {
            return this.props.selectedDate;
        }

        const todayDate = new Date().toISOString().substr(0, 10);

        if (availableDates.includes(todayDate)) {
            return todayDate;
        }

        return availableDates[0];
    }

    render() {
        const partitionedSessions = Session.partitionByDate(this.props.sessions);
        const selectedDate = this.selectedDate();

        return (
            <div>
                <SessionDatePicker options={Object.keys(partitionedSessions).sort()} selectedDate={selectedDate} />
                <SessionTable {...this.props} sessions={partitionedSessions[selectedDate]} />

                <Footer />
            </div>
        );
    }
}

export default SessionViewer;
