# Warranty

Warranty is a self-hosted application designed to help users keep track of the warranty status of their purchases. With Warranty, users can easily upload receipts, enter product information, and select the purchase date. The application provides a dashboard that displays all uploaded receipts, categorized into those that are about to expire, newly uploaded, and those that have already expired. Additionally, Warranty includes a search function to find specific receipts quickly.

The software is highly customizable, allowing users to set default warranty periods, configure the dashboard view, manage registered users on their own server, and control user sign-up permissions.

From the dashboard, users can view and download receipt images as needed. Warranty is built using SvelteKit as the framework and Pocketbase as the database. To enable self-hosting, a Dockerfile is provided to create a Docker image, and a Docker Compose script is available to set up the server.

Please note that this project is ongoing, and we are currently at the initial stage of development. If you would like to contribute or have suggestions, please feel free to open an issue in the project repository.

In the future, we plan to implement image recognition to automatically extract text from receipts, including product names and purchase dates, to enhance the search functionality.

## Getting Started

### Prerequisites

Before getting started, you'll need to ensure that you have the following prerequisites installed on your system:

-   Docker
-   Docker Compose

### Installation

Follow these steps to set up the Warranty application on your system:

1. Clone the project repository:

    ```bash
    git clone https://github.com/Bodyes26/warranty.git &&
    cd warranty
    ```

2. start up the container:

    ```bash
    docker compose up -d
    ```

3. Go to the URL you set up before (default is localhost:23222)

### Development

If you want to clone the repo to develop some functionalities, you'll need:

-   nodejs
-   npm

1. download pocketbase from https://pocketbase.io

2. clone the repo with:

    ```bash
    git clone https://github.com/Bodyes26/warranty.git &&
    cd warranty
    ```

3. copy the downloaded pocketbase executable in the pb_dev folder

    This folder contains a example database with some data to test

4. modify the PB_URL in .env:

    you need to modifiy the PB_URL to http://localhost:8090 (the default for pocketbase)

5. start pocketbase server:
   Inside the pb_dev folder exec

    ```bash
        ./pocketbase serve
    ```

6. start dev server:
   Inside the folder of the project

    ```bash
        npm install &&
        npm run dev
    ```

7. Go to localhost:5173 and you'll se the dev server

## Roadmap

To build the Warranty application, I've divided the project into smaller tasks that can be accomplished one after the other. Here's a detailed roadmap:

### Version 1.0 - Basic Functionality

-   [ ] User registration and authentication
-   [ ] Receipt upload with image, product name, and purchase date
-   [ ] Dashboard to display uploaded receipts
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
