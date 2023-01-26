const Button = (props) => {

    const deleteMovie = () => {
        fetch(`https://movie-fetch-default-rtdb.firebaseio.com/movies/${props.id}.json`, {
        method:'DELETE'
      })
      console.log(props.id);
      props.removeMovie();
      props.removeMovie();
    }
    return(
        <button id={props.id} onClick ={deleteMovie} style={{border:'1px solid black'}}>Delete</button>
    )
}
export default Button; 