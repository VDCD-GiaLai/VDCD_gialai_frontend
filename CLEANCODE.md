- Follow the user’s requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
- Focus on easy and readability code, over being performant.
- Fully implement all requested functionality.
- Leave NO todo’s, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalised.
- Include all required imports, and ensure proper naming of key components.
- Be concise Minimize any other prose.
- If you think there might not be a correct answer, you say so.
- If you do not know the answer, say so, instead of guessing.

### Code Implementation Guidelines

Follow these rules when you write code:

- Use early returns whenever possible to make the code more readable.
- Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.
- Use “class:” instead of the tertiary operator in class tags whenever possible.
- Use descriptive variable and function/const names. Also, event functions should be named with a “handle” prefix, like “handleClick” for onClick and “handleKeyDown” for onKeyDown.
- Implement accessibility features on elements. For example, a tag should have a tabindex=“0”, aria-label, on:click, and on:keydown, and similar attributes.
- Use consts instead of functions, for example, “const toggle = () =>”. Also, define a type if possible.
- Following clean architecture when writing code.

### Project Structure Guidelines

- **services**: Contains business logic (e.g., API calls, complex data processing).
- **types**: Contains interface and type definitions (TypeScript)..
- **components**: Contains reusable components that can be used on multiple pages.
- **hooks**: Contains React custom hooks.

### Additional Clean Code Rules

- Split large pages (>300 lines) into smaller components
- Use props-driven design, avoid hardcoding UI data
- Separate business logic into services or hooks
- Extract complex state logic into custom hooks
- Follow strict folder structure
- Store constants/config separately
- Build reusable UI components first
- Always handle loading, error, success states
- Improve accessibility (aria, keyboard events)
- Avoid deep JSX nesting (>4 levels)
- Maintain consistent naming conventions

### Code Duplication (DRY - Don't Repeat Yourself)

- **Shared Components**: Any UI pattern repeated more than twice (e.g., Auth Cards, Input groups, Buttons) must be extracted into `src/components/common` or `src/components/ui`.
- **Centralized Logic**: Business logic, API calls, and data normalization must reside in Services (`src/services`) or Hooks (`src/hooks`), never inside the Component.
- **Constant Management**: All UI labels, error messages, and configurations must be stored in `src/constants`.
- **Type Sharing**: Reuse interfaces and types from `src/types` across the project. Do not redefine the same structure in multiple files.