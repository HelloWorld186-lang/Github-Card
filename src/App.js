import React from "react"
import ReactDOM from 'react-dom/client';
import GithubCard from "./components/GithubCard";

const App = ()=>{
    return (
        <GithubCard/>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

