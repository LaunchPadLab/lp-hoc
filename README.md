[ ![Codeship Status for LaunchPadLab/lp-hoc](https://app.codeship.com/projects/450efd80-9fb6-0135-f419-120a8ae84b1d/status?branch=master)](https://app.codeship.com/projects/253695) [![Test Coverage](https://api.codeclimate.com/v1/badges/6ceb340d06ccab4aa8e0/test_coverage)](https://codeclimate.com/repos/59f7457d93f0d002a5000253/test_coverage)
[![npm version](https://badge.fury.io/js/%40launchpadlab%2Flp-hoc.svg)](https://badge.fury.io/js/%40launchpadlab%2Flp-hoc) [![Greenkeeper badge](https://badges.greenkeeper.io/LaunchPadLab/lp-hoc.svg)](https://greenkeeper.io/)

# lp-hoc

A set of higher order components (HOC) for use in React apps.

## Documentation 
Documentation and usage info can be found in [docs.md](docs.md).


## Migration Guides
- [From lp-utils](migration-guides/from-lp-utils.md)
- [v2.0.0](migration-guides/v2.0.0.md)
- [v3.0.0](migration-guides/v3.0.0.md)
- [v4.0.0](migration-guides/v4.0.0.md)
- [v5.0.0](migration-guides/v5.0.0.md)

## Contribution
This package follows the Opex [NPM package guidelines](https://github.com/LaunchPadLab/opex/blob/master/gists/npm-package-guidelines.md). Please refer to the linked document for information on contributing, testing and versioning.

## Additional info

#### Cherry-picking imports
Along with ES module support, this library supports cherry-picked imports from the `lib` folder to reduce bundle sizes:
```js
import onUpdate from '@launchpadlab/lp-hoc/lib/onUpdate'
import onMount from '@launchpadlab/lp-hoc/lib/onMount'
```
You can also combine this feature with [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) to cherry-pick imports by default:
```js
// .babelrc
{
    "plugins": [
        ["transform-imports", {
            "@launchpadlab/lp-hoc": {
                "transform": "@launchpadlab/lp-hoc/lib/${member}",
                "preventFullImport": true
            }
        }]
    ]
}
```

#### Size Limit
This library uses [size-limit](https://github.com/ai/size-limit) to prevent size bloat. The `yarn size` script is run in CI to check that the package size is under the limit specified in [.size-limit.js](.size-limit.js). For a visualization of this package's relative dependency sizes, you can run `yarn size --why`.
