import React from 'react';

import { Session } from '../../model/Session';
import DisplaySession from './Session';

export interface Props {
    sessions: Session[];
}

const SessionTable: React.FunctionComponent<Props> = props => (
    <ul className="session-list">
        {props.sessions.sort(Session.startTimeComparator).map(session => {
            return <DisplaySession key={session.id} {...session} />;
        })}
    </ul>
);

export default SessionTable;
