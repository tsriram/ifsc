import React from "react";

interface LayoutProps {
  readonly children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    {children}
  </div>
);

export default Layout;
