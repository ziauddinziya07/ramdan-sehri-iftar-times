import React, { useState } from "react";
import Duration from "duration-js";
import Clock from "./Clock";

function CountDown(props) {
    const date1 = props.countDownDate;
    const label = props.countDownLabel;
    const [duration, setDuration] = useState({});
    function getDuration() {
        const date2 = new Date();
        let diff;
        try {
            diff = new Duration(date1 - date2);
            setDuration({
                hours: diff.hours(),
                mins: diff.minutes() % 60,
                secs: diff.seconds() % 60,
            });
        } catch (e) {}
    }

    setInterval(getDuration, 1000);

    return (
        <section id="count-down">
            <div className="main">
                <div className="row">
                    <div className="col-lg-5 bg-container">
                        <div className="bg-color">
                            <div className="title">
                                <div className="content">
                                    <h4>Time left for</h4>
                                    <h1>{label} ...</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 my-auto clock">
                        <Clock duration={duration} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CountDown;
