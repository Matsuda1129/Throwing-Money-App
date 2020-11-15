import React from 'react'
import Router from './Router'
import "./App.css"

const App =() => {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };
  return (
    <main style={style}>
      <Router/>
    </main>
  );
};

export default App;