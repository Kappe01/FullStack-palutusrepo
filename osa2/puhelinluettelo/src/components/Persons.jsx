import axios from "axios"

const Persons = ({persons, del}) => {
    return (
        <div>
        {persons.map(person =>
        <Person key={persons.id} person = {person} del={del}/>
        )}
        </div>
    )
}

const Person = ({person, del}) => {
    
    return (
        <p>{person.name} {person.number} <button onClick={() => del(person, person.id)}>delete</button></p>
    )
}

export default Persons