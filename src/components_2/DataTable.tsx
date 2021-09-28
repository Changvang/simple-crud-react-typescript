import React from "react";

import Person from "./Person";

type OnePerson = {
    id: number;
    fullName: string;
    address: string;
    age: number;
};

type Props = {
    persons: OnePerson[];
    onDelete: (id: number) => void;
    onEdit: (person: OnePerson) => void;
};

export const DataTable: React.FC<Props> = ({ persons, onDelete, onEdit }) => {
    return (
        <div className="data-table">
            <table>
                <thead>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {persons.map((person) => (
                        <Person
                            key={person.id}
                            id={person.id}
                            fullName={person.fullName}
                            age={person.age}
                            address={person.address}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
