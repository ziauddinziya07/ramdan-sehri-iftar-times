import React, { useState } from "react";
import Navbar from "./Navbar";
import Slide from "./Slide";
import DevQuote from "./DevQuote";
import Table from "./Table";
import CountDown from "./CountDown";
import FromNote from "./FromNote";
import DeveloperInfo from "./DeveloperInfo";
import Note from "./Note.jsx";

function App() {
    const [countDownDate, setCountDownDate] = useState(Date());
    const [countDownLabel, setCountDownLabel] = useState("");

    const changeCountDownDate = (newCountDownDate, label) => {
        setCountDownDate(newCountDownDate);
        setCountDownLabel(label);
    };

    return (
        <div>
            <Navbar />
            <Slide />
            <DevQuote />
            <Table changeCountDownDate={changeCountDownDate} />
            <Note />
            <CountDown
                countDownDate={countDownDate}
                countDownLabel={countDownLabel}
            />
            <FromNote />
            <DeveloperInfo />
        </div>
    );
}

export default App;
