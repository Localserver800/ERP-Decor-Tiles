# ERP Decor Tiles

This is an ERP (Enterprise Resource Planning) system for a decorative tile business. The application is built with React and Firebase.

## Features

*   **User Authentication:** Users can log in to the system.
*   **Multilingual Support:** The application supports English and French.
*   **Product Management:** An admin panel at `/admin` allows for adding, updating, and deleting products.
*   **Product Availability:** The home page displays a list of products with their current stock levels.
*   **Order Placement:** Users can place orders for products.
*   **Push Notifications:** The application uses Firebase Cloud Messaging (FCM) to send push notifications for successful orders.

## Tech Stack

*   **Frontend:** React
*   **Backend:** Firebase (Authentication, Firestore, Cloud Messaging, Cloud Functions)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   A Firebase project

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://your-repo-url.com
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up Firebase:**
    *   Create a `.env` file in the root of the project and add your Firebase project configuration:
        ```
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        ```
    *   Update the Firebase config in `public/firebase-messaging-sw.js` with your own config.
    *   Update the `vapidKey` in `src/firebase.js` with your own VAPID key from the Firebase console.

4.  **Run the app:**
    ```sh
    npm start
    ```

## Admin Access

To access the admin panel, navigate to `/admin` after logging in.

## Cloud Functions

The application uses a Cloud Function to send push notifications for new orders. The code for the function is in the `functions` directory.

To deploy the function:

1.  **Navigate to the `functions` directory:**
    ```sh
    cd functions
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Deploy the function:**
    ```sh
    firebase deploy --only functions
    ```