import * as React from "react";
import { Link } from "gatsby";

interface BreadcrumbProps {
  readonly children: JSX.Element | JSX.Element[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>{children}</ul>
    </nav>
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
  return (
    <li className={current ? "is-active" : ""}>
      <Link to="#" aria-current={current ? "page" : undefined}>
        {children}
      </Link>
    </li>
  );
};

export { Breadcrumb, BreadcrumbLink };
