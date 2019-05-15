import React, {
  useState
} from 'react';
// Libraries

// Custome files
import './App.css';
import Organization from './components/Organization';
import useRepositoryIssuesApi from './hooks/useRepositoryIssuesApi';

const TITLE = 'React GraphQL GitHub Client';

function App() {
  const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');
  const {organization, errors, doFetch} = useRepositoryIssuesApi('the-road-to-learn-react/the-road-to-learn-react');


  return (
    <div className="App">
      <h1>{TITLE}</h1>

      <form 
        onSubmit={event => {
          doFetch(path)
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
