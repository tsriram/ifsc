import { Breadcrumb, BreadcrumbLink } from "../components/breadcrumb";
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
      readonly states: ReadonlyArray<string>;
      readonly cities: ReadonlyArray<string>;
      readonly banks: ReadonlyArray<string>;
      readonly branches: ReadonlyArray<string>;
    };
  };
}

const BankStateCityPage: React.FC<BankStateCityPageProps> = ({
  data,
  pageContext
}) => {
  const { branches, banks, states, cities } = data.allIfscJson;
  const { bankSlug, stateSlug, citySlug } = pageContext;
  const bank = banks[0];
  const state = states[0];
  const city = cities[0];

  return (
    <Layout>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbLink to="/">All banks</BreadcrumbLink>
          <BreadcrumbLink to={`${bankSlug}`}>{bank}</BreadcrumbLink>
          <BreadcrumbLink to={`/${bankSlug}/${stateSlug}`}>
            {state}
          </BreadcrumbLink>
          <BreadcrumbLink to="#" current>
            {city}
          </BreadcrumbLink>
        </Breadcrumb>
        <div className="columns is-multiline is-mobile">
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
      </React.Fragment>
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
      states: distinct(field: STATE)
      banks: distinct(field: BANK)
      cities: distinct(field: CITY)
      branches: distinct(field: BRANCH)
    }
  }
`;

export default BankStateCityPage;
