import React from "react";

function Clock(props) {
    var duration = props.duration;

    function formatNum(temp) {
        if (temp > 9) return temp;
        if (temp > 0) return "0" + temp;
        return "00";
    }

    return (
        <div className="content">
            <ul>
                <li>
                    <p className="num">{formatNum(duration.hours)}</p>
                    <p className="caption">Hours</p>
                </li>
                <li>
                    <p className="num">{formatNum(duration.mins)}</p>
                    <p className="caption"> Mins </p>
                </li>
                <li>
                    <p className="num">{formatNum(duration.secs)}</p>
                    <p className="caption"> Secs </p>
                </li>
            </ul>
        </div>
    );
}

export default Clock;
