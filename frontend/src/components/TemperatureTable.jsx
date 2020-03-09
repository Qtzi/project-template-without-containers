import React, { Component } from 'react';

export const Table = (props) => {
    console.log("kana", props)
    return(
    <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Timestamp</th>
                    <th>Temperature</th>
                </tr>

                {props.events.map((event) => (<tr>
                    <td>{event.id}</td>
                    <td>{event.timestamp}</td>
                    <td>{event.temperature}</td>
                </tr>))}
            </table>
    </div>
    );
}

