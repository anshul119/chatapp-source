# chatapp-source
source code of my chatapp project

Below is the list of useful files and folders you should know about:

a) <b>App.js:</b> This is the server of the application where connection is extablished, users are created, deleted and altered.

b) <b>Index.html:</b> Landing page of the website with three sections made using Bootstrap Tabs.

c) <b>Package.JSON:</b> Contains the necessary information and list of required node modules.

d) <b>Gruntfile:</b> Configuraiton file for gruntJS to minify the Stylesheet and JavaScript using Uglify and Cssmin.

d) <b>js(dir):</b> Containes the mainApp.js where all the jQuery is written. It also contains a mainApp.min.js which is minified by Grunt

e) <b>css(dir):</b> Contains CSS, SCSS files and maping. it also has minified version of style.css which is again minified by Grunt.

<h3>How to setup?</h3>

1. Download the source code and put it in a separate directory of your choice.
2. Open package.json and install all the required modules using npm. 

		example: npm install module-name

3. Once you have installed all the moduels, open app.js and change the port according to your convenience in line 10.
4. Start the server by running the following command in command prompt:

		node app.js

5. now go to "http://localhost:your-port". Congratulations, you have got the app up and running!
6. You can make changes according to your convenience in CSS, JS and index file and create your version of Chatroom on top of this app.
