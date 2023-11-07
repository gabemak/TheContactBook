import React, { createContext, useState } from 'react';
import { data } from './data.js';
import Switch from "react-switch";

export const ThemeContext = createContext(null)


function App() {
    const [theme, setTheme] = useState("light")
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"))
    }

    const [search, setSearch] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [allData, setAllData] = useState(data)
    const [editId, setEditId] = useState(-1)

    const sampleHandleEdit = (value, id, field) => {
        const actualValue = { [field]: value }
        const editedData = allData.map((item) => item.id === id ? { ...item, ...actualValue } : item);
        console.log(editedData);
        setAllData(editedData);
    }

    const handleDelete = (deletingItem) => {
        const newItem = allData.filter((item) => item.id !== deletingItem.id);
        setAllData(newItem);
    }

    const handleEdit = (id) => {
        setEditId(id)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = allData.length + 1;
        setAllData([...allData, { id: id, first_name: first_name, last_name: last_name, email: email, phone: phone }])
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className='appAll' id={theme}>
                <div className='titlePlusDarkmode'>
                    <h1>The Contact book</h1>
                    <div className='switch'>
                        <label> {theme === "light" ? "Light mode" : "Dark mode"}</label>
                        <Switch onChange={toggleTheme} checked={(theme === "dark")} />
                    </div>

                </div>

                <div className='searchandadd'>
                    <div className='search'>
                        <h3>Type here to search for a contact:</h3>
                        <input type="text" placeholder='First name / last name / email / phone' size="28" onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} />
                    </div>

                    <div className='form'>
                        <h3>Add a new contact here:</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='formRow'>
                                <label className="form__label" for="firstName">First Name </label>
                                <input type="text" placeholder='Enter first name' onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className='formRow'>
                                <label className="form__label" for="firstName">Last Name </label>
                                <input type="text" placeholder='Enter last name' onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className='formRow'>
                                <label className="form__label" for="firstName">Email address </label>
                                <input type="email" placeholder='Enter email address' onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='formRow'>
                                <label className="form__label" for="firstName">Phone number </label>
                                <input type="number" placeholder='Enter phone number' onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className='formButtons'>
                                <input type="reset" value="Reset"></input>
                                <button>Add</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div>
                    <table className='table'>
                        <tr>
                            <th>Action</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>


                        {allData.filter((item) => {
                            return 'search'.toLocaleLowerCase() === '' ? item :
                                item.first_name.toLocaleLowerCase().includes(search)
                                || item.last_name.toLocaleLowerCase().includes(search)
                                || item.email.toLocaleLowerCase().includes(search)
                                || item.phone.toLocaleLowerCase().includes(search)
                        }).map((item) => (
                            item.id === editId ?
                                <tr>
                                    <td><button onClick={() => setEditId(-1)}>Update</button></td>
                                    <td><input type="text" value={item.first_name} onChange={e => sampleHandleEdit(e.target.value, item.id, 'first_name')} /></td>
                                    <td><input type="text" value={item.last_name} onChange={e => sampleHandleEdit(e.target.value, item.id, 'last_name')} /></td>
                                    <td><input type="text" value={item.email} onChange={e => sampleHandleEdit(e.target.value, item.id, 'email')} /></td>
                                    <td><input type="text" value={item.phone} onChange={e => sampleHandleEdit(e.target.value, item.id, 'phone')} /></td>
                                </tr>
                                :
                                <tr key={item.id}>
                                    <td><button onClick={() => handleDelete(item)} className='delButton'><span>Delete</span></button>
                                        <button onClick={() => handleEdit(item.id)} className='editButton'><span>Edit</span></button></td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                        ))}
                    </table>

                </div>

            </div >
        </ThemeContext.Provider>
    );
}


export default App;