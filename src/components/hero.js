/*-----------------------------------------------------------------------------*

FILE
src/components/hero.js

DESCRIPTION
Hero section used on the Index page.

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Emoji from "a11y-react-emoji";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Container } from "../components/grid";
import Section from "../components/section";
/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  OPTIONS
*-----------------------------------------------------------------------------*/

/* 'options' contains rendering directives for Rich Text content received from Contentful, including embedded assets, paragraphs and headers. */
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return (
        <h1>
          {" "}
          <Emoji symbol="👋" label="Waiving Hand Emoji" />
          {" "}
          {children}
        </h1>
      );
    },
    [MARKS.BOLD]: (node, children) => {
      return <b>{children}</b>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4>{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return <h5>{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (node, children) => {
      return <h6>{children}</h6>;
    },
  },
};
/*-----------------------------------------------------------------------------*
  /OPTIONS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  COMPONENTS
*-----------------------------------------------------------------------------*/
const Hero = () => {
  /* Pull the Site entry from Contentful for this site. */
  const contenfulData = useStaticQuery(graphql`
    {
      allContentfulSite(filter: { slug: { eq: "jules-thivent" } }) {
        edges {
          node {
            id
            name
            hero {
              raw
            }
          }
        }
      }
    }
  `);
  return (
    <Container>
      <Section id="hero">
        {documentToReactComponents(
          JSON.parse(contenfulData.allContentfulSite.edges["0"].node.hero.raw),
          options
        )}
      </Section>
    </Container>
  );
};
/*-----------------------------------------------------------------------------*
  /COMPONENTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  EXPORTS
*-----------------------------------------------------------------------------*/
export default Hero;
/*-----------------------------------------------------------------------------*
  /EXPORTS
*-----------------------------------------------------------------------------*/
