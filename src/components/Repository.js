import React from 'react';

function Repository({ repository, onFetchMoreIssues }) {
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

                        <ul>
                            {
                                issue.node.reactions.edges.map(reaction => (
                                    <li key={reaction.node.id}>{reaction.node.content}</li>
                                ))
                            }
                        </ul>
                    </li>
                ))}
            </ul>

            <hr />

            {repository.issues.pageInfo.hasNextPage ? (
                <button onClick={onFetchMoreIssues}>More</button>
            ) : (
                <button disabled>E.O.L.</button>
            )}
        </div>
    );
}

export default Repository;