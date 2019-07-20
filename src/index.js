/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');


$(".container").css("background-color","pink");
$("#movies").hide();

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  let storeMovies="";
  movies.forEach(({title, rating, id}) => {

    storeMovies+=`<div class="title">Title: ${title} </div>`;
    storeMovies+=`<div class="rating">Rating: ${rating} </div>`;
    storeMovies+=`<div class="id">ID: ${id} </div>`;

    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
  $('#movies').html(storeMovies);
  $("#loading").fadeOut(2000,function () {
    $("#movies").show();
    $("#movies").fadeIn.text(storeMovies)
  })


//放置在then裡面能確保執行時畫面能同步
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


