import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function ShareField(props) {
    const value = props.value;
    const changeValue = props.changeValue;

    function handleChange(event) {
        const newValue = event.target.value;
        changeValue(newValue);
    }

    function replaceAll(temp, srch, rpl) {
        return temp.split(srch).join(rpl);
    }

    function shareInWhatsApp() {
        // Encoding the sender name
        let name = value.length !== 0 ? value : props.name; // If user click directly on share button without entering name
        const tempName = name;

        name = replaceAll(name, " ", "_");
        name = replaceAll(name, ".", "-");
        let res = "";
        for (let i = 0, l = name.length; i < l; i++) {
            if (name[i] !== "_" && name[i] !== "-") {
                const currentChar = name.charCodeAt(i);
                if (
                    (currentChar >= 87 && currentChar <= 90) ||
                    (currentChar >= 119 && currentChar <= 122)
                ) {
                    res += String.fromCharCode(currentChar - 26 + 4);
                } else res += String.fromCharCode(currentChar + 4);
            } else res += name[i];
        }

        const currentURL = window.location.href;
        const URL = currentURL.split("/?")[0];

        const newURL = URL + "/?" + res;
        const message = `Don%27t+forward+the+different+Sehri+and+Iftar+time+cards+to+your+friends+which+does+not+belong+to+their+place+or+region+...%0D%0A%0D%0A%D8%B3%D8%AD%D8%B1%DB%8C+%D8%A7%D9%88%D8%B1+%D8%A7%D9%81%D8%B7%D8%A7%D8%B1+%DA%A9%DB%92+%D9%85%D8%AE%D8%AA%D9%84%D9%81+%D9%B9%D8%A7%D8%A6%D9%85+%DA%A9%D8%A7%D8%B1%DA%88+%D8%A7%D9%BE%D9%86%DB%92+%D8%AF%D9%88%D8%B3%D8%AA%D9%88%DA%BA+%DA%A9%D9%88+%D8%A2%DA%AF%DB%92+%D9%85%D8%AA+%D8%A8%DA%BE%DB%8C%D8%AC%DB%8C%DA%BA+%D8%AC%D9%88+%D8%A7%D9%86+%DA%A9%DB%8C+%D8%AC%DA%AF%DB%81+%DB%8C%D8%A7+%D8%B9%D9%84%D8%A7%D9%82%DB%92+%D8%B3%DB%92+%D8%AA%D8%B9%D9%84%D9%82+%D9%86%DB%81%DB%8C%DA%BA+%D8%B1%DA%A9%DA%BE%D8%AA%DB%92...%0D%0A%0D%0A%0D%0A%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%F0%9F%91%87%F0%9F%8F%BB%0D%0A${newURL}+%0D%0A%0D%0A%0D%0ASend+them+our+web+page+we+will+show+them+the+exact+time+of+Sehri+and+Iftar+of+thier+region.%0D%0A%0D%0A%D8%A7%D9%86%DB%81%DB%8C%DA%BA+%DB%81%D9%85%D8%A7%D8%B1%D8%A7+%D9%88%DB%8C%D8%A8+%D9%BE%DB%8C%D8%AC+%D8%A8%DA%BE%DB%8C%D8%AC%DB%8C%DA%BA+%DB%81%D9%85+%D8%A7%D9%86%DB%81%DB%8C%DA%BA+%D8%A7%D9%86+%DA%A9%DB%92+%D8%B9%D9%84%D8%A7%D9%82%DB%92+%DA%A9%DB%8C+%D8%B3%D8%AD%D8%B1%DB%8C+%D8%A7%D9%88%D8%B1+%D8%A7%D9%81%D8%B7%D8%A7%D8%B1%DB%8C+%DA%A9%DB%92+%D8%B5%D8%AD%DB%8C%D8%AD+%D9%88%D9%82%D8%AA+%D8%AF%DA%A9%DA%BE%D8%A7%D8%A6%DB%8C%DA%BA+%DA%AF%DB%92%DB%94%0D%0A%0D%0A%0D%0AFrom%3A+%0D%0A${tempName}`;

        window.location.href = `https://wa.me?text=${message}`;
    }

    return (
        <div className="share-field">
            <h1>Want to share with your friends ...?</h1>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={shareInWhatsApp}
            >
                <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                Share
            </button>
        </div>
    );
}

export default ShareField;
