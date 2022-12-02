import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    font-size: 16px;
    color: #1a191a;

    table {
        border-collapse: collapse;
        margin-bottom: 20px;

        td,
        th {
            border: 0.5px solid #ccc;
            padding: 8px 10px;
            text-align: center;
        }

        tr:not(:only-child):hover {
            background-color: #f5f4f4;
            border-radius: 12px;
            font-weight: 600;
        }

        thead {
            margin-bottom: 10px;
        }

        .btn {
            padding: 4px 10px;
            color: white;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            margin: 2px;
        }

        .edit {
            background-color: #cf0e3b;
            margin-left: 5px;
        }

        .del {
            background-color: #1539bd;
        }

        .status {
            color: #000;
        }
    }
`;

function index({ data, getData, editUser }) {
    function deleteUser(id) {
        axios
            .delete(`http://localhost:3001/delete/${id}`)
            .then((res) => {
                console.log("Usuário deletado.");
                getData();
            })
            .catch((err) => {
                throw err;
            });
    }

    function updateUser(data) {
        editUser(data);
    }

    console.log(data);
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>User_id</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created_at</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.created_at.slice(0, 10)}</td>
                            <td className="status">{item.user_status}</td>
                            <td>
                                <button
                                    className="btn edit"
                                    onClick={(e) => updateUser(data[index])}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn del"
                                    onClick={(e) => deleteUser(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}

export default index;
