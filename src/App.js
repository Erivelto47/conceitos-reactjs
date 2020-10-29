import React, {useEffect, useState} from "react";

import "./styles.css";
import RepositoryService from './services/repository-service';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository  = {
      title: "third",
      url: "http://teste.com",
      techs: ["node.js", "angular"]
    }

    RepositoryService.createRepository(repository)
      .then(result => setRepositories([...repositories, result.data]))
      .catch(error => console.log('error on create: ' + error.error));
  }

  async function handleRemoveRepository(id) {

    RepositoryService
      .deleteRepository(id)
      .then(() => {
        setRepositories(repositories.filter(repository => repository.id !== id));
      })
      .catch(reason => console.log(reason));
  }

  useEffect(() => {
    RepositoryService
      .getAll()
      .then(repositoriesList => {
        console.log(repositoriesList.data);
        setRepositories(repositoriesList.data)
      })
      .catch(console.log('Error load data.'));


  }, [])

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
