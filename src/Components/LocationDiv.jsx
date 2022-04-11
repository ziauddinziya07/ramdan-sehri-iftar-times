import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faLocationPinLock,
} from "@fortawesome/free-solid-svg-icons";

function LocationDiv(props) {
    const location = props.location;
    const locationStatus = props.locationStatus;
    console.log(location);
    return (
        <div className="location-wrapper">
            <h1 id={locationStatus ? null : "red-text"}>
                <span className="icon">
                    <FontAwesomeIcon
                        icon={
                            locationStatus ? faLocationDot : faLocationPinLock
                        }
                    />
                </span>
                {location}
            </h1>
        </div>
    );
}

export default LocationDiv;
