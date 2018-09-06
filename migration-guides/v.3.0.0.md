# v3.0.0 Migration Guide

The only breaking change in this version is that the `name` prop is now required in the `modal` component. The usage of `displayName` is no longer supported.

For example, use the following updated syntax:

```
export default modal({ name: 'AlertModal' })
```

instead of the previous syntax:

```
AlertModal.displayName = 'AlertModal'
```
