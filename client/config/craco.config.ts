import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const cracoConfig = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }: { webpackConfig: any }) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
          return webpackConfig;
        },
      },
    },
  ],
};

export default cracoConfig;
