import React, { Fragment, FunctionComponent } from 'react';

import AppState, { InitStatus } from '../model/AppState';
import { SessionList } from '../model/Session';

export type Props = AppState & { children: (sessions: SessionList) => React.ReactElement<any> };

const InitStatusIndicatorOrApp: FunctionComponent<Props> = props => {
    if (props.status === InitStatus.InitializationFailed) {
        return <p>Die Sessiondaten konnten leider nicht geladen werden. Sorry ¯\_(ツ)_/¯</p>;
    }

    if (props.status === InitStatus.FetchingSessionData) {
        return <p>Veranstaltungen werden geladen...</p>;
    }

    return <Fragment>{props.children(props.sessions)} </Fragment>;
};

export default InitStatusIndicatorOrApp;
