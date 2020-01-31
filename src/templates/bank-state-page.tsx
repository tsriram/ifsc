import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { slugify } from "../util";
import React from "react";

interface BankStatePageProps {
  readonly pageContext: {
    readonly bankSlug: string;
    readonly stateSlug: string;
  };
  readonly data: {
    readonly allIfscJson: {
      readonly states: ReadonlyArray<string>;
      readonly cities: ReadonlyArray<string>;
    };
  };
}

const BankStatePage: React.FC<BankStatePageProps> = ({ data, pageContext }) => {
  const { cities, states } = data.allIfscJson;
  const { bankSlug, stateSlug } = pageContext;
  const state = states[0];

  return (
    <Layout>
      <React.Fragment>
        <h1 className="title">{state}</h1>
        <div className="columns is-multiline is-mobile is-centered">
          {cities.map(city => {
            const citySlug = slugify(city);
            const bankStateCityPageSlug = `/${bankSlug}/${stateSlug}/${citySlug}`;
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={city}
              >
                <Link to={bankStateCityPageSlug}>
                  <div className="card">
                    <div className="card-content">{city}</div>
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
  query($bankSlug: String!, $stateSlug: String!) {
    allIfscJson(
      filter: {
        fields: { bankSlug: { eq: $bankSlug }, stateSlug: { eq: $stateSlug } }
      }
    ) {
      states: distinct(field: STATE)
      cities: distinct(field: CITY)
    }
  }
`;

export default BankStatePage;
