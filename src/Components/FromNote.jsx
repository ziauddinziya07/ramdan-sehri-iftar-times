import React, { useState } from "react";
import ShareField from "./ShareField";

function FromNote() {
    // const name = "Ziauddin Ziya";
    const [value, setValue] = useState("");

    const changeValue = (newValue) => {
        setValue(newValue);
    };

    function replaceAll(temp, srch, rpl) {
        return temp.split(srch).join(rpl);
    }

    const temp = window.location.href;
    const res = temp.split("/?")[1].split("#")[0];

    // Decoding the sender name from the href
    let name = "";
    for (let i = 0; i < res.length; i++) {
        if (!(res[i] == "_" || res[i] == "-")) {
            const currentChar = res.charCodeAt(i);
            if (
                (currentChar >= 65 && currentChar <= 68) ||
                (currentChar >= 97 && currentChar <= 100)
            )
                name += String.fromCharCode(res.charCodeAt(i) + 26 - 4);
            else name += String.fromCharCode(res.charCodeAt(i) - 4);
        } else name += res[i];
    }

    name = replaceAll(name, "_", " ");
    name = replaceAll(name, "-", ".");

    return (
        <section id="from-note">
            <div className="from">
                <h3>From:</h3>
                <h1>{value.length > 1 ? value : name}</h1>
            </div>
            <ShareField value={value} changeValue={changeValue} name={name} />
        </section>
    );
}

export default FromNote;
