import React from "react";
import Card from "../UI/Card";

import classes from "./UserList.module.css";

export default function UsersList(props){
    return(
        <Card>
            <ul>
                {props.users.map(user=>(
                    <li>{user.username} ({user.age}  years old)</li>
                ))}
            </ul>
        </Card>
    )
}