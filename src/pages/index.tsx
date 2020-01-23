import Layout from "../components/layout";
import { graphql } from "gatsby";
import React from "react";

interface Node {
  readonly node: {
    readonly BANK: string;
  };
}

interface HomePageProps {
  readonly data: {
    readonly allIfscJson: {
      readonly edges: ReadonlyArray<Node>;
    };
  };
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { edges } = data.allIfscJson;
  return (
    <Layout>
      <React.Fragment>
        <h1 className="title">Banks</h1>
        <div className="columns is-multiline is-mobile is-centered">
          {edges.map(edge => {
            const { BANK: bank } = edge.node;
            return (
              <div
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                key={bank}
              >
                <div className="card">
                  <div className="card-content">{bank}</div>
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
  query {
    allIfscJson {
      edges {
        node {
          BANK
        }
      }
    }
  }
`;

export default HomePage;
