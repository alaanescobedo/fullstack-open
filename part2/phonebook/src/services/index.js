import axios from 'axios'

const baseURL = 'http://localhost:3001/api/v1/persons'

const getAllPersons = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then(res => res.data)
}

const updatePerson = (id, updatedData) => {
  const request = axios.put(`${baseURL}/${id}`, updatedData)
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(res => res.data)
}

export default {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson
}
