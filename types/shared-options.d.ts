/**
 * Shared options that can be passed to [[compile]], [[build]]
 * and [[buildFiles]].
 *
 * @category Options
 */
export type SharedOptions = {
    cwd: string;
    root: boolean;
    nodeModules: string;
    importedFiles: Set<string>;
    importedPaths: Array<string>;
    ignoredFiles: Set<string>;
    ignorePatterns: Array<string>;
};
