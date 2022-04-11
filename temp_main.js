let firstMonth, secondMonth;

function successToGetGeoLocation(position) {
    const { longitude, latitude } = position.coords;

    console.log(`Longitude: ${longitude} \nLatitude: ${latitude}`);

    fetch(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=1&month=4&year=2022&school=1`
    ).then((res) => {
        if (res.ok) {
            res.json().then((JSONdata) => {
                firstMonth = JSONdata.data;

                fetch(
                    `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=1&month=5&year=2022&school=1`
                ).then((res) => {
                    if (res.ok) {
                        res.json().then((JSONdata) => {
                            secondMonth = JSONdata.data;

                            formatData();
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
}

function failedToGetGeoLocation(err) {
    if (err.code == 1) {
        console.log("User denied permission!");
    }
}

navigator.geolocation.getCurrentPosition(
    successToGetGeoLocation,
    failedToGetGeoLocation
);

function formatData() {
    const tempData = [...firstMonth, ...secondMonth];

    const finalData = tempData.filter(checkRamdaanDay);

    console.log(finalData);

    finalData.map(printFormat);
}

function checkRamdaanDay(obj) {
    const { hijri, grgorian } = obj.date;
    const [day, month] = [Number(hijri.day), hijri.month.number];

    return month == 9 && (day >= 1 || day <= 30);
}

function printFormat(obj) {
    const { hijri, grgorian } = obj.date;
    const [day, month, year] = [hijri.day, hijri.month.en, hijri.year];
    const {Fajr, Maghrib} = obj.timings

    const date = `${day} ${month}, ${year} (${obj.date.readable}) ${Fajr} ${Maghrib}`;
    console.log(date);
}

function getDate(str) {

    const temp = str.split(" ");
    const [hour, minute] = temp[0].split(":");
} 

getDate("04:50 (IST)");