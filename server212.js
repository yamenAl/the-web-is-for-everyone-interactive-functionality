// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


const apiTasks = "https://fdnd-agency.directus.app/items/dropandheal_task/?fields=id,*";
const apiExercises = "https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=id,*";
const apiMessages = "https://fdnd-agency.directus.app/items/dropandheal_messages";


const specificTaskApi = 'https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":1}';
const specificExerciseApi = 'https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"id":1}';
const exerciseFilteredApi = 'https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"task":1}&fields=id,task,title,description,image';


//console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
const tasksResponse = await fetch(apiTasks);
const exercisesResponse = await fetch(apiExercises);
const messagesResponse = await fetch(apiMessages);
// Fetch specific (id = 1)
const specificTaskResponse = await fetch(specificTaskApi);
const specificExerciseResponse = await fetch(specificExerciseApi);
const exerciseFilteredResponse = await fetch(exerciseFilteredApi);



// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const tasksData = await tasksResponse.json();
const exercisesData = await exercisesResponse.json();
const messagesData = await messagesResponse.json();


const specificTaskData = await specificTaskResponse.json();
const specificExerciseData = await specificExerciseResponse.json();
const exerciseFilterData = await exerciseFilteredResponse.json();


// making exercisey snigel object not array
const taskObject = Array.isArray(specificTaskData.data) ? specificTaskData.data[0] : specificTaskData.data;
const exerciseObject = Array.isArray(specificExerciseData.data) ? specificExerciseData.data[0] : specificExerciseData.data;



// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()
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
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-')     // replace spaces with hyphens
}
app.get('/:id', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  response.render('index.liquid', {
    title: 'index',
    tasks: tasksData.data, 
    exercises: exercisesData.data, 
    taskObject: taskObject, 
    exerciseObject: exerciseObject 
  })
  
})

//console.log(exercisey)
app.get('/header/:id', async function (request, response) {
  // Geef hier eventueel data aan mee
    const taske = request.params.id;
    const taskeResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task/?fields=*.*&filter={"id":"${taske}"}&limit=1`);
    const taskeResponseJSON = await taskeResponse.json();
    const taskObject = taskeResponseJSON.data[0]; // single task object
    const exercises = taskObject.exercises || []; // assuming it has related exercises

    response.render('partials/header.liquid', {
      tasks: taskeResponseJSON.data,
      taskObject: taskObject, 
      task: taskObject,
      tasks: exercises,

      exerciseObject: exerciseObject // First specific exercise object
  })
})


app.get('/test/:id', async function (request, response) {
  try {
    const taske = request.params.id;
    const taskeResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task/?fields=*.*&filter={"id":"${taske}"}&limit=1`);
    const taskeResponseJSON = await taskeResponse.json();
    
    console.log("hello");
    console.log(taskeResponseJSON.id);

    
    response.render('test.liquid', { taskes: taskeResponseJSON.data?.[0] || [] });
  } catch (error) {
    console.error("Error in /test/:id route:", error);
    response.status(500).send("Something went wrong.");
  }
});

app.get('/het-verlies-aanvaarden', async function (request, response) {
  // Geef hier eventueel data aan mee
  //only this const i take it from example from google
  const filteredExercises = exercisesData.data.filter(exercise => exercise.task === 1);
  
  
    response.render('het-verlies-aanvaarden.liquid', {
      title: 'rouwtaak-blue',
      tasks: tasksData.data, 
      exercises: exercisesData.data, 
      exercisesFilter: filteredExercises, 
      exerciseObject: exerciseObject // First specific exercise object
  })
})
app.get('/community-drops', async function (request, response) {
 
  response.render('community-drops.liquid', {
    title: "community-drops",
    messages: messagesData.data,
  })
})

app.post('/community-drops', async function (request, response) {

  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    body: JSON.stringify({
      from: request.body.from,
      exercise: request.params.tesk, 
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
 // Redirect de gebruiker daarna naar een logische volgende stap
  response.redirect(303, '/community-drops');
})
console.log('Time: ', Date.now())

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`let's go application started on http://localhost:${app.get('port')}`)
})

//404 error send to index
app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})


app.get('/community-drops/:id', async function (request, response) {
  const id = request.params.id;

  const messagesFilterResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"exercise":{"_eq":${id}}}`);
  const messagesFilterResponseJSON = await messagesFilterResponse.json();

  

  const specificTaskResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task?filter={"id":{"_eq":${id}}}`);
  const specificTaskData = await specificTaskResponse.json();
  const taskObject = Array.isArray(specificTaskData.data) ? specificTaskData.data[0] : specificTaskData.data;

  response.render('community-drops.liquid', {
    title: "community-drops",
    messagesFilter: messagesFilterResponseJSON.data,
  
    taskObject,

  });
});
app.post('/community-drops/:id', async function (request, response) {
  const exerciseId = request.params.id

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
