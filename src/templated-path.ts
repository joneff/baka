import path from 'path';
const REGEXP = /\[([\w]+)\]/gi;


import type { PathData } from '../types';

// eslint-disable-next-line no-unused-vars
type TemplateFunction = ( options: PathData ) => string;

/**
 * @param {string} filePath path to file
 * @returns {PathData} parsed parts
 */
function parsePath( filePath : string ) : PathData {

    const pathData : PathData = <PathData> {};

    pathData.file = filePath.startsWith('./') ? filePath.slice(2) : filePath;
    pathData.ext = path.extname( pathData.file );
    pathData.base = path.basename( pathData.file );
    pathData.name = pathData.base.slice( 0, pathData.base.length - pathData.ext.length );
    pathData.path = pathData.file.slice( 0, pathData.file.length - pathData.base.length );

    return pathData;
}

/**
 * @param {string | (options: PathData) => string} template the raw path template
 * @param {string | PathData } filePath path to file or path data
 * @returns {string} the interpolated path
 */
export function replacePathVariables( template : string | TemplateFunction, filePath: string | PathData ) {

    const replacements = new Map<string, Function>();

    let result = template;
    let pathData = <PathData> filePath;

    if (pathData) {

        if (typeof pathData === 'string') {
            pathData = parsePath( pathData );
        }

        replacements.set('file', replacer(pathData.file));
        replacements.set('path', replacer(pathData.path, true));
        replacements.set('base', replacer(pathData.base));
        replacements.set('name', replacer(pathData.name));
        replacements.set('ext', replacer(pathData.ext, true));
    }

    if (typeof result === 'function') {
        result = <string> result(pathData);
    }

    result = result.replace( REGEXP, ( match, content ) => {
        const _replacer = replacements.get( content );

        if (_replacer !== undefined) {
            return _replacer( content, result );
        }

        return match;
    });

    return result;
}

function replacer(value: string | Function, allowEmpty?: boolean ) {

    function fn(match: string, input: string) {

        if (typeof value === 'function') {
            value = value(); // eslint-disable-line no-param-reassign
        }

        if (value === null || value === undefined) {
            if (!allowEmpty) {
                throw new Error(
                    `Variable ${match} not implemented in this context: ${input}`
                );
            }
            return '';
        }

        return `${value}`;
    }

    return fn;
}
