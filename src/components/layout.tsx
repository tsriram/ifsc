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
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
      <main>
        <section className="section">
          <div className="container">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
