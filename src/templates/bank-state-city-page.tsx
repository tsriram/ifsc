import { Breadcrumb, BreadcrumbLink } from "../components/breadcrumb";
import LabelSlug from "../interfaces/LabelSlug";
import LinkCard from "../components/link-card";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import { graphql } from "gatsby";
import React from "react";

interface Node {
  readonly bank: string;
  readonly bankSlug: string;
  readonly state: string;
  readonly stateSlug: string;
  readonly city: string;
  readonly citySlug: string;
  readonly branches: ReadonlyArray<LabelSlug>;
}

interface BankStateCityPageProps {
  readonly data: {
    readonly allBankStateCityBranchesJson: {
      readonly nodes: ReadonlyArray<Node>;
    };
  };
}

const getSEOTitle = (bank: string, state: string, city: string) => {
  return `All ${bank} branches in ${city}, ${state} - IFSC, MICR codes`;
};

const getSEODescription = (bank: string, state: string, city: string) => {
  return `Find ${bank} IFSC, MICR code, branch address and contact number in ${city}, ${state}`;
};

const BankStateCityPage: React.FC<BankStateCityPageProps> = ({ data }) => {
  const {
    branches,
    bank,
    bankSlug,
    state,
    stateSlug,
    city,
    citySlug
  } = data.allBankStateCityBranchesJson.nodes[0];

  return (
    <Layout>
      <React.Fragment>
        <SEO
          title={getSEOTitle(bank, state, city)}
          description={getSEODescription(bank, state, city)}
        />
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
            const ifscPageSlug = `/${bankSlug}/${stateSlug}/${citySlug}/${branch.slug}-branch`;
            return (
              <LinkCard linkTo={ifscPageSlug} key={branch.label}>
                {branch.label}
              </LinkCard>
            );
          })}
        </div>
      </React.Fragment>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    allBankStateCityBranchesJson(filter: { id: { eq: $id } }) {
      nodes {
        bank
        bankSlug
        state
        stateSlug
        city
        citySlug
        branches {
          label
          slug
        }
      }
    }
  }
`;

export default BankStateCityPage;
