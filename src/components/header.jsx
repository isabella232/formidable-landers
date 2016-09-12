import React from "react";
import Radium, { Style } from "radium";
import { merge } from "lodash";

// Asset
import LOGO_OSS from "../assets/logo-oss.svg";

class Header extends React.Component {
  getStyles() {
    return {
      base: {
        margin: 0
      },
      container: {
        // Lipstick
        fontFamily: "inherit",
        fontSize: "inherit",
        // Structure
        alignItems: "center",
        display: "flex",
        flex: "none",  // Sticky footer setup
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: this.props.padding
      },
      dark: {
        // Dark Theme
        background: `#242121 linear-gradient(to bottom, rgba(10,9,9,0) 85%, rgba(10,9,9,0.75) 100%)` //eslint-disable-line
      },
      light: {
        // Light Theme
        background: "#ffffff"
      },
      style: this.props.style,
      containerStyle: this.props.containerStyle
    };
  }

  getClassStyles(theme) {
    const base = {
      "svg": {
        fill: "currentColor"
      },
      "a:link": {
        textDecoration: "none",
        transition: "color 250ms ease-in, fill 300ms ease-in"
      },
      "a:visited": { /* Necessary to retain link order in <Style /> */
      },
      "a:hover, a:focus": {
        transition: "color 400ms ease-out, fill 500ms ease-out"
      },
      ".default": {
        marginTop: "16px", /* Align baseline of logo with baseline of link text */
        fontFamily: `"akkurat", "Inconsolata", monospace`,
        fontSize: "13px",
        letterSpacing: "0.15em",
        lineHeight: 2,
        textTransform: "uppercase"
      },
      ".default *": {
        display: "inline-block",
        marginLeft: "2em"
      }
    };
    const dark = {
      "a:link": {
        color: "#fff"
      },
      "a:visited": {
        color: "#e7e5e3"
      },
      "a:hover, a:focus": {
        color: "#dc7a6b"
      }
    };
    const light = {
      "a:link": {
        color: "#242121"
      },
      "a:visited": {
        color: "#242121"
      },
      "a:hover, a:focus": {
        color: "#c43a31"
      }
    };

    if (theme === "light") {
      return merge(base, light);
    }
    return merge(base, dark);
  }

  render() {
    const styles = this.getStyles();
    const classStyles = this.getClassStyles(this.props.theme);
    return (
      <header
        className="formidableHeader"
        style={[
          styles.base,
          this.props.theme && styles[this.props.theme],
          this.props.style && styles.style
        ]}>
        <Style
          scopeSelector=".formidableHeader"
          rules={classStyles}
        />
        <div
          className="formidableHeader-container"
          style={[
            styles.container,
            this.props.containerStyle && styles.containerStyle
          ]}
        >
          <div
            style={{
              height: "50px",
              marginRight: "auto",
              overflow: "hidden"
            }}
          >
            <a
              href="https://formidable.com/open-source/"
              target="_blank"
              style={{ display: "flex", height: "inherit" }}
              dangerouslySetInnerHTML={{ __html: LOGO_OSS }}
            />
          </div>
          {this.props.children}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  children: React.PropTypes.node,
  containerStyle: React.PropTypes.object,
  padding: React.PropTypes.string,
  style: React.PropTypes.object,
  theme: React.PropTypes.oneOf(["light", "dark"])
};

const defaultHeaderChildren =
  <div className="default">
    <a href="https://twitter.com/FormidableLabs">Twitter</a>
    <a href="https://github.com/FormidableLabs/">Github</a>
  </div>;

Header.defaultProps = {
  children: defaultHeaderChildren,
  containerStyle: null,
  padding: "1.5rem 0",
  style: null,
  theme: "dark"
};

export default Radium(Header); //eslint-disable-line new-cap
