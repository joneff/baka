/**
 * The result of inlining Sass. Returned by [[compile]].
 *
 * @category Compile
 * @since 2.0.0
 */
declare interface CompileResult {
    /**
     * The inlined css / scss.
     */
    content: string;

    /**
     * The canonical URLs of all the stylesheets that were loaded during the
     * Sass compilation. The order of these URLs is not guaranteed.
     */
    loadedUrls: URL[];
}

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
export function compile(file: string, options?: CompileOptions) : CompileResult;
