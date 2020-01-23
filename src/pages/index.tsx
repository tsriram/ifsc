import Layout from "../components/layout";
import { graphql } from "gatsby";
import React from "react";

interface HomePageProps {
  readonly data: {
    readonly allIfscJson: {
      readonly banks: ReadonlyArray<string>;
    };
  };
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { banks } = data.allIfscJson;
  return (
    <Layout>
      <React.Fragment>
        <h1 className="title">Banks</h1>
        <div className="columns is-multiline is-mobile is-centered">
          {banks.map(bank => {
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
      banks: distinct(field: BANK)
    }
  }
`;

export default HomePage;
