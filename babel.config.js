module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',       // <- This is correct in presets
    ],
    plugins: [
      'react-native-reanimated/plugin',  // if using Reanimated
      'expo-router/babel',               // if using Expo Router
    ],
  };
};
