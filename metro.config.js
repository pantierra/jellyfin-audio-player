const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const { withSentryConfig } = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('./scripts/transformer.js'),
    },
    resolver: {
        assetExts: [
            ...assetExts.filter((ext) => ext !== 'svg'),
        ],
        sourceExts: [
            ...sourceExts,
            'svg',
            'md'
        ]
    },
};

module.exports = withSentryConfig(mergeConfig(defaultConfig, config));