> _Fork_ deze leertaak en ga aan de slag. Onderstaande outline ga je gedurende deze taak in jouw eigen GitHub omgeving uitwerken. De instructie vind je in: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)

# Drop & Heal
Drop & Heal is a web application designed to support young adults in processing grief.


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
The application analyzes the user’s current grief stage and assigns them to a specific grief task. Based on this analysis, tailored exercises are provided to help them cope with their loss.
This project is built using Node.js and Express.js for the backend, LiquidJS as a template engine, and Directus API for dynamically retrieving and displaying content.

![image](https://github.com/user-attachments/assets/07388f9d-71ae-4315-ad0a-6bf83ca99cde)


[Link to my website](https://the-web-is-for-everyone-interactive-rcej.onrender.com/1).



This project was built during a sprint 9 with a focus on working with data from the Directus API. All content is retrieved and displayed dynamically, and users can also send data (like messages) back to the API.

In this application, users can:

View tasks related to grief support

Explore emotional support exercises

Post a comment (called a "drop")

Read comments from other users

Send data using POST forms

Delete messages.


User Stories
As a user, I want to view exercises to help guide me through grief.

As a user, I want to post a message so I can express my emotions.

As a user, I want to read community messages so I don’t feel alone.



## Gebruik
## Node.js & Express
The website uses Express for all routes:

Routes in server.js
/id: Load task + show all exercises for that task
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L41-L65

/exercise/:id: Show exercise detail page 
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L71-L91

/messages/:id: Show all drops for one exercise
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L98-L125

/community-drops/:id: Similar to messages, focused on community
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L189-L208

## POST forms
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L127-L137

## DELETE messages via Post
https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L153-L162

## Error Page
If someone types a wrong URL or tries to go to a page that doesn’t exist, they will see a custom 404 error page.
This keeps the site safe and makes sure users can’t go where they’re not supposed to.
The server checks for unknown routes and shows the error page:

https://github.com/yamenAl/the-web-is-for-everyone-interactive-functionality/blob/50c891ee3d489c2c7c3bacaa7dd6978a6ae2bd6f/server.js#L272-L274
The error message tells the user something went wrong and gives a button to go back to the homepage.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met Javascript gedaan en hoe? Misschien heb je een framwork of library gebruikt? -->


## Sprint 8 Feedback & Improvements
After the Sprint 8 review, I received feedback from both the client and teachers.

Client feedback:
The image of the rouwtaak should be smaller and centered

More attention to CSS and styling for better layout and spacing

Teacher feedback:
The website should be more dynamic.

At the start of the sprint, I focused on implementing this feedback. Before adding any new features, I improved the existing pages to make the layout cleaner and the user experience better.
Link to my webiste from [sprint 8](https://server-side-rendering-server-side-website-7pwt.onrender.com/)


![image](https://github.com/user-attachments/assets/f576081c-6f32-436f-8bf2-bb24c0d54b52)

## Installatie
<ul>
 <li>1.Clone het project</li><li>2.Installeer Npm:Open your terminal or CMD (command promptOpen) in the project folder and run NPM INSTALL</li>
 <li>3.Start de server:npm start</li>
 <li>The website will run at: http://localhost:8000</li>
</ul>



## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
