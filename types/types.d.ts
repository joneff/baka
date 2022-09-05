declare type BakaOptions = {
    cwd: string,
    nodeModules: string,
    file: string,
    output: OutputOptions,
    importedFiles: Set<string>,
    importedPaths: Array<string>
    ignoredFiles: Set<string>,
    ignorePatterns: Array<string>
}

declare type OutputOptions = {
    filename: string,
    path: string
}

declare type PathData = {
    file: string,
    path: string,
    base: string,
    name: string,
    ext: string
}
