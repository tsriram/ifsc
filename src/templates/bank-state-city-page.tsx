import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { slugify } from "../util";
import React from "react";

interface BankStateCityPageProps {
  readonly pageContext: {
    readonly bankSlug: string;
    readonly stateSlug: string;
    readonly citySlug: string;
  };
  readonly data: {
    readonly allIfscJson: {
      readonly branches: ReadonlyArray<string>;
    };
  };
}

const BankStateCityPage: React.FC<BankStateCityPageProps> = ({
  data,
  pageContext
}) => {
  const { branches } = data.allIfscJson;
  const { bankSlug, stateSlug, citySlug } = pageContext;

  return (
    <Layout>
      <div className="columns is-multiline is-mobile is-centered">
        {branches.map(branch => {
          const branchSlug = `${slugify(branch)}-branch`;
          const ifscPageSlug = `/${bankSlug}/${stateSlug}/${citySlug}/${branchSlug}`;
          return (
            <div
              className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
              key={branch}
            >
              <Link to={ifscPageSlug}>
                <div className="card">
                  <div className="card-content">{branch}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($bankSlug: String!, $stateSlug: String!, $citySlug: String!) {
    allIfscJson(
      filter: {
        fields: {
          bankSlug: { eq: $bankSlug }
          stateSlug: { eq: $stateSlug }
          citySlug: { eq: $citySlug }
        }
      }
    ) {
      branches: distinct(field: BRANCH)
    }
  }
`;

export default BankStateCityPage;
