import React from "react";
import { Popup } from "react-map-gl";

const Tooltip = (props) => {
    const { details, fields, handleCloseTooltip } = props;
    const regex = /\B(?=(\d{3})+(?!\d))/g;

    return (
      <Popup
        tipSize={0}
        latitude={details.coordinates.latitude}
        longitude={details.coordinates.longitude}
        closeButton={true}
        closeOnClick={false}
        onClose={() => handleCloseTooltip}
      >
        <div className="map-tooltip">
          <div className="map-tooltip-field">
            <div className="map-tooltip-header">{details.state_ut}</div>
          </div>

          <div className="margin" />

          {fields.fields.map((field, index) => (
            <div className="map-tooltip-field" key={index}>
              <div className="map-tooltip-label">{field}:</div>
              <div className="map-tooltip-value">
                {details[field].toString().replace(regex, ",")}
              </div>
            </div>
          ))}
        </div>
      </Popup>
    );
  }


export default Tooltip;
