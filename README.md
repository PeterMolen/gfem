Länk till Monday: https://mohamedmohamud3222s-team.monday.com/boards/1409249142
# G5
A Timereport application

# Code Structure

Componentes

Menu.js: A component containing the navigation bar for the application. It links to various pages in the application, including NotionLogin.js.
Footer.js: A component containing the footer for the application.
NotionLogin.js: A component for logging into the website.
LoginModal.js: A modal component for login.
projectFetch.js: A component for fetching data from the project table/database in Notion.
ProjectAdder.js: A component for adding data to the project table/database in Notion.
EditProjects.js: A component for editing a project, which utilizes projectFetch.js and ProjectAdder.js.
TimeReport.js: A component for reporting time for a user.
UserProject.js: A component for displaying which projects are available for the user.

Pages

Home.js: A page displaying a background image.
Overview.js: A page displaying an overview, where EditProjects.js is connected and has connections to ProjectAdder.js and projectFetch.js.
Project.js: A page where UserProject.js is connected.
TimeReport.js: A page where time reports are connected.
Miscellaneous
App.js: The main file that brings together all components and pages. Starts with Menu and Home is the first page shown.

# Installation
you can clone this app from:
https://github.com/oolsun/projektarbete
to start application: npm start

Opens [http://localhost:3000],
ofcoures you need a server aswell you can also download that server at:
https://github.com/oolsun/projektarbete-server
to run the server open the terminal and type: node "servername".js
first you need to instal node.js from https://nodejs.org/en/download/
            

# Usage
you need to login to the application to use it and navigate through the sites. there are differnt roles, as user you can see different things then the ceo can see.

Enjoy // G5

