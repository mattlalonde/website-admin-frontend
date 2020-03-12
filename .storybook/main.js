const path = require("path");

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    //'@storybook/addon-info',
    '@storybook/preset-create-react-app',
    {
        name: '@storybook/addon-docs',
        options: {
            configureJSX: true,
        },
    }
  ]
};
