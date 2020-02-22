import LinkCard from "../components/link-card";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import { slugify } from "../util";
import { graphql } from "gatsby";
import React from "react";

interface HomePageProps {
  readonly data: {
    readonly allIfscJson: {
      readonly banks: ReadonlyArray<string>;
    };
  };
}

const getSEOTitle = () => {
  return `All bank branches in India - IFSC, MICR codes`;
};

const getSEODescription = () => {
  return `Find IFSC, MICR code, branch address and contact number of all banks in India`;
};

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { banks } = data.allIfscJson;
  return (
    <Layout>
      <React.Fragment>
        <SEO title={getSEOTitle()} description={getSEODescription()} />
        <h1 className="title">Banks</h1>
        <div className="columns is-multiline is-mobile">
          {banks.map(bank => {
            const bankPageSlug = `/${slugify(bank)}`;
            return (
              <LinkCard linkTo={bankPageSlug} key={bank}>
                {bank}
              </LinkCard>
            );
          })}
        </div>
      </React.Fragment>
    </Layout>
  );
};

export const query = graphql`
  query {
    allIfscJson {
      banks: distinct(field: BANK)
    }
  }
`;

export default HomePage;
