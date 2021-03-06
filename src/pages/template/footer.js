/* ----------------------------------------------------------------------------*

FILE
src/pages/template/footer.js

DESCRIPTION
Contains the base setup for setting the <footer/> tag and its contents within the general grid system.

*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  IMPORTS
*---------------------------------------------------------------------------- */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { View, Grid, Container } from "components/ui-kit/view";
import Emoji from "a11y-react-emoji";
import Link from "components/ui-kit/link";
import Title from "components/ui-kit/title";
import Section from "components/ui-kit/section";
import Credits from "components/sections/credits";
import Technologies from "components/sections/technologies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faTrafficCone } from "@fortawesome/pro-solid-svg-icons";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/pro-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faTrafficCone, faLongArrowLeft, faLongArrowRight);
config.autoAddCss = false;
/* ----------------------------------------------------------------------------*
  /IMPORTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  COMPONENTS
*---------------------------------------------------------------------------- */
const Footer = ({ children = {} }) => {
  const data = useStaticQuery(graphql`
    {
      contentfulPage(slug: { eq: "/about/" }) {
        id
        paragraphs {
          id
          slug
          title
          content {
            raw
          }
        }
      }
      meetingLink: contentfulLink(shortname: { eq: "30minmeeting" }) {
        id
        url
        title
      }
      workLink: contentfulLink(shortname: { eq: "work" }) {
        id
        url
        title
      }
      cvLink: contentfulLink(shortname: { eq: "cv" }) {
        id
        url
        title
      }
      linkedinLink: contentfulLink(shortname: { eq: "linkedin" }) {
        id
        url
        title
      }
      emailLink: contentfulLink(shortname: { eq: "email" }) {
        id
        url
        title
      }
      whatsappLink: contentfulLink(shortname: { eq: "whatsapp" }) {
        id
        url
        title
      }
    }
  `);

  return (
    <footer>
      <View>
        <Grid>
          <Container className="split">
            <Section id="about">
              <Title level="1">About</Title>
              <ul>
                <li>
                  <Link
                    level="primary"
                    icon={["fas", "briefcase"]}
                    href={data.workLink.url}
                    title={data.workLink.title}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    icon={["fas", "file-user"]}
                    href={data.cvLink.url}
                    target="_blank"
                    title={data.cvLink.title}
                  >
                    CV/Résumé
                  </Link>
                </li>
                <li>
                  <Link
                    icon={["fab", "linkedin"]}
                    href={data.linkedinLink.url}
                    target="_blank"
                    title={data.linkedinLink.title}
                  >
                    LinkedIn Profile
                  </Link>
                </li>
              </ul>
            </Section>
            <Section id="contact">
              <Title level="1">Contact</Title>
              <ul>
                <li>
                  <Link
                    level="primary"
                    href={data.meetingLink.url}
                    target="_blank"
                    icon={["fas", "calendar-plus"]}
                    title={data.meetingLink.title}
                  >
                    Book a free 30 mins conversation
                  </Link>
                </li>
                <li>
                  <Link
                    icon={["fas", "envelope"]}
                    href={"mailto:" + data.emailLink.url}
                    title={data.emailLink.title}
                  >
                    Email me at {data.emailLink.url}
                  </Link>
                </li>
                <li>
                  <Link
                    icon={["fab", "whatsapp-square"]}
                    href={data.whatsappLink.url}
                    target="_blank"
                    title={data.whatsappLink.title}
                  >
                    Message me on WhatsApp
                  </Link>
                </li>
              </ul>
            </Section>
          </Container>
        </Grid>
        <Grid>
          <Container className="split">
            <Title level="1">Credits</Title>
            <Section>
              <Title level="2">License</Title>
              <Emoji symbol="🇪🇺" label="Flag: European Union" /> Published under
              EUPL v1.2
            </Section>
            <Section>
              <Title level="2">Made by</Title>
              <Emoji symbol="✌️" label="Victory Hand Emoji" /> 100% designed and
              coded by me{" | "}
              <Link
                className="inverted"
                href="https://github.com/jyulzz/portfolio3"
                target="_blank"
                level=""
                title="View on GitHub"
              >
                GitHub <FontAwesomeIcon icon={faLongArrowRight} />
              </Link>
            </Section>
          </Container>
          <Container className="split">
            <Section>
              <Title level="2">Inspiration</Title>
              <Emoji symbol="🙏" label="Person With Folded Hands Emoji" /> Many
              thanks
              <Credits />
            </Section>
            <Section>
              <Title level="2">Stack</Title>
              <Emoji symbol="💪" label="Flexed Biceps Emoji" /> What I build
              this with
              <Technologies />
            </Section>
          </Container>
        </Grid>
      </View>
    </footer>
  );
};
/* ----------------------------------------------------------------------------*
  /COMPONENTS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  PROPS
*---------------------------------------------------------------------------- */
Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

Footer.defaultProps = {
  children: [],
};
/* ----------------------------------------------------------------------------*
  /PROPS
*---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------*
  EXPORTS
*---------------------------------------------------------------------------- */
export default Footer;
/* ----------------------------------------------------------------------------*
  /EXPORTS
*---------------------------------------------------------------------------- */
