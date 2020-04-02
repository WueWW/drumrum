import React, { FunctionComponent } from 'react';

const InfoPage: FunctionComponent = () => (
    <div>
        <p>Schön, dass du den WueWW Drumrum Timetable benutzt :-)</p>
        <p>
            Lob, Kritik &amp; Verbesserungsvorschläge kannst du gerne{' '}
            <a href="https://github.com/WueWW/drumrum-timetable/issues">im Issue-Tracker auf GitHub</a> anbringen.
        </p>
        <p>
            Bei dem WueWW Drumrum Timetable handelt es sich um eine <em>Progressive Web App</em>. Soll heißen, du kannst
            diese auf deinem Handy zum Startbildschirm hinzufügen und auch offline verwenden.
        </p>

        <h2>Datenschutz</h2>
        <p>Die App wird über GitHub Pages veröffentlicht, von dritter Seite werden keine Daten abgerufen.</p>

        <h2>Impressum</h2>
        <p>
            Stefan Siegl <br />
            Annastraße 17a <br />
            97072 Würzburg <br />
            <br />
            E-Mail: <a href="mailto:stesie@brokenpipe.de">stesie@brokenpipe.de</a>
            <br />
            Twitter: <a href="https://twitter.com/stesie23">@stesie23</a>
        </p>
    </div>
);

export default InfoPage;
