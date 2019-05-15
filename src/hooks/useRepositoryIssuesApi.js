import {
    useState,
    useEffect
} from 'react';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
    }
});

// GraphQL Queries
const GET_ISSUES_OF_REPOSITORY = `
    query ($organization: String!, $repository: String!) {
        organization(login: $organization ) {
            name
            url
            repository(name: $repository ) {
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


const useRepositoryIssuesApi = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [organization, setOrganization] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        console.log('Using effect to fecth data.');
        const fetchData = async () => {
          const [organization, repository] = url.split('/');
    
          // HTTPS request to the GraphQL API takes in query and variables.
          axiosGitHubGraphQL
          .post('', { 
            query: GET_ISSUES_OF_REPOSITORY,
            variables: {organization, repository}
          }).then(result => {
            setOrganization(result.data.data.organization);
            setErrors(result.data.data.errors);
          });
        };
    
        fetchData();
    }, [url]);

    const doFetch = path => {
        setUrl(path);
    }

    return { organization, errors, doFetch }
}

export default useRepositoryIssuesApi;