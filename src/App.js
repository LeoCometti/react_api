import React, { Component } from 'react';
import Api from './Api'

class App extends Component {

  state = {
    repositories: [],
  }

  async componentDidMount() {
    const response = await Api.get('');

    //console.log(response.data);

    this.setState({ repositories: response.data });
  }

  render() {

    const { repositories } = this.state;

    return ( 

      <div>
        <h1>Repositories List</h1>
        {/*console.log(repositories)*/}
        {repositories.map(repo => (
          <li key={repo.id}>
            <h2>Url: {repo.url}</h2>
            {repo.fileInfo.map(file => (
              <li key={file.id}>
                Name: {file.name}, {file.lines} lines, {file.bytes}
              </li>  
            ))}
          </li>
        ))}
      </div>
    );
  };
};

export default App;
