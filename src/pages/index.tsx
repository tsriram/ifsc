import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import SEO from "../components/SEO";
import { slugify } from "../util";
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
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={bank}
              >
                <Link to={bankPageSlug}>
                  <div className="card">
                    <div className="card-content">{bank}</div>
                  </div>
                </Link>
              </div>
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
