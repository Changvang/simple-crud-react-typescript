import React, { useState, useEffect } from "react";
import { CreatePersonForm } from "./CreatePersonForm";
import { EditPersonForm } from "./EditPersonForm";

import { fetchPersons, Person } from "../API_2";

import { DataTable } from "./DataTable";

import { useHistory, useLocation } from "react-router-dom";

export const Body = () => {

    const [persons, setPersons] = useState<Person[]>([]);
    const [loaded, setLoaded] = useState(false);

    const loadData = async () => {
        const data = await fetchPersons();
        return data;
    };

    const changeLoad = () =>{
        setLoaded(prev => !prev);
    };

    let history = useHistory();
    let location = useLocation<{detail: Person}>();

    function handleClick(person: Person) {
        history.push({pathname:"/edit", state: {detail: person}});
    }

    useEffect(()=>{
        async function initCallData() {
            setPersons(await loadData());
        }
        initCallData();
    }, [loaded]);

    const onDeletePerson = (id: number) =>{
        async function deleteCall(){
            const requestOptions = {
                method: 'DELETE',
            };
            const response = await fetch(`http://localhost:3001/persons/${id}`, requestOptions);
            const data = await response.json();
            console.log(data);
            changeLoad();
        }
        deleteCall();
        console.log("Delete: " + id);
    };

    return (
        <div className="body">
            {location.pathname === "/" ? (
                <>
                    <h1>Person List</h1>
                    <DataTable persons={persons} onDelete={onDeletePerson} onEdit={handleClick}/>
                </>
            ) : location.pathname === "/create" ? (
                <>
                    <h1>Create New Person Information</h1>
                    <CreatePersonForm callBack={changeLoad}/>
                </>
            ) : location.pathname === "/edit" ? (
                <>
                    <h1>Edit Person Information</h1>
                    <EditPersonForm callBack={changeLoad} stateDetail={location.state.detail}/>
                </>
            ): null}
        </div>
    );
};
