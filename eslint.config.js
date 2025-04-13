import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPromise from 'eslint-plugin-promise'
import eslintPluginSecurity from 'eslint-plugin-security'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	eslintPluginImport.flatConfigs.recommended,
	eslintPluginImport.flatConfigs.errors,
	eslintPluginImport.flatConfigs.warnings,
	eslintPluginImport.flatConfigs.typescript,
	eslintPluginJsxA11y.flatConfigs.recommended,
	eslintPluginPromise.configs['flat/recommended'],
	eslintPluginSecurity.configs.recommended,
	eslintPluginUnicorn.configs['flat/recommended'],
	{
		rules: {
			// Prevents usage of unknown DOM properties on React elements.
			// We ignore 'jsx' and 'global' because they are custom props in certain setups
			// (e.g. styled-jsx).
			'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
		},
	},
]
