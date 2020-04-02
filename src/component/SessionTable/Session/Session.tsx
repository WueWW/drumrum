import React from 'react';

import { Session as SessionType } from '../../../model/Session';
import { Link } from 'react-router-dom';

export interface Props extends SessionType {}

function formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
}

class Session extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        // TODO format cancelled
        return (
            <li className="session-list-item">
                <Link className="session-list-item__link" to={`/veranstaltung/${this.props.id}`}>
                    <span className="session-list-item__headline">{this.props.title}</span>
                    <span className="session-list-item__host">{this.props.host.name}</span>
                    <span className="session-list-item__date">
                        {' '}
                        {formatTime(this.props.start)}
                        {this.props.end && ' - ' + formatTime(this.props.end)}
                    </span>
                    <span className="session-list-item__location">{this.props.location}</span>
                </Link>
            </li>
        );
    }
}
export default Session;
