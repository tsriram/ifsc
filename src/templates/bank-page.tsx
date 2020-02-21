import { Breadcrumb, BreadcrumbLink } from "../components/breadcrumb";
import LabelSlug from "../interfaces/LabelSlug";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import SEO from "../components/SEO";
import React from "react";

interface Node {
  readonly bank: string;
  readonly bankSlug: string;
  readonly states: ReadonlyArray<LabelSlug>;
}

interface BankPageProps {
  readonly data: {
    readonly allBankStatesJson: {
      readonly nodes: ReadonlyArray<Node>;
    };
  };
}

const getSEOTitle = (bank: string) => {
  return `All ${bank} branches - IFSC, MICR codes`;
};

const getSEODescription = (bank: string) => {
  return `Find ${bank} IFSC, MICR code, branch address and contact number`;
};

const BankPage: React.FC<BankPageProps> = ({ data }) => {
  const { states, bank, bankSlug } = data.allBankStatesJson.nodes[0];
  return (
    <Layout>
      <React.Fragment>
        <SEO title={getSEOTitle(bank)} description={getSEODescription(bank)} />
        <Breadcrumb>
          <BreadcrumbLink to="/">All banks</BreadcrumbLink>
          <BreadcrumbLink to="#" current>
            {bank}
          </BreadcrumbLink>
        </Breadcrumb>
        <div className="columns is-multiline is-mobile">
          {states.map(state => {
            const statePageSlug = `/${bankSlug}/${state.slug}`;
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={state.label}
              >
                <Link to={statePageSlug}>
                  <div className="card">
                    <div className="card-content">{state.label}</div>
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
  query($id: String!) {
    allBankStatesJson(filter: { id: { eq: $id } }) {
      nodes {
        bank
        bankSlug
        states {
          label
          slug
        }
      }
    }
  }
`;

export default BankPage;
