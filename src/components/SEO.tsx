import { Helmet } from "react-helmet";
import * as React from "react";

interface SEOProps {
  readonly title: string;
  readonly description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
      </Helmet>
    </React.Fragment>
  );
};

export default SEO;
