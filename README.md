# Docker with MongoDB

This is an example app to show you how to implement Docker with MongoDB and NextJS.

## Usage

Clone the repo and run the following commands:

    npm install
    docker-compose up -d

Once you're done, run the following:

    docker-compose down

Then navigate to `localhost:3000` in your browser.

This app is a basic note taking app that only allows numbers as an input. To create a new record, click on the empty input box at the bottom.

To execute a Create or an Update, write the new value in the input box and then click out of it. The loss of focus will fire an event that will

## Architecture and Design Notes

I used Next.JS in this application for Static Rendering and general ease of use - their API Routes feature is amazing and simple.

For the API layer, I used GraphQL with Apollo, because I believe it is a much better solution than REST.

The database being used is Mongo. I decided not to use an ORM because that was overkill, and I'm kinda on the fence re ORM's.

A Docker container is created for both the Next.JS app and the Mongo database, and networking is set up so that the app can query the DB.

## Come and say Hi! 😃

You can reach me on LinkedIn at following link:

https://www.linkedin.com/in/bengrunfeld/
