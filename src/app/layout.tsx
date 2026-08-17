import type { ReactNode } from 'react';

// The locale layout owns <html> and <body>; this root exists only because the
// App Router requires a layout at the top of the tree.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
