// CONSTANT VALUES  
const secretKey = 'aac09de581f57ede1e45259b59be2e4b';
const imageURL = 'https://image.tmdb.org/t/p/w500';
const meanGirlsURL='https://api.themoviedb.org/3/search/movie?api_key=aac09de581f57ede1e45259b59be2e4b&query=Mean Girls';
// ID du film : 10625
const startURL = 'https://api.themoviedb.org';
const searchURL = `${startURL}/3/search/movie?api_key=${secretKey}`;
const actorImageURL = "https://image.tmdb.org/t/p/w300/";
var enteredPERSON=[];
var enteredMOVIE=[];

//CREATE IMAGES FUNCTIONS
function createMovieImage(fetchData){
  const movies = fetchData.results[0];
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class','movie');
  //Template = an image
  const movie_name = movies.original_title
  const movie_year = movies.release_date.substring(0,4)
  const movieTemplate = `
  <p> <B> ${movie_name} (${movie_year}) </B> </p> 
  <section class="movie_image"> <br>
      <img src=${imageURL+movies.poster_path} width=300 style="" id=${movie_name}/>
      
  </section>
  `;
  enteredMOVIE=enteredMOVIE+movie_name.toLowerCase();
  console.log("entred movie :"+enteredMOVIE)
  movieElement.innerHTML = movieTemplate;
  movie.appendChild(movieElement);
}

function createPersonImage(personImageURL,actorValue){
  const image = document.createElement("div");
  image.innerHTML = `<p id=actorName><B> ${actorValue} </B></p> <img src=${personImageURL} id='personImage' width=300/> `;
  enteredPERSON = enteredPERSON + actorValue.toLowerCase();
  console.log("enterd person :"+enteredPERSON);
  movie.appendChild(image);
}

//INPUT ACTOR BUTTON AFTER MOVIE
function createInputActor(){ 
  //const movies = fetchData.results[0];
  const inputActorElement = document.createElement('div');
  inputActorElement.setAttribute('class','input');
  const input_actorTemplate = `
    <form>
        <div class="input_area">
              <p>Give the full name of one actor/director</p>
             <input type="text" id="inputActorValue">
        </div>
        <button type="submit" class="btn" id="searchActor">Submit an Actor name</button>
      </form>`;
  inputActorElement.innerHTML = input_actorTemplate;
  movie.appendChild(inputActorElement);
}

//INPUT MOVIE BUTTON AFTER ACTOR PICTURE
function createInputMovie(movies){
  const inputMovieElement = document.createElement('div');
  inputMovieElement.setAttribute('class','input');
  //const movieId = movies.id;
  //const idURL = 'https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key='+secretKey ;
  const input_movieTemplate = `
    <form>
        <div class="input_area">
              <p>Give the title of the movie that this person played in or directed</p>
             <input type="text" id="inputMovieValue">
        </div>
        <button type="submit" class="btn" id="searchMovie">Submit Yeah a Movie</button>
      </form>`;
  inputMovieElement.innerHTML = input_movieTemplate;
  movie.appendChild(inputMovieElement);
}

//LIST OF ACTOR AND DIRECTOR OF ONE MOVIE
function ActorDirectorList(castCrewData){
  let actorList = [];
  let actorPath = [];
  for (let i = 0; i<castCrewData.cast.length;i++){
    actorList.push(castCrewData.cast[i].name.toLowerCase());
    actorPath.push(castCrewData.cast[i].profile_path);
  }
  let directorList = [];
  let directorPath= [];
  for (let i = 0; i<castCrewData.crew.length;i++){
    if(castCrewData.crew[i].job=="Director"){
      directorList.push(castCrewData.crew[i].name.toLowerCase());
      directorPath.push(castCrewData.crew[i].profile_path);
    }
  }
  console.log("List of actors of the movie :"+actorList); 
  console.log("List of directors of the movie :"+directorList);
  return[actorList,actorPath,directorList,directorPath];
}

//SAY IF WE INPUT THE RIGHT NAME OF NOT AND WRITE IT IN HTML
function FoundedActor(castCrewData,inputValue){
  const ActorDirector = ActorDirectorList(castCrewData);
  const actorList=ActorDirector[0];
  const actorPath=ActorDirector[1];
  const directorList=ActorDirector[2];
  const directorPath=ActorDirector[3];
  const message = document.createElement('div');
  
  console.log("ENTERED MOVIE : "+enteredMOVIE);
  
  let personPath ="";
  let personFounded = 0 ;
  for(let i =0;i<actorList.length;i++){
    if(inputValue==actorList[i]){
      
      console.log("ENTERED PERSON : "+enteredPERSON+' et inputValue : '+inputValue);
      if(enteredPERSON.includes(inputValue.toLowerCase())){
        message.innerHTML=`<span style='color:red'>This actor already has been entered before.</span>`;
        personFounded=2;
      }
      else{
        message.innerHTML=`You found an actor ! You can continue the quizz. `;
        personPath = actorPath[i];
        personFounded = 1;
      }
    }
  }
  if(personFounded == 0){
    for(let i =0;i<directorList.length;i++){
      if(inputValue==directorList[i]){
        if(enteredPERSON.includes(inputValue.toLowerCase())){
          message.innerHTML=`<span style='color:red'>This director already has been entered before.</span>`;
          personFounded=2;
        }
        else{
          message.innerHTML=`You found the director ! You can continue the quizz. `;
          personPath = actorPath[i];
          personFounded = 1;
          }
      }
    }
  }
  if(personFounded ==0){
    message.innerHTML=`<span style='color:red'>Try again !</span>`; 
    personPath=null;
  }
  if(personFounded == 2){
    personFounded=0;
  }
  movie.appendChild(message);
  return [personFounded,personPath];
}

//FIND IF THE MOVIE NAME IS RIGHT OR NOT AND SAY IT IN THE HTML
function FoundedMovie(castCrewData,inputValue,movieValue){
  console.log("On est dans founded movie!");
  const ActorDirector = ActorDirectorList(castCrewData);
  const actorList=ActorDirector[0];
  const directorList=ActorDirector[2];
  const message = document.createElement('div');
  let personFounded = 0 ; // in the cast and crew of the new movie inserted
  console.log("ATTENTION le nom du film : "+movieValue+ " et on a entered = "+enteredMOVIE);
  for(let i =0;i<actorList.length;i++){
    if(inputValue==actorList[i]){
      if(enteredMOVIE.includes((movieValue.toLowerCase())))
        {
            message.innerHTML=`<span style='color:red'>This movie has already been entered. Try again ! </span>`;
            personFounded = 2;
        }
      else{
        message.innerHTML=`Great ! The last actor indeed played in this movie ! `;
        personFounded = 1;
      }
    }
  }
  if(personFounded == 0){
    for(let i =0;i<directorList.length;i++){
      if(inputValue==directorList[i]){
        if(enteredMOVIE.includes(movieValue.toLowerCase())){
          message.innerHTML=`<span style='color:red'>This movie has already been entered. Try again !</span>`;
          personFounded=2;
        }
        else{
          message.innerHTML=`Yes ! This movie has indeed been directed by the last person ! `;
          personFounded = 1;
        }
      }
    }
  }
  if(personFounded ==0){
    message.innerHTML=`<span style='color:red'>Try again !</span>`;
  }
  if(personFounded==2){
    personFounded=0;
  }
  movie.appendChild(message);
  return personFounded;
}
/*
while{
  if(setActoButton(movieTitle)==1) && movieTitle!=null){
    movieTitle = setMoviebutton(actorValue)
  };
}
*/

//Et si on prend direct le nom du film enregirstre dans enteredMOVIE ? 
function setActorButton(movieTitle){
  let movieURL=searchURL+'&query='+movieTitle;
  console.log("Movie URL : "+movieURL);
  fetch(movieURL)
  .then((res)=>res.json())
  .then((data)=> {
    var movies=data.results[0];
    const actorButtonElement=document.querySelector('#searchActor');
    const InputActorElement = document.querySelector('#inputActorValue');
    actorButtonElement.onclick = function(event){
      event.preventDefault(); //The page is not loading by reflex
      const actorValue = InputActorElement.value; //Actor name submitted
      const movieId=movies.id;
      const workURL = 'https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key='+secretKey;
      fetch(workURL)
        .then((res)=>res.json())
        .then((castCrewData)=> {
        const FoundedInfo = FoundedActor(castCrewData,actorValue);
        const personFounded=FoundedInfo[0];
        const personPath = FoundedInfo[1];
        if (personFounded == 1){
          let personImageURL=actorImageURL+personPath;
          createPersonImage(personImageURL,actorValue);
          createInputMovie();
          setMovieButton(actorValue);
        }
      })
    }  
  })
  .catch((error)=> {console.log('Error : '+error)} )
}        
        
function setMovieButton(actorValue){        
        console.log("Set movie button");
      // RECUPERER LE TITRE INSERE
        const movieButtonElement = document.getElementById('searchMovie');
        const InputMovieElement = document.querySelector('#inputMovieValue');
        movieButtonElement.onclick = function(event){
          event.preventDefault();
          const movieValue = InputMovieElement.value;
          const movie_url = 'https://api.themoviedb.org/3/search/movie?api_key='+secretKey+'&query='+movieValue;
          console.log('URL du film '+movie_url)
          //ANALYSE THE ACTOR OF THIS MOVIE
          fetch(movie_url)
            .then((res)=>res.json())
            .then((fetchData)=> {
            const movieId= fetchData.results[0].id;
            const workURL = 'https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key='+secretKey ;
            console.log("workURL "+workURL);
            fetch(workURL)
              .then((res)=>res.json())
              .then((castCrewData)=>{
              if (FoundedMovie(castCrewData,actorValue,movieValue) == 1){
                createMovieImage(fetchData);
                //createInputActor();
                console.log("The movie was well chose");
              }
       })
    })
  }        
}
          
//MAIN FUNCTION
function startQUIZZ(){
  console.log("***************************************C'est parti !***********************************************");
  fetch(meanGirlsURL)
  .then((res)=>res.json())
  .then((data)=> {
    createMovieImage(data); 
    createInputActor();
  })
  .catch((error)=> {console.log('Error : '+error)} )
    var movieTitle = 'Mean Girls';
    setActorButton(movieTitle);
}

// MAIN
startQUIZZ();

