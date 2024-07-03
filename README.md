# **Food Delivery App**

This is a multi-vendor food delivery application built using ASP.NET Web API and React/React Native for a robust and scalable solution.

## **Key Features:**

* **`Multi-vendor Support:`** Cater to a wide range of restaurants and cuisines.
* **`N-Tier Architecture:`** Separate concerns for presentation, business logic, and data access for maintainability.
* **`Repository Pattern:`** Efficient data access and manipulation.
* **`User Roles with Authentication & Authorization:`** Secure access control for customers, vendors, delivery riders, and administrators.
* **`MS SQL Database:`** Reliable and scalable data storage.
* **`Cloudinary Integration:`** Store and manage images efficiently.
* **`Email Verification with Google SMTP Server:`** Enhance user security and trust.
* **`Order Update Notifications:`** Keep users informed about their orders.
* **`JWT Token-Based Authentication:`** Secure user authentication for API access.
* **`Identity for User Management:`** Built-in user management features from ASP.NET Identity.

## **Technologies:**

* Backend: ASP.NET Web API
* Frontend: React (web) & React Native (mobile)
* Database: MS SQL Server
* Cloud Storage: Cloudinary
* Email Server: Google SMTP
* Authentication: JWT Tokens
* User Management: ASP.NET Identity

## **Project Structure:**

* **`API (ASP.NET Web API):`** Contains controllers, models, and services for API logic.
* **`Frontend (React):`** Web-based user interface for customers and administrators.
* **`Mobile App (React Native):`** Native mobile app experience for customers.
* **`Shared (Optional):`** Common code shared between the frontend and mobile app (if applicable).
* **`Documentation (Optional):`** Provide API documentation or user guides.
* **`Tests:`** Unit and integration tests for code quality.

## **Getting Started:**

1. **Prerequisites:**
    - Visual Studio (or a code editor) with ASP.NET and React/React Native support
    - MS SQL Server (or a compatible database server)
    - Cloudinary account
    - Google Cloud account for SMTP server access (if using)
2. **Clone the Repository:**
    ```bash
    git clone https://github.com/TaushifReza/FoodApp.git
    ```
3. **Set Up Database:**
    - Create a database in MS SQL Server.
    - Update connection strings in the application configuration.
4. **Configure Cloudinary:**
    - Create a Cloudinary account and obtain API keys.
    - Set the keys in the application configuration.
5. **Configure Email Server (Optional):**
    - Follow Google Cloud instructions to enable the SMTP server and obtain credentials.
    - Set the credentials in the application configuration.
6. **Run the Application:**
    - Follow instructions specific to your development environment for running both the backend API and frontend (web and mobile).

## **Contributing:**

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.

## **License:**

This project is licensed under the MIT License. See the LICENSE file for more details.
