export type BakaOptions = {
    cwd: string,
    nodeModules: string,
    file: string,
    output: OutputOptions,
    importedFiles: Set<string>,
    importedPaths: Array<string>
    ignoredFiles: Set<string>,
    ignorePatterns: Array<string>
}

export type OutputOptions = {
    filename: string,
    path: string
}

export type PathData = {
    file: string,
    path: string,
    base: string,
    name: string,
    ext: string
}
