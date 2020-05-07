import React, { FunctionComponent } from 'react';

export interface Props {
    text: string;
}

const MaybeLink: FunctionComponent<Props> = props => {
    if (props.text.startsWith('http')) {
        return <a href={props.text}>{props.text}</a>;
    }

    return <span>{props.text}</span>;
};

export default MaybeLink;
