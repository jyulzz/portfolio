/*-----------------------------------------------------------------------------*

FILE
src/pages/project.js

DESCRIPTION
Template for the Project pages created through code in /gatsby-node.js

*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  IMPORTS
*-----------------------------------------------------------------------------*/

import React from "react";
import { graphql } from "gatsby";
import Emoji from "a11y-react-emoji";
import Img from "gatsby-image/withIEPolyfill";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { Container } from "../components/grid";
import Title from "../components/title";
import Section from "../components/section";
import Header from "./template/header";
import Main from "./template/main";
import Footer from "./template/footer";
import AboutAndContact from "./template/about-and-contact";
import Link from "../components/link";
import { Gems } from "../components/gems";
import Credits from "../components/credits";
import Technologies from "../components/technologies";
import Conf from "../../conf.yml";
import Pagination from "../components/pagination";
import Animation from "../components/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faTrafficCone } from "@fortawesome/pro-solid-svg-icons";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/pro-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/pages/project.scss";
library.add(faTrafficCone, faLongArrowLeft, faLongArrowRight);
config.autoAddCss = false;

/*-----------------------------------------------------------------------------*
  /IMPORTS
*-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------*
  OPTIONS
*-----------------------------------------------------------------------------*/

/* 'options' contains rendering directives for Rich Text content received from Contentful, including embedded assets, paragraphs and headers. */
const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      let { description, file } = node.data.target.fields;
      return (
        <figure>
          <img
            src={file[Conf.ContentfulDefaultLocale].url}
            alt={description[Conf.ContentfulDefaultLocale]}
          />
          <figcaption>
            <span className="description">
              {description[Conf.ContentfulDefaultLocale]}
            </span>
            <Link
              href={file[Conf.ContentfulDefaultLocale].url}
              target="_blank"
              level=""
            >
              Open In New Window <FontAwesomeIcon icon={faLongArrowRight} />
            </Link>
          </figcaption>
        </figure>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      switch (node.data.target.sys.contentType.sys.id) {
        case "iframe":
          return (
            <>
              <figure>
                <iframe
                  title={node.data.target.id}
                  className="iframe"
                  src={
                    node.data.target.fields.url[Conf.ContentfulDefaultLocale]
                  }
                ></iframe>
                <figcaption>
                  {" "}
                  <span className="description">
                    {node.data.target.fields.name[Conf.ContentfulDefaultLocale]}
                  </span>
                  <Link
                    href={
                      node.data.target.fields.url[Conf.ContentfulDefaultLocale]
                    }
                    target="_blank"
                    level=""
                  >
                    Open In New Window{" "}
                    <FontAwesomeIcon icon={faLongArrowRight} />
                  </Link>
                </figcaption>
              </figure>
            </>
          );
        default:
          return <></>;
      }
    },
    [INLINES.HYPERLINK]: (node) => {
      return (
        <Link href={node.data.uri} target="_blank" level="">
          {node.content[0].value}
        </Link>
      );
    },
    [INLINES.ASSET_HYPERLINK]: (node) => {
      return (
        <Link
          href={
            "https://" +
            node.data.target.fields.file[Conf.ContentfulDefaultLocale].url
          }
          target="_blank"
          level=""
        >
          {node.content[0].value}
        </Link>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>;
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return <h1>{children}</h1>;
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

export const query = graphql`
  query($slug: String, $previousProjectSlug: String, $nextProjectSlug: String) {
    firstProject: allContentfulProject(
      limit: 1
      sort: { fields: updatedAt, order: DESC }
    ) {
      nodes {
        slug
        title
        imagePreview {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    lastProject: allContentfulProject(
      limit: 1
      sort: { fields: updatedAt, order: ASC }
    ) {
      nodes {
        slug
        title
        imagePreview {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    previousProject: allContentfulProject(
      filter: { slug: { eq: $previousProjectSlug } }
    ) {
      nodes {
        imagePreview {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    nextProject: allContentfulProject(
      filter: { slug: { eq: $nextProjectSlug } }
    ) {
      nodes {
        imagePreview {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    project: allContentfulProject(filter: { slug: { eq: $slug } }) {
      nodes {
        id
        slug
        title
        description {
          description
        }
        subtitle
        imagePreview {
          id
          file {
            url
          }
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        animation {
          file {
            url
          }
        }
        animationBackground {
          file {
            url
          }
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        content {
          json
        }
        inProgress
      }
    }
  }
`;

const ProjectPage = ({ data, pageContext }) => {
  let previousProjectSlug;
  let previousProjectTitle;
  let previousProjectImagePreviewFluid;
  let nextProjectSlug;
  let nextProjectTitle;
  let nextProjectImagePreviewFluid;

  let projectData = data.project.nodes[0];

  if (data.previousProject.nodes[0]) {
    previousProjectImagePreviewFluid =
      data.previousProject.nodes[0].imagePreview.fluid;
    previousProjectSlug = pageContext.previousProjectSlug;
    previousProjectTitle = pageContext.previousProjectTitle;
  } else {
    previousProjectImagePreviewFluid =
      data.lastProject.nodes[0].imagePreview.fluid;
    previousProjectSlug = data.lastProject.nodes[0].slug;
    previousProjectTitle = data.lastProject.nodes[0].title;
  }

  if (data.nextProject.nodes[0]) {
    nextProjectImagePreviewFluid = data.nextProject.nodes[0].imagePreview.fluid;
    nextProjectSlug = pageContext.nextProjectSlug;
    nextProjectTitle = pageContext.nextProjectTitle;
  } else {
    nextProjectImagePreviewFluid =
      data.firstProject.nodes[0].imagePreview.fluid;
    nextProjectSlug = data.firstProject.nodes[0].slug;
    nextProjectTitle = data.firstProject.nodes[0].title;
  }

  return (
    <>
      <GatsbySeo
        title={projectData.title}
        description={projectData.description}
        openGraph={{
          type: "website",
          title:
            projectData.title +
            " | Jules Thivent - Product and UX Designer – Portfolio",
          locale: "enUS",
          description: projectData.description.description,
          images: [
            {
              url:
                "https://" + projectData.imagePreview + "?fm=png&w=800&h=600",
              width: 800,
              height: 600,
              alt: projectData.description,
            },
          ],
        }}
      />
      <Header />

      <Main type="default" className="project">
        <section id="project">
          <figure className="thumbnail">
            <div className="card">
              <h1>
                <span className="title">{projectData.title}</span>
                <span className="subtitle">{projectData.subtitle}</span>
              </h1>
              <h2>{projectData.description.description}</h2>
              {projectData.inProgress === true ? (
                <div className="inProgress">
                  <FontAwesomeIcon icon={faTrafficCone} />
                  This project is a work in progress
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="image">
              {projectData.animation !== null &&
              projectData.animationBackground !== null ? (
                <Animation
                  id={projectData.id}
                  src={projectData.animation.file.url}
                  bg={projectData.animationBackground.fluid}
                />
              ) : (
                <Img
                  fluid={projectData.imagePreview.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt={projectData.title}
                  style={{ height: "100%" }}
                />
              )}
            </div>
          </figure>
          {/* This is the Rich Text rendering section */}
          <section className="contentful-rich-text-types">
            {documentToReactComponents(projectData.content.json, options)}
          </section>

          <Pagination
            previousProjectSlug={previousProjectSlug}
            previousProjectTitle={previousProjectTitle}
            previousProjectImagePreview={previousProjectImagePreviewFluid}
            nextProjectSlug={nextProjectSlug}
            nextProjectTitle={nextProjectTitle}
            nextProjectImagePreview={nextProjectImagePreviewFluid}
          />
        </section>
      </Main>
      <Footer>
        <AboutAndContact />
        <Container>
          <Title level="1">Credits</Title>
          <Section>
            <Title level="2">License</Title>
            <Emoji symbol="🇪🇺" label="Flag: European Union" />
            Published under EUPL v1.2
          </Section>
          <Section>
            <Title level="2">Design &amp; Code</Title>
            <Emoji symbol="✌️" label="Victory Hand Emoji" />
            {""}100% by me{" | "}
            <Link
              className="inverted"
              href="https://github.com/jyulzz/portfolio3"
              target="_blank"
              level=""
              title="View on GitHub"
            >
              View on GitHub <FontAwesomeIcon icon={faLongArrowRight} />
            </Link>
          </Section>

          <Section>
            <Title level="2">Inspiration</Title>
            <Emoji symbol="🙏" label="Person With Folded Hands Emoji" /> Many
            thanks
            <Gems id="credits">
              <Credits />
            </Gems>
          </Section>
          <Section>
            <Title level="2">Stack</Title>
            <Emoji symbol="💪" label="Flexed Biceps Emoji" /> What I build this
            with
            <Gems id="technologies">
              <Technologies />
            </Gems>
          </Section>
        </Container>
      </Footer>
    </>
  );
};

export default ProjectPage;
