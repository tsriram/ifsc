import * as React from "react";
import { Link } from "gatsby";

interface LinkCardProps {
  readonly linkTo: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ linkTo, children }) => {
  return (
    <div className="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <Link to={linkTo}>
        <div className="card link-card">
          <div className="card-content">{children}</div>
        </div>
      </Link>
    </div>
  );
};

export default LinkCard;
