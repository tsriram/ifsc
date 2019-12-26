import React from "react";

interface LayoutProps {
  readonly children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main style={{ margin: `3rem auto`, padding: `0 1rem` }}>{children}</main>
);

export default Layout;
