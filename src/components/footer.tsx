import * as React from "react";

const Footer: React.FC<{}> = props => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          All bank details like branch address, contact number are from open
          data and may not be up to date.
        </p>
      </div>
      <p>
        Made with ❤ and ☕️ by <a href="https://twitter.com/tsriram">Sriram</a>
      </p>
    </footer>
  );
};

export default Footer;
