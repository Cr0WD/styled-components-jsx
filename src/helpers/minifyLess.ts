/* Precompile regular expressions */
const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g
const symbolRegex = /\s*([{}:;,>~+()])\s*/g
const whitespaceRegex = /\s+/g
const semicolonRegex = /;}/g

/**
 * Minifies a LESS string by removing comments, extra spaces, and unnecessary semicolons.
 *
 * @param {string} lessString - The LESS string to be minified.
 * @returns {string} - The minified LESS string.
 */
export function minifyLess(lessString: string): string {
	return lessString
		.replaceAll(commentRegex, '') // Remove multi-line and single-line comments
		.replaceAll(symbolRegex, '$1') // Remove extra spaces around symbols
		.replaceAll(whitespaceRegex, ' ') // Compress remaining whitespace to a single space
		.replaceAll(semicolonRegex, '}') // Remove extra semicolons before closing braces
		.trim() // Trim spaces from the beginning and end
}

console.log('test')
