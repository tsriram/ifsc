import Layout from "../components/layout";
import { graphql } from "gatsby";
import React from "react";

interface IFSCProps {
  readonly ifsc: string;
  readonly bank: string;
  readonly branch: string;
  readonly city: string;
  readonly state: string;
  readonly centre: string;
  readonly address: string;
  readonly contact: string;
  readonly micr: string;
}

interface Node {
  readonly node: IFSCProps;
}

interface IFSCPageProps {
  readonly data: {
    readonly allIfscCsv: {
      readonly edges: ReadonlyArray<Node>;
    };
  };
}

const IFSC: React.FC<IFSCPageProps> = ({ data }) => {
  const { allIfscCsv } = data;
  const node = allIfscCsv.edges[0].node;
  const {
    ifsc,
    bank,
    branch,
    city,
    state,
    centre,
    address,
    contact,
    micr
  } = node;
  return (
    <Layout>
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
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    allIfscCsv(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          ifsc
          bank
          branch
          city
          state
          centre
          address
          contact
          micr
        }
      }
    }
  }
`;

export default IFSC;
