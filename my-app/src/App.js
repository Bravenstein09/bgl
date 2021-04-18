import React, {useState,useEffect,useRef} from 'react';
import './App.css';
import Master from './Controllers/Master';
import Visualizer from './Components/Visualizer'

function App() {
  const [instrumentsLoaded, setInstrumentsLoaded] = useState(false);
  const [partsLoaded, setPartsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [generatedFirst, setGeneratedFirst] = useState(false);

  useEffect(() => {
    setLoaded(instrumentsLoaded && partsLoaded);
  },[instrumentsLoaded,partsLoaded]);

  const master = useRef(null);

  useEffect(() => {
    master.current = new Master(setInstrumentsLoaded, setPartsLoaded);
  },[]);

  const togglePlaying = () => {
    if(playing) {
      master.current.stop();
    } else {
      master.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>BGL</h1>
        <h3>a project by Bravenstein</h3>
      </div>

      <div className="colorBox">
        <div className="loadInfo">
          {loaded? '' : (generatedFirst? 'LOADING' : 
            <p className="generateFirst">Click <b>{'New'}</b> to Generate Your First lofi track! :)</p>)}</div>
        <div className="visualizer">
          {loaded? <Visualizer audio={master.current.output}/> : '' }
        </div>
        <div className="gradient"></div>
      </div>

      <div className="buttons">
        <button className="playBtn"
                disabled={!loaded}
                onClick={() => togglePlaying()}>
          <b>{playing? 'Stop' : 'Play'}</b>
        </button>
        <button className="nextBtn"
                disabled={!loaded && generatedFirst}
                onClick={() => {
                  setGeneratedFirst(true);
                  master.current.stop();
                  setPlaying(false);
                  master.current.generateSong(); 
                  setLoaded(false);}}>
          <b>{'New'}</b>
        </button>
      </div>

      <div className="instructions">
        <p>Click <b>{'New'}</b> to generate a new song!</p>
        <p>This may take some time, depending on your computer. Please be patient.</p>
      </div>
      <div className="links">
        <a href="https://www.youtube.com/channel/UCLzxBAKVGseaDLiMcJZlYaw" target="_blank">My Youtube</a>
	<p> </p>
	<p> Download the desktopk app<a href="https://github.com/Bravenstein09/bgl/releases/" target="_blank">here!</a></p>
	<p>You can use these beats that are generated for almost any purpose, i just ask that you credit me and/or the website</p>
      </div>

      <section className="backdrop"></section>
    </div>
  );
}

export default App;
