import Layout from "../components/layout";
import { graphql } from "gatsby";
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
      readonly states: ReadonlyArray<string>;
      readonly banks: ReadonlyArray<Node>;
    };
  };
}

const IFSC: React.FC<BankPageProps> = ({ data }) => {
  const { states, banks } = data.allIfscJson;
  console.log("banks: ", banks);
  return (
    <Layout>
      <React.Fragment>
        <h1 className="title">{banks[0]}</h1>
        <div className="columns is-multiline is-mobile is-centered">
          {states.map(state => {
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={state}
              >
                <div className="card">
                  <div className="card-content">{state}</div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    </Layout>
  );
};

export const query = graphql`
  query($bankSlug: String!) {
    allIfscJson(filter: { fields: { bankSlug: { eq: $bankSlug } } }) {
      states: distinct(field: STATE)
      banks: distinct(field: BANK)
    }
  }
`;

export default IFSC;
