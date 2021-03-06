

import React from 'react';
import { Button } from '../Button';
import './videosection.scss';

function VideoSection({
    headline, description, buttonLabel, vid
}) {
    return (
        <>
            <div className='vid-container'>
                <video src={vid} autoPlay loop muted />
                <h1>{headline}</h1>
                <p>{description}</p>
                <Button buttonStyle='btn--outline--white' buttonSize='btn--large'>{buttonLabel}</Button>
            </div>
        </>
    )
}

export default VideoSection;