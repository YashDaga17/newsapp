import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

 const App =() => {
  const PageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress,setProgress] = useState(0)

  // state = {
  //   progress: 0
  // }

  // setProgress = (progress) => {
  //   setState({ progress: progress });
  // }
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
          />
          <Routes>
          {/* <Route exact path="/" element={<News key="general" PageSize={PageSize} category='general' />} /> */}
          <Route exact path="/newsapp/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" PageSize={PageSize} category='general' />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" PageSize={PageSize} category='general' />} />
            <Route exact path="/home" element={<News setProgress={setProgress} apiKey={apiKey} key="home" PageSize={PageSize} category='home' />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" PageSize={PageSize} category='entertainment' />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" PageSize={PageSize} category='health' />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" PageSize={PageSize} category='science' />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" PageSize={PageSize} category='sports' />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" PageSize={PageSize} category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }

export default App;