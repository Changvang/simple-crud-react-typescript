import React, { useState, useEffect } from "react";
import  { Redirect } from 'react-router-dom';

interface Props {
  callBack: ()=> void;
}

export const CreatePersonForm: React.FC<Props> = ({callBack}) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(()=>{
    setFullName("");
    setAddress("");
    setAge(0);
    setCreated(false);
  }, []);


  const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // POST api to server 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName, age: age, address: address })
    };
    const response = await fetch('http://localhost:3001/persons', requestOptions);
    const data = await response.json();

    setCreated(true);

    callBack();

    console.log("create" + data);
  };

  return (
    <>
    { !created ?
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
        <input type="submit" value="Submit" />
      </form> : (<><h1>Already add new person information</h1><Redirect to="/" /></>)
    }
    </>
  );
};
