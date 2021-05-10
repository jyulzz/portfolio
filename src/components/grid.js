/*-----------------------------------------------------------------------------*

FILE
src/components/grid.js

DESCRIPTION
Contains the View, Grid and Container components that are used to build the grid system used throughout this portfolio.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import PropTypes from "prop-types";
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const Container = ({ id, children }) => {
  return (
    <div className={"container "} id={id}>
      {children}
    </div>
  );
};
const View = ({ children }) => {
  return <div className="view">{children}</div>;
};
const Grid = ({ children }) => {
  return <div className="grid">{children}</div>;
};

/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  PROPS
*-----------------------------------------------------------------------------*/
Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  id: "",
  children: [],
};

View.propTypes = {
  children: PropTypes.node.isRequired,
};

View.defaultProps = {
  children: [],
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

Grid.defaultProps = {
  children: [],
};
/*-----------------------------------------------------------------------------*
  /PROPS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export { Grid, View, Container };
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
