/// <reference path="./options.d.ts" />
/// <reference path="./compile.d.ts" />

import { compile } from './compile';
import { build, buildFiles } from './build';

declare type Baka = {
    compile: typeof compile;
    build: typeof build;
    buildFiles: typeof buildFiles;
}

export = Baka;
export as namespace Baka;
