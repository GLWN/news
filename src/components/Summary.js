import React from 'react'
import './Summary.scss'
import Moment from 'react-moment'
import 'moment-timezone'
import 'moment/locale/fr'

const Summary = ({id, date}) => {
    return(
    <li className="summary-li">
        <div className="valign">
            <Moment format='LT' locale='fr'>
                {date}
            </Moment>
            <p>
            <Moment format='Do MMM' locale='fr'>
                {date}
            </Moment>
            </p>
        </div>
    </li>
    )
}

export default Summary