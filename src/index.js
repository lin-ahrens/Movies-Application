/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');


/**
 * require style imports
 */
const {getMovies,addMovie,deleteMovie} = require('./api.js');

const $ = require('jquery');

$(".container").css("background-color","pink");



function loaded() {
  $("#movies").hide();
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    let storeMovies = "";

    movies.forEach(({title, rating, id}) => {

      storeMovies += `<div class="title">Title: ${title} </div>`;
      storeMovies += `<div class="rating">Rating: ${rating} </div>`;
      storeMovies += `<button class="remove" id="remove-${id}" value="${id}">Remove</button></div>`;

      console.log(`id#${id} - ${title} - rating: ${rating}`);


    });

    $('#movies').html(storeMovies);
    $("#loading").fadeOut(2000, function () {
      $("#movies").show();
    })

    $(".remove").click((event) => {
      const id =  event.target.value;

      console.log("Click button yay", id);
      deleteMovie(id)
          .then((response) => {
            console.log("movie deleted")
          loaded()
          }).catch(() => {
        console.log("not working! error")
      });


    })

//放置在then裡面能確保執行時畫面能同步
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

loaded(); // initial page load

$("#add-movie-btn").click(()=> {
  let typeMovieTitle= $('#typeMovieTitle').val();
  let typeMovieRating= $('#typeMovieRating').val();
  addMovie(typeMovieTitle,typeMovieRating).then((response)=>{
    loaded()
  });
  console.log("movie add")
}).catch(()=>{
  console.log("error")
});






