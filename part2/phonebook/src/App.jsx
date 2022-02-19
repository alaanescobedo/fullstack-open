import { memo, useEffect, useState } from 'react'
import phonebookService from './services'

// Data
const labelOptions = {
  phonebook: 'Phonebook',
  numbers: 'Numbers',
  addButton: 'add',
  inputName: 'name',
  inputPhone: 'phone',
  inputSearch: 'searchFilter',
  inputSearchLabel: 'filter show with:'
}
const addPersonFormInputOptions = {
  fieldName: {
    label: 'name',
    inputName: 'name'
  },
  fieldPhone: {
    label: 'number',
    inputName: 'phone'
  }
}

// Helper functions
function findPersonMatch (person, queryFilter) {
  const sanitizedName = person.name.toLowerCase()
  const sanitizedQuery = queryFilter.toLowerCase()
  return sanitizedName.includes(sanitizedQuery)
}

// Components
const InputField = ({ label, handleChange, inputName, value }) => (
  <div>
    {label}
    <input
      name={inputName}
      onChange={handleChange}
      value={value}
    />
  </div>
)
const Heading = ({ label }) => (
  <h2>{label}</h2>
)
const Button = ({ handleClick, label }) => (
  <button onClick={handleClick}>
    {label}
  </button>
)
const AddPersonForm = ({ handleChange, handleSubmit }) => {
  const inputList = Object.values(addPersonFormInputOptions)
  return (
    <form>
      {inputList.map(({ label, inputName }) => (
        <InputField
          label={label}
          inputName={inputName}
          handleChange={handleChange}
          key={inputName}
        />
      ))}
      <Button
        label={labelOptions.addButton}
        handleClick={handleSubmit}
      />
    </form>
  )
}
const PersonData = memo(({ person, handleDelete }) => {
  return (
    <>
      <p key={person.name}>
        {person.name} - {person.number}&nbsp;
        <button onClick={() => handleDelete(person)}>delete</button>
      </p>
    </>
  )
})
const PersonsDictionary = ({ persons, queryFilter, handleDelete }) => {
  const [currentPersons, setCurrentPersons] = useState(persons)

  useEffect(() => {
    if (queryFilter) {
      return setCurrentPersons(persons.filter(person => findPersonMatch(person, queryFilter)))
    }
    setCurrentPersons(persons)
  }, [queryFilter, persons])

  return (
    <>
      {currentPersons.map(person => (
        <PersonData key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </>
  )
}

// Main Component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState({
    status: '',
    message: ''
  })

  useEffect(() => {
    phonebookService.getAllPersons().then(data => setPersons(data))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setStatusMessage({
      status: '', message: ''
    }), 4500)
    return () => clearTimeout(timer)
  }, [statusMessage])

  const handleInputChange = ({ target }) => {
    const inputCases = {
      [labelOptions.inputName]: () => setNewName(() => target.value),
      [labelOptions.inputPhone]: () => setNewPhone(() => target.value),
      [labelOptions.inputSearch]: () => setSearchFilter(() => target.value)
    }
    inputCases[target.name]()
  }

  const handleUpdate = async (newPersonData) => {
    const personToUpdate = persons.find(person => person.name === newPersonData.name)
    try {
      const data = await phonebookService.updatePerson(personToUpdate.id, newPersonData)
      setPersons(persons.filter(person => person.id !== personToUpdate.id).concat(data))
      setStatusMessage({ status: 'success', message: `${newPersonData.name} updated` })
    } catch (error) {
      setStatusMessage({
        status: 'error',
        message: `Information of ${personToUpdate.name} can't be updated`
      })
    }
  }

  const handleDelete = async (personToDelete) => {
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (!confirmDelete) return

    try {
      await phonebookService.deletePerson(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
      setStatusMessage({ status: 'success', message: `${personToDelete.name} data deleted` })
    } catch (error) {
      setStatusMessage({
        status: 'error',
        message: `Information of ${personToDelete.name} has already been removed from server`
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newPhone }

    if (!newName || !newPhone) {
      return setStatusMessage({ status: 'error', message: 'Name and number are required' })
    }

    if (persons.find(person => person.name === newName)) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!confirmUpdate) return

      return handleUpdate(newPerson)
    }

    try {
      const data = await phonebookService.createPerson(newPerson)
      setPersons(() => ([...persons].concat(data)))
      setStatusMessage({ status: 'success', message: `${newName} added to phonebook` })
    } catch (error) {
      setStatusMessage({ status: 'error', message: `${newName} can't be added` })
    }
  }

  return (
    <div>
      <Heading label={labelOptions.phonebook} />
      <p style={statusMessage.status === 'success'
        ? { color: '#6CD7C2' }
        : { color: 'tomato' }}
      >
        {statusMessage.message}
      </p>
      <InputField
        label={labelOptions.inputSearchLabel}
        inputName={labelOptions.inputSearch}
        handleChange={handleInputChange}
      />
      <AddPersonForm
        handleSubmit={handleSubmit}
        handleChange={handleInputChange}
      />

      <Heading label={labelOptions.numbers} />
      {
        persons.length > 0
          ? <PersonsDictionary
              persons={persons}
              queryFilter={searchFilter}
              handleDelete={handleDelete}
            />
          : <h3>Loading...</h3>
      }
    </div>
  )
}

export default App
