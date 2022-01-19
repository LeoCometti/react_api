import React, { Component } from 'react';
import Api from './Api'

class App extends Component {

  state = {
    repositories: [],
    url: ''
  }

  async componentDidMount() {
    const response = await Api.get('');
    console.log(response.data);
    this.setState({ repositories: response.data });
  }

  render() {

    const { repositories } = this.state;

    const updateInputUrl = (e) => {
      const val = e.target.value;
      console.log(val);
      this.setState({ url: e.target.value });
    };

    const requestInfo = async (e) => {
      e.preventDefault();
      const request = { Url: this.state.url };
      console.log(request);
      this.setState({ url: '' });
      const post = await Api.post('', request)
        .then(response => {
          console.log(response.data);
          let _repositories = this.state.repositories;
          _repositories.push(response.data);
          this.setState({ repositories: _repositories });
        });
    }

    const deleteInfo = async (id) => {
      console.log(id);
      const request = { Id: id };
      console.log(request);
      const post = await Api.request({
        url: '',
        method: 'delete',
        data: { Id: id }
      });
      const response = await Api.get('');
      console.log(response.data);
      this.setState({ repositories: response.data });
    };

    return (
      <div>
        <h1>Request Repository Info</h1>
        <form onSubmit={requestInfo}>
          <label>Url: </label>
          <input type="text" size="100" value={this.state.url} onChange={e => updateInputUrl(e)}></input>
          <button >Send</button><br /><br />
        </form>
        <h1>Repositories List</h1>
        {/*console.log(repositories)*/}
        {repositories.map(repo => (
          <li key={repo.id}>
            <h2>[{repo.id}] Url: {repo.url}
              <button type="submit" onClick={() => deleteInfo(repo.id)}>Delete</button>
            </h2>
            {repo.fileInfo.map(file => (
              <li key={file.id}>
                {file.name}, {file.lines} lines, {file.bytes}
              </li>
            ))}
          </li>
        ))}
      </div>
    );
  };
};

export default App;
