// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

const apiTasks = "https://fdnd-agency.directus.app/items/dropandheal_task";
const apiExercises = "https://fdnd-agency.directus.app/items/dropandheal_exercise";
const apiMessages = "https://fdnd-agency.directus.app/items/dropandheal_messages";

// Doe een fetch naar de data die je nodig hebt
const tasksResponse = await fetch(apiTasks);
const exercisesResponse = await fetch(apiExercises);
const messagesResponse = await fetch(apiMessages);

const tasksData = await tasksResponse.json();
const exercisesData = await exercisesResponse.json();
const messagesData = await messagesResponse.json();

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


console.log('Let op: Er zijn nog geen routes. Voeg hier dus eerst jouw GET en POST routes toe.')

app.get('/:id', async function (request, response) {
  const taskId = request.params.id;
  const exercisesId = request.params.exercise;


  const specificTaskResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":${taskId}}`);
  const specificExercisesResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"id":${exercisesId}}`);
  
  const specificExerciseData = await specificExercisesResponse.json();
  const exerciseObject = Array.isArray(specificExerciseData.data) ? specificExerciseData.data[0] : specificExerciseData.data;


  const specificTaskData = await specificTaskResponse.json();
  const taskObject = Array.isArray(specificTaskData.data) ? specificTaskData.data[0] : specificTaskData.data;

  response.render('index.liquid', {
    title: 'index',
    tasks: tasksData.data, 
    exercises: exercisesData.data,
    exerciseObject: exerciseObject, 
    taskObject: taskObject

  });
});





app.get('/exercise/:id', async function (request, response) {
  const exerciseId = request.params.id;
  const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`)
  const exerciseResponseJSON = await exerciseResponse.json()

  response.render('exercise.liquid', {
    title: "exercise",

    exercises: exercisesData.data,

    specificExercise: exerciseResponseJSON.data

   });
});



// GET route for community-drops 
//const messagesIdResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"id":{"_eq":${id}}}&limit=1`);
  //const messagesResponseJSON = await messagesIdResponse.json();
  //const messageObject = Array.isArray(messagesResponseJSON.data) ? messagesResponseJSON.data[0] : messagesResponseJSON.data;

 // const relatedMessagesResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"exercise":{"_eq":${messageObject}}}`);
 // const relatedMessagesJSON = await relatedMessagesResponse.json();

 // const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise?filter={"id":{"_eq":${messageObject}}}&limit=1`);
  //const exerciseResponseJSON = await exerciseResponse.json();
 // const exerciseResponseJSONObject = Array.isArray(exerciseResponseJSON.data) ? exerciseResponseJSON.data[0] : exerciseResponseJSON.data;


 app.get('/messages/:id', async function (request, response) {
  const messagesId = request.params.id;
  const messagesIdResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages/?fields=*.*&filter={"exercise":"${messagesId}"}&limit=1`)
  const messagesResponseJSON = await messagesIdResponse.json()
  
  const messagesFilterResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"exercise":{"_eq":${messagesId}}}`);
  const messagesFilterResponseJSON = await messagesFilterResponse.json();

  const exerciseId = request.params.id;
  const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`)
  const exerciseResponseJSON = await exerciseResponse.json()

  

  
  response.render('messages.liquid', {
    title: "messages",
    specificmessage: messagesResponseJSON.data,
    specificexercise:exerciseResponseJSON.data,
    messagesFilter: messagesFilterResponseJSON.data,
    messages: messagesData.data
  })
})

app.post('/messages/:id', async function (request, response) {
  const exerciseId = request.params.id
  console.log(request.body)


  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    body: JSON.stringify({
      from: request.body.from,
      exercise: request.body.exercise, 
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
 // Redirect de gebruiker daarna naar een logische volgende stap
  response.redirect(303, `/messages/${exerciseId}`);
})

//delete check this again
app.post('/messages', async function (request, response) {
  //this Const ask chatgpt about
  const { _method, messageId, from, text, exercise } = request.body;

  if (_method === 'DELETE') {
    if (messageId) {
      await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
    }
    return response.redirect(303, '/messages');
  }


  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    body: JSON.stringify({
      from,
      text,
      exercise
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/messages');
});









 app.get('/community-drops/:id', async function (request, response) {
 

  const exerciseId = request.params.id;
  const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`)
  const exerciseResponseJSON = await exerciseResponse.json()

  response.render('community-drops.liquid', {
    title: "community-drops",
    specificexercise:exerciseResponseJSON.data,

  })
})

app.post('/community-drops/:id', async function (request, response) {
  const exerciseId = request.params.id
  console.log(request.body)
  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    body: JSON.stringify({
      from: request.body.from,
      exercise: request.body.exercise, 
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    
  });
 // Redirect de gebruiker daarna naar een logische volgende stap
  response.redirect(303, `/community-drops/${exerciseId}`);
})

//delete check this again
app.post('/community-drops', async function (request, response) {
  //this Const ask chatgpt about
  const { _method, messageId, from, text, exercise } = request.body;

  if (_method === 'DELETE') {
    if (messageId) {
      await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
    }
    return response.redirect(303, '/community-drops');
  }


  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    body: JSON.stringify({
      from,
      text,
      exercise
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/community-drops');
});
/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
}) 

//error page
app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})
