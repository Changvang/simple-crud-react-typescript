import React, { useState, useEffect } from "react";
import  { Redirect, useHistory } from 'react-router-dom';

type OnePerson = {
  id: number;
  fullName: string;
  address: string;
  age: number;
};

interface Props {
  callBack: ()=> void;
  stateDetail: OnePerson;
}

export const EditPersonForm: React.FC<Props> = ({callBack, stateDetail}) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [edited, setEdited] = useState(false);

  let history = useHistory();

  const returnFrontPage = ()=>{
    history.goBack();
  };

  useEffect(()=>{
    setFullName(stateDetail.fullName);
    setAddress(stateDetail.address);
    setAge(stateDetail.age);
    setEdited(false);
  }, []);


  const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // POST api to server 
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName, age: age, address: address})
    };
    const response = await fetch(`http://localhost:3001/persons/${stateDetail.id}`, requestOptions);
    const data = await response.json();

    setEdited(true);

    callBack();

    console.log("edit" + data);
  };

  return (
    <>
    { !edited ?
      <form onSubmit={onSubmitCreate}>
        <label>Full Name: </label>
        <input
          type="text"
          value={fullName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setFullName(e.currentTarget.value);
          }}
        />
        <label>Age: </label>
        <input
          type="number"
          value={age}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setAge(parseInt(e.currentTarget.value));
          }}
        />
        <label>Address: </label>
        <input
          type="text"
          value={address}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          e.stopPropagation();
          returnFrontPage();
        }}>Cancel</button>
        <input type="submit" value="Submit" />
      </form> : (<><h1>Already edit person information</h1><Redirect to="/" /></>)
    }
    </>
  );
};
