# baka

[baka] is a dead stupid inliner / importer for scss files. Meaning after you run it, you'll end up with a single flattened scss file with little external dependencies.

## Installation

```shell
npm install @joneff/baka --save-dev
```

## Usage

```js
// compile
const baka = require('@joneff/baka');
const result = baka.compile('src/style.scss');
console.log(result.content);


// build
const baka = require('@joneff/baka');
baka.build('src/style.scss', 'dist/style.scss');


// build files
const baka = require('@joneff/baka');
baka.buildFiles('src/**/*.scss', { path: 'dist', filename: '[name].scss'});
```

## API

The api is modeled after sass js api with some inspiration from webpack.

### compile

```ts
function compile( file: string, options?: CompileOptions ) : CompileResult;
```

Synchronously compiles `file` to inline its imports. If it succeeds it returns [CompileResult], and if it fails it throws an [Exception].

### build

```ts
function build( file: string, outFile: string, options?: BuildOptions ) : void;
```

Internally calls [compile] for `file` and if successful, writes the content of [CompileResult] result to `outFile`.

### buildFiles

```ts
function buildFiles( fileOrGlob: string | string[], output: OutputOptions, options?: BuildOptions ) : void;
```

Internally calls [build] for each glob result of `fileOrGlob` and if successful, writes the content of [CompileResult] result to a location determined by [`output`](#outputoptions).

### Options

Controls how files are loaded and output. There are a four types of options: `CompileOptions` and `BuildOptions` that are identical to `SharedOption` and `OutputOptions`. Not all matter all the time. Here are the most important ones:

#### OutputOptions

```ts
type OutputOptions = {
    path: string;
    filename: string
};
```

Instructs baka on how and where it should output the result of compilation. Similar to [webpack output configuration](https://webpack.js.org/configuration/output), but only supports `path` and `filename`. Both are optional.

* `path` specifies the output directory. Preferably a relative path, though absolute paths are accepted as well. Defaults to `path.resolve(process.cwd(), 'dist')`.
* `filename` specifies the name of the output file. It supports the following [template strings](https://webpack.js.org/configuration/output/#template-strings): `[file]`, `[path]`, `[base]`, `[name]` and `[ext]` and they have the same meaning as with webpack. Defaults to `[name]-flat[ext]`.

## Bugs

I am not really a fan of complex regex for simple tasks, like parsing `@import`. The following is valid syntax:

```scss
 /**/  @import       "file.css"; /**/ //
```

Yet, baka will not match it. So you could say that there are intended bugs. Speaking of which, any framework that doesn't terminate `@import` statements with `;` will not be flattened. That means all frameworks using indented syntax.

## Contributing?

Sure.

[baka]: https://github.com/joneff/baka
[compile]: #compile
[build]: #build
[buildFiles]: #buildfiles
[options]: #options
[CompileResult]: #compileresult
[Exception]: #exception
