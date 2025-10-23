module.exports = {
  presets: [
    '@babel/preset-env',  // Transpile modern JavaScript to compatible versions
    '@babel/preset-react' // Transpile JSX into JavaScript
  ],
  plugins: [
    // Add any plugins you might need here, like class properties, etc.
    '@babel/plugin-proposal-class-properties', // Support for class properties
    '@babel/plugin-transform-runtime' // Optimizes helper code
  ],
};
