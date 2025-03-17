# Interactive functionality

## User Generated Content

Deze workshop gaat over het POSTen en bewaren van data op de server, en hoe je dit weer kunt tonen op een pagina. We gaan ook leren hier een goed ontwerp voor te maken.


<!-- 
Post met NodeJS en API 

Teken van de post interactie in een wireflow met  (hackable) urls, routes en data
- [Wireflow](https://github.com/fdnd-task/wireflow) (Sprint 05)
- [UML Diagram](https://github.com/fdnd-task/uml-diagram) (Sprint 08)


Voorzetje geven van partials gebruiken/als de post gedaan wordt met een 303 forwarden naar de get route en dezelfde view renderen met de nieuwe data. 
-->


### Aanpak

Vandaag gaan we—net als in Sprint 7 bij de squad page—gegevens _opslaan_ in Directus. Maar deze keer voor het project van jullie opdrachtgever.

Net als bij de squad page moeten we daarvoor eerst bedenken welke interactieve functionaliteit we willen toevoegen, en wat dus de _User Generated Content_ wordt. Als de database van jullie project hiervoor aangepast moet worden, kunnen we dat meteen doen.

Hierna gaan we een Wireflow schetsen met nette URLs, routes aanmaken, een HTML formulier maken en de data opslaan in Directus. Je kunt daarna verder met het uitwerken van je ontwerp in code.


## Interactieve functionaliteit

Tot nu toe heb je een overzichtspagina en een detailpagina gemaakt voor de opdrachtgever. Je hebt hiervoor `GET` requests gebruikt. Voor je eigen routes en voor de fetches naar Directus. Hier komen deze sprint `POST` requests bij. Maar hiervoor moeten we eerst bepalen _wat_ we willen gaan maken.

Wil je een opfrisser over het verschil tussen `GET` en `POST`, lees dan eerst eens de bron uit Sprint 7.

Overleg met studenten die dezelfde opdrachtgever hebben welke functionaliteit je zou kunnen maken, waarbij je gegevens in jullie Directus database aan moet passen of toe moet voegen. Wat wordt dus jouw _User Generated Content_ deze sprint? Misschien heeft het ontwerp van je opdrachtgever al een duidelijk idee (een wish list, likes, comments, een vragenlijst die je in kunt vullen, etc). Misschien is er tijdens de laatste Sprint Review een idee ontstaan, dat je wilt gaan maken. Of misschien wil je hiervoor zelf wel iets compleet nieuws verzinnen en laten zien tijdens de komende Sprint Review. Alles mag.

Maak een snelle schets van jouw idee, zodat je deze kunt overbrengen aan een ander aan je tafel. Deze leertaak is individueel, maar probeer samen in te schatten of een bepaald idee haalbaar is, en hoe. Analyseer samen jullie Directus database, en noteer voor jezelf mogelijke problemen en knelpunten die je verwacht voor jouw idee. Als je een aanpassing in de database nodig hebt, kunnen we dat voor jullie doen, net als bij de WHOIS API. Het is hiervoor handig als je zelf al bedenkt wat je nog nodig hebt. Als jouw idee misschien te ingewikkeld is, hou dan een ander idee achter de hand. Overleg uiteindelijk met een docent over de haalbaarheid.

Als je een aanpassing in de database nodig hebt, en je hebt met een docent overlegd, maak dan een issue aan op jouw repository. Leg hierin kort uit wat je nodig hebt, en voeg je schets(en) toe. Plaats een link naar dit issue op Teams, of tag in je issue een docent die dit op kan pakken. Het kan even duren voordat dit gedaan is, maar je kunt alvast verder.

### Bronnen

- [GET vs POST @ Sprint 7](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/user-generated-content.md#get-vs-post)


## Progressive Enhancement

Progressive Enhancement is een coding strategie, waarmee je er voor kunt zorgen dat je website het altijd doet, voor iedereen. Tijdens deze sprint gaan we je in verschillende workshops deze strategie aanleren, zodat je dit uiteindelijk kunt dromen:

1) Bepaal eerst de _core functionality_ van wat je gaat maken
2) Bouw die functionaliteit met de _simpelste techniek_ (meestal HTML, met een klein beetje Mobile First CSS voor de huisstijl)
3) Voeg daarna _extra enhancements_ toe met CSS en client-side JS, om de User Experience te verbeteren! (de leukste stap, waar veel frontenders meteen heen springen)

Stap 1 heb je net gezet; bepalen _wat_ je gaat maken. Een interactie met de server in dit geval.

Stap 2, de simpelste techniek hiervoor, is in dit geval een `<form>` in HTML. Dit werkt in elke browser, op elk apparaat, overal, voor iedereen. En dat is je doel als frontender.

Later deze sprint (en in Sprint 11 nog meer) gaan we deze interactie uitbreiden met extra _enhancements_. Voor nu richten we ons op de eerste twee stappen van _Progressive Enhancement_, zodat we die goed onder de knie krijgen.

Als je een opfrisser wilt van hoe je formulieren afhandelt, zie dan de bron uit Sprint 7.

### Bronnen

- [Oefenen met een POST @ Sprint 7](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/user-generated-content.md#oefenen-met-een-post)


## Wireflow

Deze _simpelste techniek_ voor eindgebruikers—een `<form>`, HTTP methods en URLs—, gecombineerd met onze Directus JSON API en Express, brengt best wat complexiteit met zich mee. Daarom gaan we deze interactie eerst weer uittekenen.

Schets een Wireflow van jouw interactie. Gebruik hiervoor de workshops uit Sprint 7 en 8, en pas deze toe op het formulier dat je nu ontwerpt. Bedenk nette URLs voor je pagina's en routes, en schrijf deze erbij.

Annoteer je Wireflow met hints voor je dynamische data, en bedenk ook hoe je aan kunt geven dat je een `POST` afhandelt.

💪 Na het afhandelen van een `POST`, wil je bezoekers doorsturen (_redirecten_, met een `303` _status code_); kun je dat ook aangeven in je Wireflow?

### Bronnen

- [Wireflow schetsen @ Sprint 7](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/filteren-en-sorteren.md#wireflow-schetsen)
- [Wireflow en dynamische data @ Sprint 8](https://github.com/fdnd-task/server-side-rendering-server-side-website/blob/main/docs/templating-met-json.md#wireflow-en-dynamische-data)


## Routes

Gebruik de hints uit je Wireflow schets en de bronnen hieronder om jouw `POST` route(s) aan te maken in `server.js`.

### Bronnen

- [GET vs POST @ Sprint 7](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/user-generated-content.md#get-vs-post)
- [`app.post()` @ Express](https://expressjs.com/en/5x/api.html#app.post.method)
- [Routes en query parameters @ Sprint 7](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/filteren-en-sorteren.md#routes-en-query-parameters)
- [Routing @ Sprint 8](https://github.com/fdnd-task/server-side-rendering-server-side-website/blob/main/docs/routing-request-response.md#routing)


## Formulier maken

Bouw je formulier in een Liquid view.

[TODO]

### Bronnen

[TODO]

## Opslaan in Directus

In `server.js` staat een voorbeeld uitgecomment.

[TODO]

### Bronnen

- https://docs.directus.io/reference/items.html#create-an-item
- https://docs.directus.io/reference/items.html#update-an-item