# Warranty

Warranty is a self-hosted application designed to help users keep track of the warranty status of their purchases. With Warranty, users can easily upload receipts, enter product information, and select the purchase date. The application provides a dashboard that displays all uploaded receipts, categorized into those that are about to expire, newly uploaded, and those that have already expired. Additionally, Warranty includes a search function to find specific receipts quickly.

The software is highly customizable, allowing users to set default warranty periods, configure the dashboard view, manage registered users on their own server, and control user sign-up permissions.

From the dashboard, users can view and download receipt images as needed. Warranty is built using SvelteKit as the framework and Pocketbase as the database. To enable self-hosting, a Dockerfile is provided to create a Docker image, and a Docker Compose script is available to set up the server.

Please note that this project is ongoing, and we are currently at the initial stage of development. If you would like to contribute or have suggestions, please feel free to open an issue in the project repository.

In the future, we plan to implement image recognition to automatically extract text from receipts, including product names and purchase dates, to enhance the search functionality.

## Getting Started

TODO

## Roadmap

To build the Warranty application, I've divided the project into smaller tasks that can be accomplished one after the other. Here's a detailed roadmap:

### Version 1.0 - Basic Functionality

-   [x] User registration and authentication
-   [ ] Receipt upload with image, product name, and purchase date
-   [x] Dashboard to display uploaded receipts
-   [ ] Categorization of receipts (expiring soon, newly uploaded, expired)
-   [ ] Docker compose, dockerfile and .env setup for production
-   [ ] Search functionality

### Version 2.0 - Customization and User Management

-   [ ] Customizable default warranty times
-   [ ] Configurable dashboard view
-   [ ] User management (add, block, or allow new sign-ups)

### Version 3.0 - Image Recognition

-   [ ] Implement image recognition to extract text from receipts
-   [ ] Automatically populate product name and purchase date
-   [ ] Improve search functionality with extracted data

### Version 4.0 - Performance and Scaling

-   [ ] Optimize application performance
-   [ ] Implement data scaling strategies
-   [ ] Add additional features based on user feedback

### Version 5.0 - Mobile App Integration

-   [ ] Develop mobile applications for iOS and Android
-   [ ] Enable users to access Warranty on mobile devices

## Default users

-   Pocketbase admin:

    -   warranty@admin.admin
    -   Warranty23

-   Pocketbase dev test user:
    -   test
    -   test1234
