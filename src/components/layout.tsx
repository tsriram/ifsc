import React from "react";

import "../styles/index.scss";

interface LayoutProps {
  readonly children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => <main>{children}</main>;

export default Layout;
