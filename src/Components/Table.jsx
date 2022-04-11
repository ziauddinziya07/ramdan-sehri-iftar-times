import React, { useEffect, useState } from "react";
import LocationDiv from "./LocationDiv";
import TableRow from "./TableRow";

function Table(props) {
    // Table data
    const [tableData, setTableData] = useState([]);
    const [location, setLocation] = useState("");
    const [locationStatus, setLocationStatus] = useState(false);
    // Function to change the CountDown Date in the App & CountDown Component.
    const changeCountDownDate = props.changeCountDownDate;

    useEffect(() => {
        // First Step - Getting user's location
        navigator.geolocation.getCurrentPosition(
            successToGetGeoLocation,
            failedToGetGeoLocation
        );

        // Executed if get user's location successfully
        function successToGetGeoLocation(position) {
            const { longitude, latitude } = position.coords;
            const firstURL = `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=1&month=4&year=2022&school=1`;
            const secondURL = `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=1&month=5&year=2022&school=1`;
            const locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=fac58d2410a7476381e471940728db89`;

            let firstMonth, secondMonth;

            fetch(firstURL).then((res) => {
                if (res.ok) {
                    res.json().then((JSONdata) => {
                        firstMonth = JSONdata.data;

                        fetch(secondURL).then((res) => {
                            if (res.ok) {
                                res.json().then((JSONdata) => {
                                    secondMonth = JSONdata.data;

                                    formatData(firstMonth, secondMonth);
                                });
                            } else {
                                console.log("An Error occured!");
                            }
                        });
                    });
                } else {
                    console.log("An Error occured!");
                }
            });

            fetch(locationURL)
                .then((res) => res.json())
                .then((JSONdata) => {
                    const statusCode = JSONdata.status.code;
                    if (statusCode >= 200 && statusCode < 300) {
                        const { city, country } =
                            JSONdata.results[0].components;
                        setLocation(`${city}, ${country}.`);
                        setLocationStatus(true);
                    } else {
                        setLocation(
                            "An Error occured while getting your city name"
                        );
                    }
                });
        }

        // Executed if failed to get user's location
        function failedToGetGeoLocation(err) {
            if (err.code == 1) {
                console.log("User denied location permission!");
                setLocation("User denied location permission!");
            }
        }

        // Executed after successful data fetch from the API.
        function formatData(firstMonth, secondMonth) {
            const tempData = [...firstMonth, ...secondMonth];

            const finalData = tempData.filter(checkRamdaanDay);

            /** finalData i.e. Ramdaan month times is set to tableData */
            setTableData(finalData);
        }

        function checkRamdaanDay(obj) {
            const { hijri } = obj.date;
            const [day, month] = [Number(hijri.day), hijri.month.number];

            return month == 9 && (day >= 1 || day <= 30);
        }
    }, []);

    return (
        <section id="table-section">
            <LocationDiv location={location} locationStatus={locationStatus} />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Day</th>
                        <th scope="col">Sehri</th>
                        <th scope="col">Iftar</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, index) => {
                        // If today is not the day of Ramdan
                        let nextRowData;
                        if (index < 29) {
                            nextRowData = tableData[index + 1];
                        }
                        // If today is the last day of Ramdan
                        else {
                            nextRowData = rowData;
                        }
                        const { hijri } = rowData.date;
                        const day = hijri.day;
                        return (
                            <TableRow
                                key={day}
                                rowData={rowData}
                                changeCountDownDate={changeCountDownDate}
                                nextRowData={nextRowData}
                                index={index}
                            />
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default Table;
