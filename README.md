[![npm version](https://badge.fury.io/js/%40launchpadlab%2Flp-hoc.svg)](https://badge.fury.io/js/%40launchpadlab%2Flp-hoc)

# lp-hoc

A set of React higher order components (HOCs).

Higher order components _wrap_ components to give them extra functionality. For instance, defining a callback to be triggered when a component mounts:

```js
import { onMount } from '@launchpadlab/lp-hoc'

function MyComponent() {
  return <div>I'm a component</div>
}

function myMountFunction(props) {
  // will be called when component mounts
}

export default onMount(myMountFunction)(MyComponent)
```

HOCs allow you to replicate the functionality of class-based components using functional components.

The HOCs in this library can be combined with [recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) HOCs- in fact, you can think of this library as an extension to that one.

A list of all available HOCs can be found in the [documentation](#documentaiton).

## A note about hooks

The use case of HOCs has been largely addressed by the addition of [React hooks](https://reactjs.org/docs/hooks-overview.html) in v16.8. If possible, we recommend you use hooks instead of HOCs when building new components.

Here's a handy reference for determining which hooks solve for the use-cases of `lp-hoc` components (corresponding `recompose` components in parentheses):

1. `getSet` (`withState`) -> `useState`
1. `modifyProps` (`withProps`) -> `useMemo` and `useCallback`
1. `onMount` -> `useEffect`
1. `onUnmount` -> `useEffect`
1. `onUpdate` -> `useEffect`
1. `waitFor` -> if statements

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
