# 📢 Food Management System

**Food Management System** is a comprehensive web application designed to facilitate food redistribution and manage donations and collections efficiently. Whether you're coordinating food donations, managing collections, or redistributing food to those in need, this system provides a user-friendly platform to enhance your productivity and organization.

Imagine seamlessly managing food donations, ensuring that surplus food reaches those who need it most. With the Food Management System, you can effortlessly track donations, coordinate collections, and manage the redistribution process. This makes it ideal for a variety of scenarios, such as:

- **Non-profit Organizations**: Streamline food donation processes and manage distributions efficiently.
- **Community Centers**: Coordinate food collection drives and ensure timely redistribution.
- **Event Planning**: Manage food donations for events and ensure excess food is redistributed appropriately.
- **Educational Purposes**: Schools and universities can organize food drives and manage donations effectively.

Our intuitive interface allows users to easily log in and manage their food donations and collections. The application leverages the power of **React.js** for a smooth, interactive user experience, **Express.js** for a robust backend, **Node.js** for server-side operations, and **MongoDB** for efficient data management.

## 🚀 Features

- User authentication
- Manage food donations and collections
- Track donation status and history
- Search and filter donations
- Responsive design for various devices
- MongoDB for data storage

## 🛠️ Technologies Used

- **React.js**: Frontend framework for interactive UI
- **Express.js**: Backend framework for server-side logic
- **Node.js**: Runtime environment for server-side operations
- **MongoDB**: Database for storing donation and user data

## ⬇️ Installation

To set up the project locally, follow these steps:

### Do this before running the Application

Before running this project, please ensure Node.js is installed on your system and continue with this setup.

In the project root directory and also in the `backend` folder, install all the node modules by running this command in the console:
```sh
npm install
```
or
```sh
npm i
```

Before running this project, in the project root directory create a .env file and add:
```env
BACKEND_PORT
REACT_APP_BACKEND_URL
REACT_APP_FRONTEND_URL
SESSION_SECRET
MONGO_URL
```
Running the Application
In the project directory, you need to run backend and frontend parts separately:

In the backend folder
```javascript
nodemon server.js
```
This starts the server and connects it to the database.
Displays this on the console and restarts the server every time a change is detected in the files.
```
Connected Server at port = BACKEND_PORT
Connected to MongoDB
```
In the root folder 
```javascript
npm run start
```
Runs the app in the development mode.
Open REACT_APP_FRONTEND_URL to view it in your browser.

The page will reload when you make changes and shows this on the console.
```
You can now view fms in the browser.
  Local:            REACT_APP_FRONTEND_URL
  On Your Network:  URL
```

Note that the development build is not optimized.
To create a production build, use 
```
npm run build.
```

## 📝 Usage

1. **Log In**: Create an account or log in to your existing account.
2. **Donor**:
   - **Make a Donation**: Navigate to the donation page, fill in the details of the food donation, and submit it.
   - **View Donations**: Track the status of your donations from your dashboard.
3. **Admin**:
   - **Assign Donations**: View the list of donations made by donors and assign them to specific agents. Add any necessary messages or instructions for the agents.
   - **Manage Users**: Admins can manage user accounts, including donors and agents.
4. **Agent**:
   - **View Assigned Donations**: Check the dashboard for donations assigned by the admin.
   - **Update Status**: Update the status of the donations as they are processed, collected, and redistributed.
5. **Search and Filter**: Use the search and filter functionality to find specific donations, users, or messages.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)
