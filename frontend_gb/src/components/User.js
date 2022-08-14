import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
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
                {users.map((user) => <UserItem user={user} />)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;
