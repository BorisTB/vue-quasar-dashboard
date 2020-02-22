const getAuthToken = () => localStorage.getItem('token')
const setAuthToken = token => localStorage.setItem('token', token)
const deleteToken = () => localStorage.removeItem('token')

export { getAuthToken, setAuthToken, deleteToken }
