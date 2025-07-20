# Coinster 🪙

**A web platform for tracking popular cryptocurrencies, with exclusive content for subscribers.**

Coinster provides real-time and historical data on leading cryptocurrencies through a clean and intuitive interface. It caters to both casual enthusiasts and serious learners by offering tiered access to information, including special educational resources for subscribers.

## ✨ Features

Coinster is designed with distinct user roles to provide a tailored experience:

### 👤 **Client View (Normal and Subscriber)**

All users who are not administrators fall into the client category, which is further divided into two tiers:

#### **Normal User**
* **Cryptocurrency Price Tracking:** View a basic line chart that displays the historical price data of four major cryptocurrencies over the past year. This data is dynamically fetched using a reliable API.

#### **Subscriber**
Subscribers enjoy all the benefits of a normal user, plus exclusive access to:
* **In-depth Educational Videos:** A curated library of videos explaining the fundamentals of blockchain technology and the intricacies of cryptocurrency.
* **Live Updates:** Real-time updates and analysis on the cryptocurrency market, integrated alongside the educational content.

### 🛠️ **Admin View**

The admin panel is the control center for managing the platform's users and content.

* **Client Monitoring:** Admins have a comprehensive dashboard to view and manage all registered clients, including both normal users and subscribers.
* **Content Management:** Admins can upload, update, and organize the special video content provided to subscribers, ensuring the educational library is always current.
* **Session Management:** Secure authentication and session handling are in place to protect admin-exclusive functionalities.

## 💻 Technologies Used

This project is built with a modern technology stack to ensure a robust and scalable application:

* **Frontend:** HTML, CSS, JavaScript (and potentially a framework like React or Vue.js for a dynamic user interface)
* **Backend:** A backend language and framework such as Node.js with Express to handle server-side logic and API integration.
* **Database:** A database system like MongoDB for storing user data and content information.
* **API:** Integration with a third-party cryptocurrency API (e.g., CoinGecko, CoinMarketCap) to fetch real-time and historical coin data.
* **Authentication:** Session-based authentication to manage user and admin access securely.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

Ensure you have the following installed on your local development machine:
* Node.js and npm (or the specific runtime and package manager for your chosen backend technology)
* A code editor of your choice (e.g., VS Code)
* Git for version control

### **Installation**

1.  **Clone the repo**
    ```sh
    git clone [coinster](https://github.com/your-username/coinster.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd coinster
    ```
3.  **Install NPM packages (for a Node.js project)**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    * Create a `.env` file in the root directory.
    * Add the necessary environment variables, such as your database connection string and API key.
        ```
        DB_CONNECT=your_database_connection_string
        CRYPTO_API_KEY=your_api_key
        SESSION_SECRET=your_session_secret
        ```

