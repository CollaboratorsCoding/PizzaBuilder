import React from 'react';
import './style.css'
const backblack = (props) => (props.show
    ? <div className='back--black' onClick={props.clicked}></div>
    : null);

export default backblack;