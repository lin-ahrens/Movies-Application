module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())


  },
  addMovie: (title, rating, genre) => {
    const movie={title: title, rating:rating, genre:genre}
    const options={
      method: "POST" ,
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(movie)
    }
    return fetch('/api/movies',options)

  },
  deleteMovie:(removeMovie)=>{
    return fetch('/api/movies'+"/"+ removeMovie,{
      method:"DELETE"
    })
  },

  editMovie:(id, title, rating, genre)=> {
    const movie = {title: title, rating: rating, genre:genre}
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie)
    }
    return fetch('/api/movies'+"/"+id, options)
  }
  };
