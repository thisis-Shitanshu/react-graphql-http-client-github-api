import React, {
  useState, 
  useEffect
} from 'react';
// Libraries
import axios from 'axios';

// Custome files
import './App.css';
import Organization from './components/Organization';

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
const GET_ISSUES_OF_REPOSITORY = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    console.log('Using effect to fecth data.');
    const fetchData = async () => {
      axiosGitHubGraphQL
      .post('', { query: GET_ISSUES_OF_REPOSITORY })
      .then(result => {
        setOrganization(result.data.data.organization);
        setErrors(result.data.data.errors);
      });
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

      {
        organization ? (
          <Organization 
            organization={organization} 
            errors={errors}
          />
        ) : (
          <p>Loading ...</p>
        )
      }
      
    </div>
  );
}

export default App;
