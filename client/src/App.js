import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

import Table from "./components/Table";
const localhost = "http://localhost:3001";

const Container = styled.div`
    color: #1a191a;

    h1 {
        text-align: center;
    }

    .btn {
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 4px 10px;
        margin: 5px 0;
        cursor: pointer;
    }

    .btn-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    input {
        padding: 10px 8px;
        border: none;
        border-radius: 4px;
        margin: 5px;
        background-color: transparent;
        border: 1px solid #ccc;
        font-family: "Poppins", sans-serif;
        color: #000;
    }

    input::placeholder {
        font-family: "Poppins", sans-serif;
        color: #000;
    }
`;

function App() {
    const [data, setData] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getData();
    }, [isEditing]);

    function getData() {
        try {
            axios
                .get(`${localhost}/users`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    throw err;
                });
        } catch {
            console.error("Não foi possível buscar os usuários.");
        }
    }

    function addUser(email, password, status) {
        try {
            axios
                .post(`${localhost}/add`, {
                    email,
                    password,
                    user_status: status,
                })
                .then((res) => {
                    getData();
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Não foi possível adicionar usuário.");
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        if (!isEditing) {
            addUser(email, password, status);
        }
    }

    function editUser(data) {
        setIsEditing(true);
        setEmail(data.email);
        setPassword(data.password);
        setStatus(data.user_status);
        setUserId(data.id);
    }

    function handleUpdateUser() {
        try {
            axios.put(`${localhost}/update/${userId}`, {
                email,
                password,
                user_status: status,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Não foi possível atualizar usuário.");
        }
    }

    return (
        <div className="App">
            <Container>
                <header>
                    <h1>Users table</h1>
                    <div className="btn-box">
                        <form onSubmit={handleOnSubmit}>
                            <input
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <input
                                placeholder="Status"
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                            />
                            {isEditing ? (
                                <>
                                    <button
                                        className="btn add"
                                        onClick={handleUpdateUser}
                                        type="submit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn add"
                                        type="submit"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button className="btn add" type="submit">
                                    Add New User
                                </button>
                            )}
                        </form>
                    </div>
                </header>
                <main>
                    {data === null ? (
                        "Carregando..."
                    ) : (
                        <Table
                            data={data}
                            getData={getData}
                            editUser={editUser}
                        />
                    )}
                </main>
            </Container>
        </div>
    );
}

export default App;
