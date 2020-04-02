import React from 'react';

import { Link } from 'react-router-dom';

export interface Props {
    options: string[];
    selectedDate: string;
}

const SessionDatePicker: React.FunctionComponent<Props> = props => (
    <nav className="date-menu">
        <ul className="date-menu__list">
            {props.options.map(isoDateStr => {
                const date = new Date(isoDateStr);

                return (
                    <li key={isoDateStr} className="date-menu__item">
                        <Link
                            className={`date-menu__link ${props.selectedDate === isoDateStr ? 'active' : ''}`}
                            to={`/${isoDateStr}`}
                        >
                            <span className="date-menu__weekday">
                                {date.toLocaleDateString('de-DE', { weekday: 'short' })}
                            </span>
                            <span className="date-menu__day">
                                {date.toLocaleDateString('de-DE', { day: '2-digit' })}
                            </span>
                            <span className="date-menu__month">
                                {date.toLocaleDateString('de-DE', { month: 'long' })}
                            </span>
                            <span className="date-menu__year">
                                {date.toLocaleDateString('de-DE', { year: 'numeric' })}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </nav>
);

export default SessionDatePicker;
