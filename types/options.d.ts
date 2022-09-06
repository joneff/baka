/**
 * Shared options that can be passed to [[compile]], [[build]]
 * and [[buildFiles]].
 *
 * @category Options
 */
declare type SharedOptions = {
    cwd?: string;
    nodeModules?: string;
    importedFiles?: Set<string>;
    importedPaths?: Array<string>;
    ignoredFiles?: Set<string>;
    ignorePatterns?: Array<string>;
};

/**
 * Options that can be passed to [[compile]].
 *
 * @category Options
 */
declare type CompileOptions = SharedOptions;

/**
 * Options that can be passed to [[build]].
 *
 * @category Options
 */
declare type BuildOptions = SharedOptions;

declare type OutputOptions = {
    path?: string;
    filename?: string;
}
