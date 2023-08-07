import './App.css';

function App(props) {
  return (
    <div className="App">
      <nav>
       <h2>NETFLAX | | | movie playlist</h2>
       <div>
        <button onClick={window.localStorage.removeItem('user')}>Log out</button>
       </div>
      </nav>
      <div>
        {props.movies?.forEach(<div>{movie?.title}<div>{movie?.sub}</div><input onClick={async _ => await fetch('http://localhost:3001/movie')} type='submit'/></div>)}
      </div>
    </div>
  );
}

export default App;
