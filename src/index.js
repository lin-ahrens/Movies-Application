/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');


/**
 * require style imports
 */
const {getMovies,addMovie,deleteMovie,editMovie} = require('./api.js');

const $ = require('jquery');

$(".container").css("background-color","pink");


function loaded() {
  $("#movies").hide();
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    let storeMovies = "";

    movies.forEach(({title, rating, genre, id}) => {

      storeMovies += `<div class="movie-container-${id}">`;
      storeMovies += `<div class="title" data-value="${title}">Title: ${title} </div>`;
      storeMovies += `<div class="rating" data-value="${rating}">Rating: ${rating} </div>`;
      storeMovies += `<div class="genre" data-value="${genre}">Category: ${genre} </div>`;
      storeMovies += `<button class="remove" id="remove-${id}" value="${id}">Remove</button></div>`;
      storeMovies += `<button class="edit" id="edit-${id}" value="${id}">Edit Movie</button>`;
      storeMovies += `<button class="change" id="change-${id}" value="${id}">Change Movie</button>`;
      storeMovies += `</div>`;

      console.log(`id#${id} - ${title} - rating: ${rating} - genre: ${genre}`);


    });

// =============== On Load================
    $('#movies').html(storeMovies);
    $("#loading").fadeOut(2000, function () {
      $("#movies").show();
    })

// =============== Remove Movie================
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
    });

// =============== Edit Movie================
    $(".edit").click((event)=>{
      const id = event.target.value;
      // const newTitle = $(`.movie-container-${id} .title`).data("value");
      // const newRating = $(`.movie-container-${id} .rating`).data("value");
      const newTitle = $(`.movie-container-${id} .title`).val();
      const newRating = $(`.movie-container-${id} .rating`).val();
      const newGenre = $(`.movie-container-${id} .genre`).val();
      console.log("edit movie",id);
      $(`.movie-container-${id} .title`).html(`Title: <input id="edit-title-${id}" value="${newTitle}">`)
      $(`.movie-container-${id} .rating`).html(`Rating: <input id="edit-rating-${id}"  value="${newRating}">`)
      $(`.movie-container-${id} .genre`).html(`Genre: <input id="edit-genre-${id}"  value="${newGenre}">`)
      // $(`.movie-container-${id} .edit`).hide()
    });

// =============== Change Movie================
    $(".change").click((event)=>{
      const id = event.target.value;
      const newTitleDataVersion = $(`.movie-container-${id} .title`).data("value");

      // const newTitle = $(`.movie-container-${id} .title`).val();
      const editTitle =$(`#edit-title-${id}`).val();
      // const newRating =  $(`.movie-container-${id} .rating`).val();
      const editRating = $(`#edit-rating-${id}`).val();
      const editGenre = $(`#edit-genre-${id}`).val()
      editMovie(id, editTitle,editRating,editGenre)
          .then((response)=>{
            console.log("movie edit",id);
            loaded()
          }).catch(()=>{
            console.log("edit movie not working! error")
      })
    })

//放置在then裡面能確保執行時畫面能同步
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

loaded(); // initial page load

// =============== Add Movie================
$("#add-movie-btn").click(()=> {
  let typeMovieTitle= $('#typeMovieTitle').val();
  let typeMovieRating= $('#typeMovieRating').val();
  let typeMovieGenre= $('#typeMovieGenre').val();
  addMovie(typeMovieTitle,typeMovieRating,typeMovieGenre).then((response)=>{

    $(this).prop('disabled', true);
    loaded()
  });
  console.log("movie add")
});

// ========Sort Movies===========

$("#clickSearchTitle").click(function () {
  getMovies().then((movies) => {
    let storeMovies = "";

    const sortArray =
        movies.sort(function (a, b) {
          if (a.title < b.title) {
            return -1
          } else if (a.title > b.title) {
            return 1
          } else {
            return 0
          }
        })


    movies.forEach(({title}) => {

      storeMovies += `<div class="movie-container-${id}">`;
      storeMovies += `<div class="title" data-value="${title}">Title: ${title} </div>`;

    })
  })
})
  console.log("search show")
// var sortMovies = dataArr['hello'];
// sortArray.sort(function(a,b) {
//   if ( a.region < b.region )
//     return -1;
//   if ( a.region > b.region )
//     return 1;
//   return 0;
// } );





