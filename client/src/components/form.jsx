import { useState, } from "react";
import axios from 'axios'

const Form = (props) => {
    const initialState = {
        issueType: '',
        subject: '',
        message: '',
    }

    const [formState, setFormState] = useState(initialState)

    // Event Handler: a callback function to be run when the event is observed
    const handleSubmit = async (event) => {
        // we always need to stop the browser from submitting the form or the page will be refreshed.
        event.preventDefault()
        // do something with the data in the component state
        await axios.post('http/localhost/5173/issues', formState)
        // clear the form
        setFormState(initialState)
        getIssues()
    };

    const handleChange = (evt) => {
        setFormState({ ...formState, [evt.target.id]: evt.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="issueType">Type of Issue:</label>
            <select id="issueType" onChange={handleChange} value={formState.issueType}>
                <option value="outage">Service Outage</option>
                <option value="billing">Billing</option>
                <option value="cancel">Cancel Service</option>
            </select>
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" onChange={handleChange} value={formState.issueType}/>
            <label htmlFor="message">Message</label>
            <textarea id="message" cols="30" rows="10" onChange={handleChange} value={formState.issueType}></textarea>
            <button type="submit">Send</button>
        </form>
    )
}

export default Form