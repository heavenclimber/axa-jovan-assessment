import React from "react";
import { Button } from "reactstrap";
import propTypes from "prop-types";

const NavigationContent = ({ navMap, navProspect }) => {
  return (
    <div className="mb-5">
      {navMap.map((e) => {
        return (
          <Button
            id={e.navId}
            outline={navProspect !== e.navId}
            color="primary"
            className="px-5 mx-2"
            onClick={e.onClick}
          >
            {e.label}
          </Button>
        );
      })}
    </div>
  );
};

NavigationContent.propTypes = {
  navMap: propTypes.array,
  navProspect: propTypes.string,
};

NavigationContent.default = {
  navMap: [],
  navProspect: "",
};

export default NavigationContent;
