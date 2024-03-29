# [2.1.0](https://github.com/joneff/baka/compare/v2.0.1...v2.1.0) (2022-11-27)


### Features

* use esbuild ([09f673a](https://github.com/joneff/baka/commit/09f673a97497f3e47f1f19df25f3ece35a01e5ba))
* use typescript ([ae5366e](https://github.com/joneff/baka/commit/ae5366e89d2d1d43a60e30c5543e57a2a7ced661))

## [2.0.1](https://github.com/joneff/baka/compare/v2.0.0...v2.0.1) (2022-09-19)


### Bug Fixes

* do not use extra path.posix when not needed ([068e4b2](https://github.com/joneff/baka/commit/068e4b223a69dccf2d388e01914b052040969831))

# [2.0.0](https://github.com/joneff/baka/compare/v1.1.0...v2.0.0) (2022-09-08)


### Features

* streamline api ([a807eda](https://github.com/joneff/baka/commit/a807edacfbfe9d25cc5ee619b561953c988c60a6))


### BREAKING CHANGES

* rename `baka.render` to `baka.compile`

```js
// old
baka.render( options: BakaOptions );

// new
baka.compile( file: string, options: CompileOptions );
```
* change `baka.build` signature

```js
// old
baka.build( options: BakaOptions );

// new
baka.compile( file: string, outFile: string, options: BuildOptions );
```
* remove baka lite

# [1.1.0](https://github.com/joneff/baka/compare/v1.0.1...v1.1.0) (2021-08-31)


### Features

* add baka annotations to allow skip and ignore files ([953f4e1](https://github.com/joneff/baka/commit/953f4e1b93bfb60eca55c876530ec44cff0e8710))

## [1.0.1](https://github.com/joneff/baka/compare/v1.0.0...v1.0.1) (2021-07-29)


### Bug Fixes

* include src folder in dist ([aff2da4](https://github.com/joneff/baka/commit/aff2da4cd989fb170c9b2e5d6d269fb9fd851261))

# [1.0.0](https://github.com/joneff/baka/compare/v0.5.1...v1.0.0) (2021-07-29)


### Features

* streamline api ([c86a521](https://github.com/joneff/baka/commit/c86a521f2be6ee6942fe4406fc1a99cfbe54f390))


### BREAKING CHANGES

* use options object instead of params
