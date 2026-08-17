import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

// eslint-config-next 16 ships native flat configs. Routing them through
// FlatCompat, as the create-next-app scaffold did, throws on a circular
// structure — the shim is for eslintrc-era configs only.
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      '.claude/**',
      '.impeccable/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
