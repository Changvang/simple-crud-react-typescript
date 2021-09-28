export type Person = {
    fullName: string,
    address: string,
    age: number,
    id: number
}

export const fetchPersons = async(): Promise<Person[]> => {
    const endpoint = "http://localhost:3001/persons";
    const data = await(await fetch(endpoint)).json();
    return data;
}