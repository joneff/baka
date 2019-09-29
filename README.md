# baka

[baka] is a dead stupid inliner / importer for sass and scss files. Meaning after you run it, you'll end up with a single flattened sass or scss file with little to no* external depenedencies.

\* baka uses [sass-import-resolver] internally, which in terms is based on [Sass `@import` documentation], which stipulates that explicitly declared imports of css files will not be processed. And external URLs, obviously.

## Installation

```shell
npm install @joneff/baka --save-dev
```

## Basic Usage

```javascript
const baka = require('@joneff/baka');

let src = '/path/to/src.scss';
let dest = '/path/to/dest.scss';

baka.compile(src, dest);
```

## API

The api has one method only.

### resolve()

* Signature: `function resolve( file: String ) : String`
* Signature: `function resolve( file: String, outFile: String ) : void`

`file` is required. `outFile` is optional and if omitted, the flattened content will be returned.

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
