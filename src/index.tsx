import React, { ElementType, JSX, ReactNode } from 'react'
import { minifyLess } from './helpers/minifyLess'

/**
 * Type definition for the styled function.
 * Supports both HTML elements and React components.
 */
type StyledComponent<T extends ElementType> = <P extends object = React.ComponentProps<T>>(
	styles: TemplateStringsArray,
	...interpolations: Array<((properties: P) => string | number) | string | number>
) => (properties: P & { children?: ReactNode; className?: string }) => JSX.Element

/**
 * Filters out props starting with '$' or custom props not accepted by HTML elements.
 */
const filterDollarProperties = <T extends Record<string, unknown>>(properties: T): Partial<T> =>
	Object.fromEntries(
		Object.entries(properties).filter(([key]) => !key.startsWith('$'))
	) as Partial<T>

/**
 * Base function to create styled components.
 *
 * @param Component - An HTML tag (e.g., "div", "button") or a React component.
 * @returns A function that takes CSS styles and returns a styled component.
 */
const createStyled =
	<T extends ElementType>(Component: T): StyledComponent<T> =>
	(styles, ...interpolations) =>
	properties => {
		// Non-removable class reference for this plugin
		const classNameReference = '🎨'

		// Process styles and replace interpolations with actual prop values
		const processedStyles = styles
			.map((style, index) => {
				const interpolation = interpolations[index]
				const value =
					typeof interpolation === 'function'
						? interpolation(properties)
						: (interpolation ?? '')
				return style + value
			})
			.join('')

		const isCustomComponent = typeof Component !== 'string'
		const filteredProperties = isCustomComponent
			? properties
			: filterDollarProperties(properties)

		// Ensure Component is a valid React component or HTML tag
		const Element: ElementType = Component
		const content = `.${classNameReference}{${minifyLess(processedStyles)}}`

		return (
			<>
				<Element
					{...filteredProperties}
					className={[properties.className, classNameReference].filter(Boolean).join(' ')}
				>
					{properties.children}
				</Element>
				<style jsx>{content}</style>
			</>
		)
	}

/**
 * Utility type for mapping styled properties to common HTML elements.
 */
type StyledHTMLTags = {
	[Tag in keyof JSX.IntrinsicElements]: StyledComponent<Tag>
}

/**
 * Proxy-based styled function allowing:
 * - `styled("div")`
 * - `styled.div`
 */
const styled = new Proxy(createStyled, {
	get: (_, tag: keyof JSX.IntrinsicElements) => createStyled(tag),
}) as typeof createStyled & StyledHTMLTags

export { minifyLess }

export default styled
