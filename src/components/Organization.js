import React from 'react';

import Repository from './Repository';

function Organization({ 
    organization, 
    errors,
    onFetchMoreIssues,
    onStartRepository
}) {
    
    if (errors) {
        return (
            <p>
                <strong>Something went wrong: </strong>
                {errors.map(error => error.message).join(' ')}
            </p>
        );
    }

    return (
        <div>
            <p>
                <strong>Issues from Organization: </strong>
                <a href={organization.url}>{organization.name}</a>
            </p>
            <Repository 
                repository={organization.repository}
                onFetchMoreIssues={onFetchMoreIssues}
                onStartRepository={onStartRepository}
            />
        </div>
    );
}

export default Organization;