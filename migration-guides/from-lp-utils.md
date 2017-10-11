## Migrating from lp-utils

There are several breaking changes between `lp-utils v2` and `lp-hoc v1`:

1. All non-HOC utils have been removed from the library. You can import `validate` from `lp-form` and `selectorForSlice` from `lp-redux-utils`. You can also import `getDisplayName` from `recompose` and `deprecate` from `util-deprecate`.
1. `deprecateComponent` has been renamed to `deprecate`.
1. `componentWithClass` has been replaced by the `addDefaultClass` HOC.
1. `onLoad` has been renamed to `waitFor`
1. `toggle` value prop names are now the same as the argument, rather than `<argument>Active`
1. `getSet` props now override passed props.
