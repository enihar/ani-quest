# AniQuest

#### https://ani-quest-5o87.vercel.app

---
<img width="325" alt="Screenshot 2024-10-13 at 5 37 01 pm" src="https://github.com/user-attachments/assets/7f40ff93-5f61-4b80-a738-ae5b78f4f5c0">

<img width="327" alt="Screenshot 2024-10-13 at 5 36 26 pm" src="https://github.com/user-attachments/assets/f0dcb13c-03e7-419a-a430-d4577cde618b">

<img width="325" alt="Screenshot 2024-10-13 at 5 36 44 pm" src="https://github.com/user-attachments/assets/0110acdb-b104-4a18-8361-57189cdf4ba6">

---

<img width="1907" alt="Screenshot 2024-10-13 at 5 29 11 pm" src="https://github.com/user-attachments/assets/e4014a0b-1fff-469d-bf16-523c503616b7">

<img width="1623" alt="Screenshot 2024-10-13 at 5 35 01 pm" src="https://github.com/user-attachments/assets/5efa6158-d38a-4c23-9310-d4fcad6d1b2a">

<img width="1245" alt="Screenshot 2024-10-13 at 5 35 21 pm" src="https://github.com/user-attachments/assets/ff53e785-8c0c-42b7-a546-01583e4a0fcd">

<img width="762" alt="Screenshot 2024-10-13 at 5 35 35 pm" src="https://github.com/user-attachments/assets/cd70e5b0-84e2-4540-8970-664ae7ab422a">

## Tools and Libraries

- NextJS 14, TypeScript, ChakraUI, Tailwind
- Vercel for deployment and hosting
- GitHub https://github.com/enihar/ani-quest

---

## App Features

App can be visited here https://ani-quest-5o87.vercel.app

- Public pages are `/` and `/sign-in`
- Private page `/information` to browse animes
- Private pages are protected by authentication logic in `middleware.ts`
- User info is stored in cookies and session is managed in Context
  - For a small app like this one, Context may not be required but I wanted to make the app scalable for future use cases.
  - Also using cookies to get user info everywhere is redundant
- Pagination of the graphql anime data
  - Every page can be directly linked & visited using query param `/information?page=3`
  - When not logged in, it asks the user to sign in and redirects back to the intended page after signin

---

## User Flow

- User lands on `/` home page
- Clicks on either `Embark on Your Journey` or `Sign In` on the nav bar
- Goes to `Sign In` page and enters user information
- Automatically gets redirected to `/information` page after signin. Then,
  - User can click on an image to open anime detail in a modal
  - User can go to next/previous page
- User can click on the Avatar in nav bar to open the menu. From here user can -
  - Edit user data through a modal
  - Sign out

---

## Style / CSS

- Tailwind and Chakra theme extended to add a few colors
- Footer added just to complete the design
- All the pages are responsive and tested on all devices
- Skeletons displayed when loading animes on `/information` and also on the detail modal

---

## Accessibility

- Semantic HTML elements `main, footer, nav` used to create regions for screen readers
- Signin form has `aria-label` for username and JobTitle
- User menu created with ChakraUI, so accessibility is already implemented
- Anime detail modal also created with ChakraUI
- Issues fixed after testing with **AXE** dev tool
  - Color contrast for buttons
  - Deleted an image initially created in the menu list, because it doesn't respect ARIA guidelines
- Zero accessibility issues in the app :tada:

---

## Reason for a modal to update user info

- Small form to collect minimal amount of information
- User data can be updated from any page without losing context of the current page
- Quick in-page experience
