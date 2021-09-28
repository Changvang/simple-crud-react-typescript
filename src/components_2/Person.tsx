import React from "react"; 

type OnePerson = {
    id: number;
    fullName: string;
    address: string;
    age: number;
};

type Props = {
    id: number;
    fullName: string;
    address: string;
    age: number;
    onDelete: (id: number) => void;
    onEdit: (person: OnePerson) => void;
}

const Person: React.FC<Props> = ({
    id,
    fullName,
    address,
    age,
    onDelete, 
    onEdit
}) => (
    <>
        <tr>
            <td className="index">{id}</td>
            <td className="full-name">{fullName}</td>
            <td className="address">{address}</td>
            <td className="age">{age}</td>
            <td className="Actions">
                <button className="edit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit({id, fullName, address, age});
                }}>Edit</button>
                <button className="delete" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(id);
                }}>Delete</button>
            </td>
        </tr>
    </>
);

export default Person;