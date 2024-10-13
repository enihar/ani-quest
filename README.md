# AniQuest

#### https://ani-quest-5o87.vercel.app

---

<img width="325" alt="Screenshot 2024-10-13 at 5 37 01 pm" src="https://github.com/user-attachments/assets/7f40ff93-5f61-4b80-a738-ae5b78f4f5c0">

<img width="327" alt="Screenshot 2024-10-13 at 5 36 26 pm" src="https://github.com/user-attachments/assets/f0dcb13c-03e7-419a-a430-d4577cde618b">

<img width="325" alt="Screenshot 2024-10-13 at 5 36 44 pm" src="https://github.com/user-attachments/assets/0110acdb-b104-4a18-8361-57189cdf4ba6">

---

## <img width="1907" alt="Screenshot 2024-10-13 at 5 29 11 pm" src="https://github.com/user-attachments/assets/e4014a0b-1fff-469d-bf16-523c503616b7">

---

## <img width="1623" alt="Screenshot 2024-10-13 at 5 35 01 pm" src="https://github.com/user-attachments/assets/5efa6158-d38a-4c23-9310-d4fcad6d1b2a">

---

## <img width="1245" alt="Screenshot 2024-10-13 at 5 35 21 pm" src="https://github.com/user-attachments/assets/ff53e785-8c0c-42b7-a546-01583e4a0fcd">

---

<img width="762" alt="Screenshot 2024-10-13 at 5 35 35 pm" src="https://github.com/user-attachments/assets/cd70e5b0-84e2-4540-8970-664ae7ab422a">

---

## Tools and Libraries

- NextJS 14, TypeScript, ChakraUI, Tailwind CSS
- Apollo GraphQL Client
- Vercel for deployment and hosting
- GitHub Repository: https://github.com/enihar/ani-quest

---

## Technical Details

App can be visited at: https://ani-quest-5o87.vercel.app

- **Routing**
  - Public pages are `/` and `/sign-in`
  - Private page `/information` to browse animes
  - Private pages are protected by authentication logic in `middleware.ts`
- **State management**
  - User information is stored in cookies and session is managed in Context
  - For a small app, Context may not be strictly necessary, but it provides scalability for future use cases
  - Using Context also avoids redundant cookie reads throughout the app
  - For complex apps, `useReducer` with `context` or libraries like Redux, MobX would be preferred
  - Apollo client provides cahcing and state manamgemnt of API data out of the box
- Pagination of the graphql anime data
  - Every page can be directly linked & visited using query param e.g. `/information?page=3`
  - When not logged in, users are prompted to sign in and then redirected to the intended page
- **Data fetching**
  - `GetAnimeList` is queried on page load of `/information` which loads minimal data
  - The detail modal queries `GetAnimeDetails` for additional data when needed
  - `GetAnimeDetails` also skips if `animeId` is not selected
  - This approach avoids loading all data upfront, which can be slow and expensive, especially on a slow network
  - Fetching details on demand is more efficient since users may never visit the detail modal
- **Error handling**
  - GraphQL errors shown in userf friendly `toast` messages
  - Error boundary not implemented, but I would do it if there was more time
  - Username validation in place
- Modular component design for `navbar, user form, anime detail dialog, user setting modal`
  - `UserForm` component is shared across signin page and settings dialog
- **SEO**
  - `metadata` used to add `title` and `description`
  - Semantic HTML used
- **Security**
  - Anime description HTML is sanitised and rendered using `dangerouslySetInnerHTML`
- **User Experience**
  - All pages and components are responsive and tested across different devices
  - Skeleton loading during data loading to give users visual feedback
    - Also efficient in increasing perceived performance
  - Users are auto navigated to `/information` route after signing in
- **Type safety**
  - Both graphql queries are strongly typed
  - Component props also have types

---

## User Flow

- Users land on the `/` home page
- They can click on `Embark on Your Journey` or `Sign In` in the navigation bar
- This takes them to the `Sign In` page, where they can enter their information
- After signing in, users are automatically redirected to the `/information` page
  - Users can click on an anime image to view details in a modal
  - Users can navigate between pages using Next/Previous buttons
- Users can click on the avatar in the navigation bar to open a menu. From there, they can:
  - Edit user data via a modal
  - Sign out

---

## Style / CSS

- Tailwind CSS and Chakra UI theme have been extended to add custom colors
- Footer added for a complete design experience

---

## Accessibility

- Semantic HTML elements (`main`, `footer`, `header`) are used to create regions for screen readers
- The sign-in form uses `aria-label` attributes for the username and job title fields
- The user menu and anime detail modal are implemented with Chakra UI, ensuring built-in accessibility
- Anime images rendered in `button`
- Accessibility issues were tested and resolved using the **AXE** dev tool:
  - Improved color contrast for buttons
  - Removed an image initially created inside the menu list, as it did not meet ARIA guidelines
- The app currently has zero accessibility issues 🎉

---

## Reason for a modal to update user info

- The modal contains a small form that collects minimal information
- User data can be updated from any page without losing context
- Provides a quick and seamless in-page experience

---

## Not in Scope

- Performance
  - Its a small app and doesn't need a performance review yet
  - It may benefit from `React.memo` for the child components and `useCallback` for the click handlers sent as props
  - Premature optimisation not needed now without measurement
- Internalization
- Testing
  - Integration and VR tests using Playwright
  - Unit test for components, utility functions and business logic
- Logging and Analytics
