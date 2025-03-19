// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


const apiTasks = "https://fdnd-agency.directus.app/items/dropandheal_task/?fields=id,*";
const apiExercises = "https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=id,*";
const specificTaskApi = 'https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":1}';
const specificExerciseApi = 'https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"id":1}';
const exerciseFilteredApi = 'https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"task":1}&fields=id,task,title,description,image';


//console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
const tasksResponse = await fetch(apiTasks);
const exercisesResponse = await fetch(apiExercises);
// Fetch specific (id = 1)
const specificTaskResponse = await fetch(specificTaskApi);
const specificExerciseResponse = await fetch(specificExerciseApi);
const exerciseFilteredResponse = await fetch(exerciseFilteredApi);



// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const tasksData = await tasksResponse.json();
const exercisesData = await exercisesResponse.json();
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

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

app.get('/', async function (request, response) {
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
app.get('/header', async function (request, response) {
  // Geef hier eventueel data aan mee

    response.render('partials/header.liquid', {
      task: tasksData.data, 
      taskObject: taskObject, 

      exerciseObject: exerciseObject // First specific exercise object
  })
})

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
  res.status(404).redirect('/'); 
});