import * as React from "react";

const Footer: React.FC<{}> = props => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Disclaimer:</strong> All bank details like branch address,
          contact number are from open data and may not be up to date.
        </p>
        <p>
          Made with ❤ and ☕️ by{" "}
          <a href="https://twitter.com/tsriram">Sriram</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
