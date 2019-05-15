import React from 'react';

function Repository({ repository }) {
    return (
        <div>
            <p>
                <strong>In Repository: </strong>
                <a href={repository.url}>{repository.name}</a>
            </p>

            <ul>
                {repository.issues.edges.map(issue => (
                    <li key={issue.node.id}>
                        <a href={issue.node.url}>{issue.node.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Repository;