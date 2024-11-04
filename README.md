
# Artist Management App

A simple Express.js application to manage a list of artists, allowing users to view, add, edit, and delete artists, as well as like them. 




## Features

- View all artists in the database
- Add new artists
- Edit existing artists
- Delete artists
- Like artists to increment their like count


## Technologies Used


- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building web applications.
- **Prisma**: ORM for interacting with the database.
- **EJS**: Template engine for rendering views.
- **Express-session**: Middleware for managing session data.
- **SQLite**: Lightweight database used to store artists.
- **Tailwinds**: For better user interface experience


## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- SQLite (if you choose to use SQLite for the database)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd artist-management-app
```
3. Install the required dependencies:
```bash
npm install
```
4. Create a '**.env**' file in the root directory to set up your environment variables:
```bash
PORT=4000
```
5. Run the database migrations (if applicable with Prisma):
```bash
npx prisma migrate dev --name init
```

### Running the Application
To start the server, run:
```bash
npm start
```
*The application will be running on http://localhost:4000.*


## Routes

- **GET /:** Homepage that lists all artists.
- **GET /add:** Form to add a new artist.
- **POST /add:** Submits the new artist to be added to the database.
- **GET /edit/:id:** Form to edit an existing artist by ID.
- **POST /edit/:id:** Submits the edited artist to update the database.
- **DELETE /delete/:id:** Deletes an artist from the database.
- **POST /like/:id:** Likes an artist, incrementing their like count.
## Views
- *index.ejs:* Displays all artists.
- *add_artist.ejs:8* Form to add a new artist.
- *edit_artist.ejs:* Form to edit an existing artist.
## Contributing

Contributions are **always** welcome!

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. 

Any improvements or bug fixes are welcome!
