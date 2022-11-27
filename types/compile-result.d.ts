/**
 * The result of inlining Sass. Returned by [[compile]].
 *
 * @category Compile
 * @since 2.0.0
 */
export type CompileResult = {
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
