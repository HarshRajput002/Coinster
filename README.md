# Coinster 🪙

**A web platform for tracking popular cryptocurrencies, with exclusive content for subscribers.**

Coinster provides real-time and historical data on leading cryptocurrencies through a clean and intuitive interface. It caters to both casual enthusiasts and serious learners by offering tiered access to information, including special educational resources for subscribers.

***

## ✨ Features

Coinster is designed with distinct user roles to provide a tailored experience:

### 👤 Client View (Normal and Subscriber)

All users who are not administrators fall into the client category, which is further divided into two tiers:

* **Normal User**: View a basic line chart that displays the historical price data of four major cryptocurrencies over the past year.
* **Subscriber**: Enjoy all the benefits of a normal user, plus exclusive access to:
    * **In-depth Educational Videos:** A curated library of videos explaining the fundamentals of blockchain technology and cryptocurrency.
    * **Live Updates:** Real-time updates and analysis on the cryptocurrency market.

### 🛠️ Admin View

The admin panel is the control center for managing the platform's users and content.

* **Client Monitoring:** Admins have a comprehensive dashboard to view and manage all registered clients.
* **Content Management:** Admins can upload, update, and organize the video content provided to subscribers.
* **Session Management:** Secure authentication and session handling are in place to protect admin-exclusive functionalities.

***

## 💻 Technologies Used

This project is built with the following technologies:

* **Frontend**:
    * HTML
    * CSS
    * JavaScript
    * Bootstrap
    * EJS (Embedded JavaScript templates)
* **Backend**:
    * Node.js
    * Express.js
* **Database**:
    * MongoDB
* **API**: Integration with a third-party cryptocurrency API to fetch real-time and historical coin data.
* **Authentication**: Session-based authentication to manage user and admin access securely.

***

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local development machine:
* Node.js and npm
* MongoDB
* A code editor of your choice (e.g., VS Code)
* Git for version control

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/coinster.git](https://github.com/your-username/coinster.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd coinster
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    * Create a `.env` file in the root directory.
    * Add the necessary environment variables:
        ```
        MONGO_URI=your_mongodb_connection_string
        CRYPTO_API_KEY=your_api_key
        SESSION_SECRET=a_very_secure_secret_key
        ```

### Running the Application

1.  **Start the development server**
    ```sh
    npm start
    ```
2.  The application will be running on two different ports:
    * **Client/Subscriber Side**: Open your browser and navigate to `http://localhost:4000`
    * **Admin Side**: Open your browser and navigate to `http://localhost:5000`

***

## Usage

Upon launching the application, you can interact with it in several ways:

* As a visitor, you will land on the homepage where you can immediately view the cryptocurrency line charts.
* You can **sign up** as a normal user to have a personalized account.
* Existing users can **log in** to access their accounts.
* To gain access to the educational videos and live updates, users have the option to **subscribe**.
* Designated **administrators** can log in through the admin portal (`http://localhost:5000`) to access the management dashboard.

