import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { slugify } from "../util";
import React from "react";

interface Node {
  readonly node: {
    readonly BANK: string;
    readonly STATE: string;
  };
}

interface BankPageProps {
  readonly data: {
    readonly allIfscJson: {
      readonly cities: ReadonlyArray<string>;
    };
  };
}

const IFSC: React.FC<BankPageProps> = ({ data }) => {
  const { cities } = data.allIfscJson;
  // const bank = banks[0];
  // const bankPageSlug = `/${slugify(bank)}`;
  return (
    <Layout>
      <React.Fragment>
        {/* <h1 className="title">{bank}</h1> */}
        <div className="columns is-multiline is-mobile is-centered">
          {cities.map(city => {
            // const statePageSlug = `${bankPageSlug}/${slugify(state)}`;
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={city}
              >
                {/* <Link to={statePageSlug}> */}
                <div className="card">
                  <div className="card-content">{city}</div>
                </div>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    </Layout>
  );
};

// TODO: There should be a better way to query this -- we need the bank based on slug and the list of states
// Not sure if using distinct to get the single bank is a good idea.
export const query = graphql`
  query($bankSlug: String!, $stateSlug: String!) {
    allIfscJson(
      filter: {
        fields: { bankSlug: { eq: $bankSlug }, stateSlug: { eq: $stateSlug } }
      }
    ) {
      cities: distinct(field: CITY)
    }
  }
`;

export default IFSC;
