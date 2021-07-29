# baka

[baka] is a dead stupid inliner / importer for sass and scss files. Meaning after you run it, you'll end up with a single flattened sass or scss file with little external depenedencies.

## Installation

```shell
npm install @joneff/baka --save-dev
```

## Basic Usage

```js
const baka = require('@joneff/baka');

let file = '/path/to/file.scss';


// Basic usage
baka.render({ file }); // returns the result of compilation
baka.build({ file }); // writes the result of compilation to /dist

// Advance usage (for build)
const path = require('path');

baka.build({
    file: file,
    output: {
        path: path.resolve( __dirname, 'dist/flat' ),
        filename: 'flat-[name].scss'
    }
});
```

## API

The api is modeled after sass js api with some inspiration from webpack.

### render

`render( options: BakaOptions ) : String`

Synchronously compiles a file to inline its imports. If it succeeds, it returns the result as a string. It takes an [`options` object](#options), which must have [`file` key](#options.file) set.

### build

`build( options: BakaOptions ) : void`

Internally calls [render](#render) and if successful, writes the result to the file system.

### options

Controls how files are loaded and output. There are a handful of options, but not all matter all the time. Here are the most important ones:

#### options.file

`file: string`

Path to the file to compile.

#### options.output

`output: OutputOptions`

A set of options instructing baka on how and where it should output the result of compilation. Similar to [webpack output configuration](https://webpack.js.org/configuration/output), but only supports `path` and `filename`.

* `path` is the output directory as absolute path. Defaults to `path.join(process.cwd(), 'dist')`.
* `filename` determines the name of the output file. It suports the following [template strings](https://webpack.js.org/configuration/output/#template-strings): `[file]`, `[path]`, `[base]`, `[name]` and `[ext]` and they have the same meaning as with webpack. Defaults to `[name]-flat[ext]`.

## Bugs

I am not really a fan of complex regex for simple tasks, like parsing `@import`. The following is valid syntax:

```scss
 /**/  @import       "file.css"; /**/ //
```

Yet, baka will not match it. So you could say that there are intended bugs. Speaking of which, [uikit] can not be flattened right now.

## Contributing?

Sure.

[baka]: https://github.com/joneff/baka
[sass-import-resolver]: https://github.com/joneff/sass-import-resolver
[Sass `@import` documentation]: https://sass-lang.com/documentation/at-rules/import
[uikit]: https://getuikit.com/
