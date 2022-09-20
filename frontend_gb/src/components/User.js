import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.last_name}</td>
            <td>{user.first_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, i) => <UserItem user={user} key={i} />)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;
