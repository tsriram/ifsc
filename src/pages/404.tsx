import Layout from "../components/layout";
import React from "react";
import { Link } from "gatsby";

const NotFoundPage: React.FC<{}> = () => {
  return (
    <Layout>
      <h1 className="title">Oops, page not found</h1>
      <div>
        <Link to="/">Go to home page</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
