import React, { useEffect } from "react";
import Duration from "duration-js";

function TableRow(props) {
    const rowData = props.rowData;
    const { hijri, gregorian } = rowData.date;
    const [hijriDay, hijriMonth, hijriYear] = [
        hijri.day,
        hijri.month.en,
        hijri.year,
    ];
    const { Fajr, Maghrib } = rowData.timings;
    const dayName = gregorian.weekday.en.substring(0, 3);
    const [gregorianDay, gregorianYear] = [gregorian.day, gregorian.year];
    // since JS treats months from 0-11
    const gregorianMonth = gregorian.month.number - 1;

    // Takes 05:03 (IST) as input and return ["05", "03"]
    function getHourAndMinute(str) {
        const temp = str.split(" ");
        return temp[0].split(":");
    }

    // Fajr Time of this row
    const [fajrHour, fajrMinute] = getHourAndMinute(Fajr);
    const fajrDate = new Date(
        gregorianYear,
        gregorianMonth,
        gregorianDay,
        fajrHour,
        fajrMinute
    );

    // Fajr 10 mins Duration
    const tenMinutes = new Duration("10m");

    // Sehri Time
    const sehri = new Date(fajrDate - tenMinutes);

    // Next Day Sehri Time
    const nextRowData = props.nextRowData;
    const index = props.index;
    const nextDayFajr = nextRowData.timings.Fajr;
    // Fajr Time of Next row
    const [nextDayFajrHour, nextDayfajrMinute] = getHourAndMinute(nextDayFajr);
    const nextDayFajrDate = new Date(
        gregorianYear,
        gregorianMonth,
        // checking whether Next Day is Ramadan day or not
        index < 29 ? Number(gregorianDay) + 1 : gregorianDay,
        nextDayFajrHour,
        nextDayfajrMinute
    );
    // Final variable of Next Day Sehri Time
    const nextDaySehri = new Date(nextDayFajrDate - tenMinutes);
    // console.log(hijriDay, sehri, nextDaySehri);

    // Maghrib Time of this row
    const [maghribHour, maghribMinute] = getHourAndMinute(Maghrib);
    const maghribDate = new Date(
        gregorianYear,
        gregorianMonth,
        gregorianDay,
        maghribHour,
        maghribMinute
    );

    // Ifataar Time, Since there is no difference between Iftar time and Maghrib Time
    const iftar = new Date(maghribDate);

    // Function to change the CountDown Date in the App & CountDown Component.
    const changeCountDownDate = props.changeCountDownDate;
    // Code to change the CountDown Date in the App & CountDown Component.
    const todayDate = new Date();
    const [todayDay, todayMonth] = [todayDate.getDate(), todayDate.getMonth()];
    useEffect(() => {
        if (gregorianDay == todayDay && gregorianMonth === todayMonth) {
            if (todayDate < iftar) {
                changeCountDownDate(iftar, "Iftar");
            } else {
                changeCountDownDate(nextDaySehri, "Sehri");
            }
        }
    }, []);

    function formatTime(num) {
        if (num < 10) return `0${num}`;
        return num;
    }
    const date = `${hijriDay} ${hijriMonth}, ${hijriYear} (${gregorian.day} ${gregorian.month.en}, ${gregorian.year})`;
    const sehriString = `0${sehri.getHours()}:${formatTime(
        sehri.getMinutes()
    )} AM`;
    const iftarString = `0${iftar.getHours() - 12}:${formatTime(
        iftar.getMinutes()
    )} PM`;
    return (
        <tr>
            <th scope="row">{hijriDay}</th>
            <td>{date}</td>
            <td>{dayName}</td>
            <td>{sehriString}</td>
            <td>{iftarString}</td>
        </tr>
    );
}

export default TableRow;
