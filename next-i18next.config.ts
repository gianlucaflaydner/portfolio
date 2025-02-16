/* eslint-disable @typescript-eslint/no-require-imports */
import { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt',
  },

  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
};

export default nextI18NextConfig;
