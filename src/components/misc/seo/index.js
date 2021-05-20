/* ----------------------------------------------------------------------------*

FILE
src/components/misc/seo.js

DESCRIPTION
Wrapper for the GatsbySeo component

*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  IMPORT
*---------------------------------------------------------------------------- */
import React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import PropTypes from "prop-types";
/* ----------------------------------------------------------------------------*
  /IMPORTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  COMPONENTS
*---------------------------------------------------------------------------- */
const Seo = ({ title = "", description = "", OGImage = "" }) => {
  return (
    <GatsbySeo
      title={title}
      description={description}
      openGraph={{
        type: "website",
        title: title + " | Jules Thivent - Product and UX Designer – Portfolio",
        locale: "enUS",
        description: { description },
        images: [
          {
            url: "https://" + OGImage + "?fm=png&w=800&h=600",
            width: 800,
            height: 600,
            alt: "Jules Thivent - Product and UX Designer – Portfolio",
          },
        ],
      }}
    />
  );
};
/* ----------------------------------------------------------------------------*
  /COMPONENTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  PROPS
*---------------------------------------------------------------------------- */
Seo.propTypes = {
  title: PropTypes.string.isRequired,
};

Seo.defaultProps = {
  title: "Home",
};
/* ----------------------------------------------------------------------------*
  /PROPS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  EXPORTS
*---------------------------------------------------------------------------- */
export default Seo;
/* ----------------------------------------------------------------------------*
  /EXPORTS
*---------------------------------------------------------------------------- */