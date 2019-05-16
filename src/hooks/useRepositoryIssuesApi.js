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
    query (
        $organization: String!, 
        $repository: String!,
        $cursor: String
    ) {
        organization(login: $organization) {
            name
            url
            repository(name: $repository) {
                name
                url
                issues(first: 5, after: $cursor, states: [OPEN]) {
                    edges {
                        node {
                            id
                            title
                            url
                            reactions(last: 3) {
                                edges {
                                    node {
                                        id
                                        content
                                    }
                                }
                            }
                        }
                    }
                    totalCount
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    }
`;


const useRepositoryIssuesApi = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [organizationData, setOrganizationData] = useState(null);
    const [errors, setErrors] = useState(null);
    const [cursor, setCursor] = useState();

    useEffect(() => {
        console.log('Using effect to fecth data.');
        const fetchData = async () => {
          const [organization, repository] = url.split('/');
    
          // HTTPS request to the GraphQL API takes in query and variables.
          axiosGitHubGraphQL
          .post('', { 
            query: GET_ISSUES_OF_REPOSITORY,
            variables: {organization, repository, cursor}
          }).then(result => {

            const { data } = result.data;

            if (!cursor) {
                setOrganizationData(data.organization);
                setErrors(data.errors);
            } else {

                const { edges: oldIssues  } = organizationData.repository.issues;
                const { edges: newIssues } = data.organization.repository.issues;
                const updatedIssues = [...oldIssues, ...newIssues];

                setOrganizationData({
                    ...data.organization,
                    repository: {
                        ...data.organization.repository,
                        issues: {
                            ...data.organization.repository.issues,
                            edges: updatedIssues,
                        }
                    }
                })
            }
          });
        };
    
        fetchData();
    }, [url, cursor]);

    const doFetch = path => {
        setUrl(path);
    }

    const onFetchMoreIssues = () => {
        const { endCursor } = organizationData.repository.issues.pageInfo;
        setCursor(endCursor);
    }

    return { organization: organizationData, errors, doFetch, onFetchMoreIssues }
}

export default useRepositoryIssuesApi;