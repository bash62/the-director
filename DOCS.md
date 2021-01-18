# Frontend

Components
----------


**src/App.js**

### 1. App

Ce composant est le composant principal de l'application.
Son rôle est de permettre le routage des différentes pages et composants.   

```js
function App() {
  return (
    <div class="App">
      <Router>
        <Switch>
          <Route exact path='/' render={()=><Home />} ></Route>
          <Route exact path='/choose-student' render={()=><ChooseStudent />}></Route>
          <Route exact path='/game-recap/:game_id' render={()=><GameRecap />}></Route>
          <Route exact path='/ranking' render={()=><Ranking />}></Route>
          <Route exact path='/404' component={FourOFour} />
          <Route exact path='*'>
            <Redirect to='/404'/>
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

```


-----
**src/_components/GameHelp.js**

### 1. GameHelp

Ce composant affiche une fenêtre d'expliquations du jeu en début de partie.   

```js
const GameHelp = () => {

  const [open, setOpen] = useState(true);

  return(
    <div className={`game-help ${open ? 'open' : ''}`}>
      <div className='game-help__toggler' onClick={()=>setOpen(!open)}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
        </svg>
      </div>
      <div className={`game-help__panel ${open ? 'open' : ''}`}>
        <div className='game-help__cross' onClick={()=>setOpen(false)}>
          <svg width="4vw" height="4vw" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <div className='game-help__content'>
          <div className='game-help__title'>But du jeu</div>
          L'objectif est de répartir les élèves en deux classes. Pour cela il faut se baser sur le jugement du prof et le profil de l'élève.<br/><br/> Un choix est judicieux si l'élève est bon dans un domaine que le prof juge et inversement.<br/><br/> Bonne chance !
        </div>
      </div>
    </div>
  )
}
```


-----
**src/_components/GroupsMenu.js**

### 1. GroupsMenu

Ce composant est un menu simple qui s'agrandit quand il est survolé.   

```js
const GroupsMenu = (props) => {
  return(
    <div className={`groups-menu groups-menu--${props.location}`}>
      <div className='groups-menu__toggler'>
        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
      </div>
      <Group title={`Classe de ${props.teacher.name}`} teacher={props.teacher} students={props.group}/>
    </div>
  )
}
```

Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
group|array|no||Tableau contenant les élèves du groupe.
location|string|no||Vaut left ou right selon le côté duquel est placé le menu.
teacher|shape|no||Objet représentant le professeur de la classe.
-----
**src/_components/ProgressBar.js**

### 1. ProgressBar

Simple barre de progression horizontale.   

```js
const ProgressBar = (props) => {
  return(
    <div className='progress-bar'>
      <div className='progress-bar__value' style={{width: props.value*100+'%'}}>{Math.round(props.value*100)}%</div>
    </div>
  );
}
```


Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
value|number|no||Valeure de la progression.
-----
**src/_components/RankingRecapBar.js**

### 1. RankingRecapBar

Ce composant représente une ligne du classement général.
Elle présente la position dans le classement, le nom d'utilisateur du joueur et le score final d'une partie.   

```js
const RankingRecapBar = props => {
    const {data} = props;
    const pos = props.index;
    const color = props.index % 2 === 0 ? '#919191':'#bdbdbd'
    
    return(
        <Link to={`/game-recap/${data._id}`} className='ranking-recap-bar' style={{background:color}}>
            <div className='position opos'>{pos}</div>
            <div className='player'>{data.username}</div>
            <div className='finalscore'>{Math.round(data.score*10000)/100} %</div>
        </Link>
    )   
}
```


Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
data|shape|no||Données de la ligne du classement.
index|number|no||Place de la ligne dans le classement.
-----
**src/_components/StudentCard.js**

### 1. StudentCard

Ce composant représente une 'carte' d'élève.
Elle permet de visualiser différentes informations à propos d'un élève comme son nom ou son sexe mais également des caractéristiques d'efforts et de compétences qui lui sont propres.   

```js
const StudentCard = (props) => {
  const {student} = props;
  return(
    <article className={`student-card ${props.swiped&&props.swiped!==''?'swiped-'+props.swiped:''}`}>
      <div className='student-card__presentation'>
        <div className='student-card__name'>{student.name}</div>
        <div className='student-card__sex'>{student.sex === 'F' ? <FemaleIcon/> : <MaleIcon/>}</div>
      </div>
      <img alt='' className='student-card__icon' src={student.img} onDragStart={(e)=>e.preventDefault()}></img>
      <div className='student-card__props'>

        <div className='student-card__cat-title'>Compétences</div>
        <div className='student-card__cat'>
          <div className='student-card__prop'>Compréhension<ProgressBar value={student.speedComprehension}/></div>
          <div className='student-card__prop'>Vitesse d'analyse<ProgressBar value={student.analysisSpeed}/></div>
          <div className='student-card__prop'>Connaissances<ProgressBar value={student.answerAccuracy}/></div>
        </div>

        <div className='student-card__cat-title'>Efforts</div>
        <div className='student-card__cat'>
          <div className='student-card__prop'>Régularité<ProgressBar value={student.routinely}/></div>
          <div className='student-card__prop'>Attention<ProgressBar value={student.classAttendence}/></div>
          <div className='student-card__prop'>Concentration<ProgressBar value={student.focusness}/></div>
        </div>
      </div>
    </article>
  )
}
```


Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
student|shape|no||Données de l&#x27;élève à afficher.
swiped|string|no||Informe si la carte a été swipée ou non
-----
**src/_components/TeacherCard.js**

### 1. TeacherCard

Ce composant représente une 'carte' de professeur.
Elle permet de visualiser plusieurs informations à propos de celui-ci comme son nom, son sexe et une description de son profil.   

```js
const TeacherCard = (props) => {
  const {teacher} = props;
  return <div className='teacher-card'>
      <div className='teacher-card__presentation'>
        <div className='teacher-card__name'>{teacher.name}</div>
        <div className='teacher-card__sex'>{teacher.sex === 'F' ? <FemaleIcon/> : <MaleIcon/>}</div>
      </div>
      <img className='teacher-card__image' src={teacher.img} alt=''></img>
      <div className='teacher-card__desc'>{teacher.description}</div>
    </div>
}
```


Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
teacher|shape|no||Carte de professeur.
-----
**src/_routes/FourOFour.js**

### 1. FourOFour

Ce composant représente la page affichée quand un url invalide est entré.   

```js
const FourOFour= () => {

    return(
        <div className="section">
            <div className='fourOFour'>
                <h1>4</h1>
                <img alt='' src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=UpDown&mouthType=Serious&skinColor=Brown"></img>
                <h1>4</h1>
            </div>
            <div className="texte">La page recherchée est introuvable...</div>
            <div>
            </div>
        </div>
    )
}
```


-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>


-----

# Backend

the-director-api:
=================

https://the-director-api.herokuapp.com/


**routes/startGame.js**


## Récupère une classe aléatoire

  **PATH** `GET https://the-director-api.herokuapp.com/startGame`

  **EXAMPLE**
```json

{
    "_id": "5fd2537fd63988b4130f12e7",
    "name": "Philippine Leroy",
    "sex": "F",
    "competence": 0.6057493442732262,
    "effort": 0.2979876613477374,
    "speedComprehension": 0.328214642795307,
    "analysisSpeed": 0.7139369564715505,
    "routinely": 0.47270715686912523,
    "answerAccuracy": 0.7750964335528212,
    "classAttendence": 0.19823688911872428,
    "focusness": 0.22301893805536266,
    "img": "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue01&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light",
    "class": "A"
  }
  ```


---


**routes/endGame.js**



## Enregistre dans la BD, calcul le score et renvoie l'id de la partie 

  **PATH**  `POST  https://the-director-api.herokuapp.com/endGame`


  Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
username|string|yes||Nom du joueur. 
students|array|yes||Tableau contenant les élèves du groupe. est placé le menu.
teacherA|teacher|yes||Objet représentant le professeur de la classe A.
teacherB|teacher|yes||Objet représentant le professeur de la classe B.
-----

  **EXAMPLE**
```json
{
  "username": "abc10",
  "students": [{
    "_id": "5fd207db16b6591e1bd9a89a",
    "name": "Laure Caya",
    "sex": "F",
    "competence": 0.5109096362134637,
    "effort": 0.45997603859350855,
    "speedComprehension": 0.7778688993928349,
    "analysisSpeed": 0.6516794240001069,
    "routinely": 0.5126427707776644,
    "answerAccuracy": 0.10318058524744944,
    "classAttendence": 0.19540902008994943,
    "focusness": 0.6718763249129118,
    "img": "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Red&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Pale",
    "class": "A"
  },
  {
    "_id": "5fd207db16b6591e1bd9a89b",
    "name": "Saber Bolduc",
    "sex": "M",
    "competence": 0.2561390733828919,
    "effort": 0.561491737461894,
    "speedComprehension": 0.613870095433765,
    "analysisSpeed": 0.05206450301402832,
    "routinely": 0.016006955617455576,
    "answerAccuracy": 0.10248262170088229,
    "classAttendence": 0.9685516254243534,
    "focusness": 0.6999166313438729,
    "img": "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&facialHairColor=Platinum&clotheType=CollarSweater&clotheColor=Heather&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Black",
    "class": "A"
  },{

    ...

  }]
    "teacherA": 
  {
    "_id": "5fc12e5abb6c5e863d1349c1",
    "name": "Mme Massé",
    "sex": "F",
    "anneeEtude": 7,
    "age": 33,
    "experience": 4,
    "jugementCompetence": 0,
    "jugementEffort": 0,
    "description": "Mme Massé est une enseignante qui valorise les competences mais aussi les efforts.",
    "img": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Prescription01&hairColor=Brown&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Black&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Brown",
    "class": "A"
  },
  "teacherB":   {
    "_id": "5fc12e5abb6c5e863d1349c4",
    "name": "Mme Riel",
    "sex": "F",
    "anneeEtude": 6,
    "age": 51,
    "experience": 24,
    "jugementCompetence": 1,
    "jugementEffort": 1,
    "description": "Mme Riel est une enseignante qui ne valorise que les competences.",
    "img": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelBlue&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Pale",
    "class": "B"
  }
```

  **RETOUR**
  
```JSON
{
    "_id": "5f9074fb94cfcea10b98ad31",
}
```


---

**routes/ranking.js**

## Renvoie le classement

  **PATH**  `GET  https://the-director-api.herokuapp.com/ranking?begin=x&end=y`

  Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
x|number|yes||Index borne inférieur. 
y|number|yes||Index borne supérieur. 

-----

  **EXAMPLE**
  
  **PATH** `GET  https://the-director-api.herokuapp.com/ranking?begin=0&end=4`
```JSON
{
[
  {
    "username": "babo",
    "score": 0.9999999999999999,
    "_id": "5fd299c4c6c09b0017d66337"
  },
  {
    "username": "robuscus",
    "score": 0.9675324675324675,
    "_id": "5fd2577f0abed400170a440f"
  },
  {
    "username": "senkei",
    "score": 0.9642857142857142,
    "_id": "5fd25cbb0abed400170a452a"
  },
  {
    "username": "babo",
    "score": 0.888888888888889,
    "_id": "5fd29867c6c09b0017d662ba"
  }
]
}
```

---

**routes/stats.js**


## Récupère une partie dans la BDD

  **PATH** 
   `Get  https://the-director-api.herokuapp.com/stats/:id/`

   Paramètres | Type | Requis | Par défault | Description
:--- | :--- | :--- | :--- | :---
:id/|string|yes||Id de la partie. 


  **EXAMPLE**
```JSON
{
    "date": "2020-12-10T21:34:01.456Z",
    "students": [
        {
          "_id": "5fd298bec6c09b0017d662f9",
          "name": "Michèle Charest",
          "sex": "F",
          "competence": 0.47233657827836106,
          "effort": 0.5656800093578421,
          "speedComprehension": 0.5323282129635154,
          "analysisSpeed": 0.5414258432071846,
          "routinely": 0.8027263955344524,
          "answerAccuracy": 0.3432556786643832,
          "classAttendence": 0.7270510348037764,
          "focusness": 0.1672625977352975,
          "img": "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelRed&eyeType=Default&eyebrowType=Default&mouthType=Disbelief&skinColor=DarkBrown",
          "class": "A"
        },
        {
          ...
        }
    ]
    "score": [
      1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ],
    "_id": "5fd299c4c6c09b0017d66337",
    "username": "babo",
    "teacherA": {
        "_id": "5fd298bec6c09b0017d66314",
        "name": "Mme Chartré",
        "sex": "F",
        "anneeEtude": 4,
        "age": 58,
        "experience": 32,
        "jugementCompetence": 0,
        "jugementEffort": 1,
        "description": "Mme Chartré est une enseignante qui juge plus les efforts. Elle a fait 4 ans d'études.",
        "img": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Platinum&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=DarkBrown",
        "class": "A"
    },
    "teacherB": {
        "_id": "5fd298bec6c09b0017d66317",
        "name": "M. Grivois",
        "sex": "M",
        "anneeEtude": 4,
        "age": 27,
        "experience": 1,
        "jugementCompetence": 0,
        "jugementEffort": 0,
        "description": "M. Grivois est un enseignant qui ne juge pas les élèves. Il a fait 4 ans d'études.",
        "img": "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Blank&hairColor=Auburn&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=BlazerSweater&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=DarkBrown",
        "class": "B"
  },
  "__v": 0
}
```

