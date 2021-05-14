/* ----------------------------------------------------------------------------*

FILE
src/components/sections/credits.js

DESCRIPTION
Displays photos linked to profiles of people who inspired the author.

*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  IMPORTS
*---------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Badges from "../ui-kit/badges";
/* ----------------------------------------------------------------------------*
  /IMPORTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  COMPONENTS
*---------------------------------------------------------------------------- */
const Credits = ({ data = {} }) => {
  data = useStaticQuery(graphql`
    {
      contentfulList(slug: { eq: "credits" }) {
        id
        items {
          ... on ContentfulPerson {
            id
            name
            link
            photo {
              id
              fluid(maxWidth: 80) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);

  return <Badges data={data} id="credits" />;
};

/* ----------------------------------------------------------------------------*
  /COMPONENTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  PROPS
*---------------------------------------------------------------------------- */
Credits.propTypes = {
  data: PropTypes.object.isRequired,
};
Credits.defaultProps = {
  data: {},
};
/* ----------------------------------------------------------------------------*
  /PROPS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  EXPORTS
*---------------------------------------------------------------------------- */
export default Credits;
/* ----------------------------------------------------------------------------*
  /EXPORTS
*---------------------------------------------------------------------------- */
