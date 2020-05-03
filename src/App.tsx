import React, { Component } from 'react';
import { HashRouter as Router, Route, RouteComponentProps, Switch, Link } from 'react-router-dom';

import InitStatusIndicatorOrApp from './component/InitStatusIndicatorOrApp';
import AppState, { InitStatus } from './model/AppState';
import InfoPage from './page/InfoPage';
import SessionViewer from './page/SessionViewer';
import SessionDetailViewer from './page/SessionDetailViewer';

export interface Props {}

const SESSION_DATA_URL = 'https://backend.digital-events.wueww.de/export/session.json';

class App extends Component<Props, AppState> {
    private lastFetch?: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            status: InitStatus.FetchingSessionData,
        };
    }

    processSessionJSON = (data: any) => {
        if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
            throw new Error('sessions data malformed');
        }

        this.setState({
            status: InitStatus.InitializationComplete,
            sessions: data.sessions,
        });
    };

    fetchSessionJSON = async () => {
        try {
            if (this.lastFetch && (Date.now() - this.lastFetch) / 60e3 < 30) {
                console.log('skipping auto-update, last fetch < 30 minutes ago');
                return;
            }

            const response = await fetch(SESSION_DATA_URL);
            this.processSessionJSON(await response.json());
            this.lastFetch = Date.now();
        } catch (e) {
            this.setState({ status: InitStatus.InitializationFailed });
        }
    };

    componentDidMount() {
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        this.fetchSessionJSON();
    }

    componentWillUnmount() {
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }

    onVisibilityChange = () => {
        if (document.visibilityState !== 'visible') {
            return;
        }

        this.fetchSessionJSON();
    };

    render() {
        return (
            <Router>
                <div className="site">
                    <header className="site-header">
                        <div className="wueww__logo">
                            <Link to="/">
                                <img src="assets/wueww-logo-2020.svg" />
                            </Link>
                        </div>
                        <nav>
                            <ul className="site-menu">
                                <li className="site-menu__item">
                                    <a href="https://wueww.de/">Startseite</a>
                                </li>
                                <li className="site-menu__item">
                                    <a href="https://wueww.de/about/">About</a>
                                </li>
                                <li className="site-menu__item site-menu__item--nowrap">
                                    <a href="https://timetable.wueww.de/">Programm 2020</a>
                                </li>
                                <li className="site-menu__item site-menu__item--nowrap">
                                    <Link to="/">Digital Events</Link>
                                </li>
                                <li className="site-menu__item">
                                    <a href="https://wueww.de/sponsoren/">Sponsoren</a>
                                </li>
                                <li className="site-menu__item">
                                    <a href="https://wueww.de/presse/">Presse</a>
                                </li>
                                <li className="site-menu__item">
                                    <a href="https://wueww.de/newsletter/">Newsletter</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="TabMenu"></div>
                    </header>
                    <InitStatusIndicatorOrApp {...this.state}>
                        {sessions => (
                            <Switch>
                                <Route path="/impressum" component={() => <InfoPage />} />
                                <Route
                                    path="/veranstaltung/:id"
                                    render={(route: RouteComponentProps<any>) => {
                                        const sessionId = parseInt(route.match.params.id, 10);
                                        return <SessionDetailViewer session={sessions.find(x => x.id === sessionId)} />;
                                    }}
                                />
                                <Route
                                    path="/:date?"
                                    render={(route: RouteComponentProps<any>) => (
                                        <SessionViewer
                                            {...route}
                                            selectedDate={route.match.params.date}
                                            sessions={sessions}
                                        />
                                    )}
                                />
                            </Switch>
                        )}
                    </InitStatusIndicatorOrApp>
                    <footer className="site-footer">
                        <a href="https://backend.digital-events.wueww.de/" className="missing-event">
                            Veranstaltung melden
                        </a>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
