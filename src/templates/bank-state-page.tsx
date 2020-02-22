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
  readonly cities: ReadonlyArray<LabelSlug>;
}

interface BankStatePageProps {
  readonly data: {
    readonly allBankStateCitiesJson: {
      readonly nodes: ReadonlyArray<Node>;
    };
  };
}

const getSEOTitle = (bank: string, state: string) => {
  return `All ${bank} branches in ${state} - IFSC, MICR codes`;
};

const getSEODescription = (bank: string, state: string) => {
  return `Find ${bank} IFSC, MICR code, branch address and contact number in ${state}`;
};

const BankStatePage: React.FC<BankStatePageProps> = ({ data }) => {
  const {
    cities,
    bank,
    bankSlug,
    state,
    stateSlug
  } = data.allBankStateCitiesJson.nodes[0];

  return (
    <Layout>
      <React.Fragment>
        <SEO
          title={getSEOTitle(bank, state)}
          description={getSEODescription(bank, state)}
        />
        <Breadcrumb>
          <BreadcrumbLink to="/">All banks</BreadcrumbLink>
          <BreadcrumbLink to={`/${bankSlug}`}>{bank}</BreadcrumbLink>
          <BreadcrumbLink to="#" current>
            {state}
          </BreadcrumbLink>
        </Breadcrumb>
        <div className="columns is-multiline is-mobile">
          {cities.map(city => {
            const bankStateCityPageSlug = `/${bankSlug}/${stateSlug}/${city.slug}`;
            return (
              <LinkCard linkTo={bankStateCityPageSlug} key={city.label}>
                {city.label}
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
    allBankStateCitiesJson(filter: { id: { eq: $id } }) {
      nodes {
        bank
        bankSlug
        state
        stateSlug
        cities {
          label
          slug
        }
      }
    }
  }
`;

export default BankStatePage;
