import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import Footer from "./footer";
import React from "react";

import "../styles/index.scss";

interface LayoutProps {
  readonly children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className="site">
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              IƒSC
            </Link>
          </div>
        </nav>
        <main className="site-content">
          <section className="section">
            <div className="container">{children}</div>
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
