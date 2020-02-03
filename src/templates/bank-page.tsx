import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { slugify } from "../util";
import React from "react";

interface BankPageProps {
  readonly pageContext: {
    readonly bankSlug: string;
  };
  readonly data: {
    readonly allIfscJson: {
      readonly states: ReadonlyArray<string>;
      readonly banks: ReadonlyArray<string>;
    };
  };
}

const BankPage: React.FC<BankPageProps> = ({ data, pageContext }) => {
  const { states, banks } = data.allIfscJson;
  const { bankSlug } = pageContext;
  const bank = banks[0];
  return (
    <Layout>
      <React.Fragment>
        <nav
          className="breadcrumb has-arrow-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <Link to="/">All banks</Link>
            </li>
            <li className="is-active">
              <Link to="#" aria-current="page">
                {bank}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="columns is-multiline is-mobile">
          {states.map(state => {
            const statePageSlug = `${bankSlug}/${slugify(state)}`;
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={state}
              >
                <Link to={statePageSlug}>
                  <div className="card">
                    <div className="card-content">{state}</div>
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

// TODO: There should be a better way to query this -- we need the bank based on slug and the list of states
// Not sure if using distinct to get the single bank is a good idea.
export const query = graphql`
  query($bankSlug: String!) {
    allIfscJson(filter: { fields: { bankSlug: { eq: $bankSlug } } }) {
      states: distinct(field: STATE)
      banks: distinct(field: BANK)
    }
  }
`;

export default BankPage;
