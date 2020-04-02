import icalGenerator from 'ical-generator';

import { SessionList } from '../model/Session';

const generateIcal = (sessions: SessionList): string => {
    const cal = icalGenerator({ domain: 'drumrum.wueww.de', name: 'WueWW Favoriten' });

    sessions.forEach(session =>
        cal.createEvent({
            uid: `WUEWW-2020-drumrum-${session.id}`,
            start: new Date(session.start),
            end: session.end ? new Date(session.end) : undefined,
            summary: session.title,
            description: session.description && session.description.long,
            location: session.location ,
        })
    );

    return cal.toString();
};

export default generateIcal;
