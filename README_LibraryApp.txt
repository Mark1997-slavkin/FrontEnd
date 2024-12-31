
# Library Management App

## Overview
The Library Management App is a React-based application for managing books and users in a library system. It allows admins and regular users to sign up, log in, and perform various actions such as adding books, saving favorites, and managing user information.

---

## Features
1. **User Authentication**:
   - Signup and login functionality for both admins and regular users.
   - Form validation for secure input using Joi.

2. **Book Management**:
   - Add new books with details like title, summary, description, price, and an image.
   - Edit existing books or delete them (admin functionality).
   - View a list of all books with details displayed in cards.

3. **Favorites**:
   - Save books to your favorites list for quick access.

4. **User Management** (Admin only):
   - Admins can view, edit, and delete users in the system.

5. **Responsive Design**:
   - Fully responsive components using Material-UI for a seamless experience across devices.

---

## File Structure
- `AddBookIcon.jsx`:
  - Floating button for navigating to the "Add Book" form.

- `BookForm.component.jsx`:
  - A form to add or edit books with validation.

- `BookList.component.jsx`:
  - Displays a list of books as cards.

- `LoginSignupForm.component.jsx`:
  - Handles user authentication (signup and login) with a toggle between modes.

- `ToolBar.component.jsx`:
  - Provides tools for book actions (like, edit, delete) depending on the user's role.

- `UsersTable.jsx`:
  - Admin table for managing users with pagination and sorting.

---

## How to Run the Project

### Prerequisites
- Node.js installed on your system.
- A backend server for handling API calls (optional, if the app is integrated with one).

### Steps to Set Up
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd library-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

5. **Connect Backend (Optional)**:
   - If you have a backend server, ensure it is running and accessible.
   - Update the API endpoints in the services files (`book.services.js`, `user.services.js`) as required.

---

## Usage
1. **Sign Up**:
   - Register as an admin or a regular user.

2. **Log In**:
   - Access your account using the credentials.

3. **Add Books**:
   - Admins can add books with details such as title, description, and image.

4. **Manage Favorites**:
   - Save your favorite books for easy reference.

5. **Manage Users** (Admin only):
   - View and manage users in the system via the admin dashboard.

---

## Built With
- **React**: Frontend framework.
- **Material-UI**: Styling and responsive components.
- **Joi**: Form validation.
- **React Router**: Navigation and routing.

---

## Contributors
- Mark Slavkin & Ori Cohen

---

## License
This project is licensed under the MIT License.
