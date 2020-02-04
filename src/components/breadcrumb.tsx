import * as React from "react";
import { Link } from "gatsby";

interface BreadcrumbProps {
  readonly children: JSX.Element | JSX.Element[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return (
    <div className="columns">
      <div className="column">
        <nav
          className="breadcrumb has-arrow-separator"
          aria-label="breadcrumbs"
        >
          <ul>{children}</ul>
        </nav>
      </div>
    </div>
  );
};

interface BreadcrumbLinkProps {
  readonly to: string;
  readonly current?: boolean;
  readonly children: string;
}

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  to,
  current = false,
  children
}) => {
  if (current) {
    return (
      <li className="is-active">
        <a href="#" aria-current="page">
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export { Breadcrumb, BreadcrumbLink };
