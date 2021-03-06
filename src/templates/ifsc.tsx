import { Breadcrumb, BreadcrumbLink } from "../components/breadcrumb";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import { graphql } from "gatsby";
import React from "react";

interface IFSCProps {
  readonly IFSC: string;
  readonly BANK: string;
  readonly BRANCH: string;
  readonly CITY: string;
  readonly STATE: string;
  readonly CENTRE: string;
  readonly ADDRESS: string;
  readonly CONTACT: string;
  readonly MICR: string;
  readonly bankSlug: string;
  readonly stateSlug: string;
  readonly citySlug: string;
}

interface Node {
  readonly node: IFSCProps;
}

interface IFSCPageProps {
  readonly data: {
    readonly allIfscJson: {
      readonly edges: ReadonlyArray<Node>;
    };
  };
}

const getSEOTitle = (
  bank: string,
  state: string,
  city: string,
  branch: string,
  ifsc: string
) => {
  return `${bank} ${branch} branch, ${city}, ${state} - ${ifsc} - IFSC, MICR codes`;
};

const getSEODescription = (
  bank: string,
  state: string,
  city: string,
  branch: string,
  ifsc: string
) => {
  return `${bank} ${branch} branch, ${city}, ${state} - ${ifsc} - IFSC, MICR codes, branch address and contact number`;
};

const IFSC: React.FC<IFSCPageProps> = ({ data }) => {
  const { allIfscJson } = data;
  const node = allIfscJson.edges[0].node;
  const {
    IFSC: ifsc,
    BANK: bank,
    BRANCH: branch,
    CITY: city,
    STATE: state,
    CENTRE: centre,
    ADDRESS: address,
    CONTACT: contact,
    MICR: micr,
    bankSlug,
    stateSlug,
    citySlug
  } = node;

  return (
    <Layout>
      <React.Fragment>
        <SEO
          title={getSEOTitle(bank, state, city, branch, ifsc)}
          description={getSEODescription(bank, state, city, branch, ifsc)}
        />
        <Breadcrumb>
          <BreadcrumbLink to="/">All banks</BreadcrumbLink>
          <BreadcrumbLink to={`/${bankSlug}`}>{bank}</BreadcrumbLink>
          <BreadcrumbLink to={`/${bankSlug}/${stateSlug}`}>
            {state}
          </BreadcrumbLink>
          <BreadcrumbLink to={`/${bankSlug}/${stateSlug}/${citySlug}`}>
            {city}
          </BreadcrumbLink>
          <BreadcrumbLink to="#" current>
            {branch}
          </BreadcrumbLink>
        </Breadcrumb>
        <section className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">ISFC Code: {ifsc}</h1>
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <th>IFSC Code</th>
                    <td>{ifsc}</td>
                  </tr>
                  <tr>
                    <th>Bank</th>
                    <td>{bank}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>{branch}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{city}</td>
                  </tr>
                  <tr>
                    <th>Centre</th>
                    <td>{centre}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{state}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{address}</td>
                  </tr>
                  <tr>
                    <th>Contact</th>
                    <td>{contact}</td>
                  </tr>
                  <tr>
                    <th>MICR Code</th>
                    <td>{micr}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </React.Fragment>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    allIfscJson(filter: { id: { eq: $id } }) {
      edges {
        node {
          IFSC
          BANK
          BRANCH
          CITY
          STATE
          CENTRE
          ADDRESS
          CONTACT
          MICR
          bankSlug
          stateSlug
          citySlug
        }
      }
    }
  }
`;

export default IFSC;
