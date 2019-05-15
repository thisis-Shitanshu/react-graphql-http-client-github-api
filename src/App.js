import React, {
  useState, 
  useEffect
} from 'react';
// Libraries
import axios from 'axios';

// Custome files
import './App.css';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
    process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  }
});

const TITLE = 'React GraphQL GitHub Client';

// GraphQL Queries
const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

function App() {
  const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');

  useEffect(() => {
    console.log('Using effect to fecth data.');
    const fetchData = async () => {
      axiosGitHubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(result => console.log(result));
    };

    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>{TITLE}</h1>

      <form 
        onSubmit={event => {
          // Do something
          event.preventDefault();
        }}
      >
        <label htmlFor="url">
          Show open issues for https://github.com/
        </label>
        <input
          id="url"
          type="text"
          value={path}
          onChange={event => setPath(event.target.value)}
          style={{ width: '300px' }}
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      {/** Here comes the result. */}
    </div>
  );
}

export default App;
