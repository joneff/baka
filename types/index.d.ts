export * from './build-options';
export * from './compile-options';
export * from './shared-options';
export * from './compile-result';
export * from './output-options';
export * from './path-data';

import { BuildOptions } from './build-options';
import { CompileOptions } from './compile-options';
import { CompileResult } from './compile-result';
import { OutputOptions } from './output-options';

/**
 * Internally calls [[compile]] for `file` and if successful, writes the content
 * of [[CompileResult]] to `outFile`.
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * baka.build('style.scss', 'dist/style.scss');
 * ```
 *
 * @category Build
 * @since 2.0.0
 */
export function build( file: string, outFile: string, options?: BuildOptions ): void;

/**
 * Internally calls [[build]] for each glob result of `fileOrGlob` and if
 * successful, writes the content of [[CompileResult]] to a location determined
 * by `output`, and if it fails it throws an [[Exception]].
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * baka.buildFiles('style.scss'); // => dist/style.scss
 * baka.buildFiles('style.scss', { path: '.tmp' }); // => .tmp/style.scss
 * baka.buildFiles('style.scss', { filename: '[name]_flat[ext]' }); // => dist/style_flat.scss
 * ```
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * baka.buildFiles(['styleA.scss', 'styleB.scss']); // => dist/styleA.scss, styleB.scss
 * baka.buildFiles(['styleA.scss', 'styleB.scss'], { path: '.tmp' }); // => .tmp/styleA.scss, styleB.scss
 * baka.buildFiles(['styleA.scss', 'styleB.scss'], { filename: '[name]_flat[ext]' }); // => .tmp/styleA_flat.scss, styleB_flat.scss
 * ```
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * baka.buildFiles('*.scss'); // => dist/[name].scss
 * baka.buildFiles('*.scss', { path: '.tmp' }); // => .tmp/[name].scss
 * baka.buildFiles('*.scss', { filename: '[name]_flat[ext] }); // => dist/[name]_flat.scss
 * ```
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * baka.buildFiles(['dirA/*.scss', 'dirB/*.scss']); // => dist/[name].scss
 * baka.buildFiles(['dirA/*.scss', 'dirB/*.scss'], { path: '.tmp' }); // => .tmp/[name].scss
 * baka.buildFiles(['dirA/*.scss', 'dirB/*.scss'], { filename: '[name]_flat[ext] }); // => dist/[name]_flat.scss
 * ```
 *
 * @category Build
 * @since 2.0.0
 */
export function buildFiles( fileOrGlob: string | string[], output: OutputOptions, options?: BuildOptions ): void;

/**
 * Synchronously compiles `file` to inline its imports. If it succeeds it returns
 * [[CompileResult]], and if it fails it throws an [[Exception]].
 *
 * @example
 *
 * ```js
 * const baka = require('@joneff/baka');
 *
 * const result = baka.compile('style.scss');
 * console.log(result.content);
 * ```
 *
 * @category Compile
 * @since 2.0.0
 */
export function compile( file: string, options: CompileOptions ): CompileResult;
