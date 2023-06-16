![petition form](images/form.jpg)

# React Forms

Forms allow users to interact with our web application. In HTML forms can have some unexpected behaviors for new developers.

In this lesson, we'll get a more thorough look at how to best create and interact with forms in React.

# Getting Started

- `fork` and `clone`
- `cd` into the newly created directory
- Run `npm install` to install our backend dependencies
- `touch` a `.env` file and create a variable called `MONGODB_URI`
- Go to [MongoDB Atlas](https://account.mongodb.com/account/login) and sign in
- At the top of your collection, select `connect`
- Select `Connect your application` from the list
- Copy the connection string from Step 2 into your `.env` file as the value for `MONGODB_URI`. No spaces, no quotes.
- Replace `<password>` with your actual database password. No spaces, no quotes, replacing the `<>` also.
- Save
- Add `.env` to your `.gitignore` file on the backend
- Run `npm run dev` to spin up our backend Express server
- In a separate terminal instance, `cd client` to move into the frontend directory
- Run `npm install` to install our frontend dependencies
- Run `npm run dev` to spin up our frontend React server

This application is what is is called a "coupled" application, containing the code for both our front and back ends, but you can see they are still very much separate apps with separate node environments. They just share a repository.

## Learning Objectives

- Describe how HTML forms work.
- Use buttons inside HTML forms.
- Build forms utilizing accessibility best practices.
- Distinguish between controlled and uncontrolled form elements in React.

## HTML Form Element

In HTML, the `<form></form>` element represents a document section containing interactive controls for submitting information.

- Any `button` **without** a type attribute, or any `button` or `input` element with the an attribute of `type="submit"` will cause a `submit` event to be fired.
- By default, when forms are submitted they will cause the page to reload in HTML.
- In order to prevent the page from reloading, you should listen for the submit event using JavaScript and make sure to call the `preventDefault` method in your event handler function.

## HTML Form Elements

Form elements include various types of interactive elements such as text fields, checkboxes, radio buttons, select elements, etc. There are also a variety of [type attributes](https://www.w3schools.com/html/html_form_input_types.asp) for the `<input/>` element that can change the behavior of the input as well as restrict the type of data that can be entered.

It is particularly important to pay attention to accessibility [best practices](https://webaim.org/techniques/forms/controls) when creating forms in HTML.

```html
<form>
  <!-- Connect every field to a label using the `for` attribute -->
  <!-- The `id` of the input uniquely connects the label and input -->
  <label for="email">Email:</label>
  <input id="email" type="email" />
  <label for="password">Password:</label>
  <input id="password" type="password" />
</form>
```

## Forms in React

Forms are *stateful* by nature. They need to _remember_ information that will be submitted to the server for processing. There is a pattern that we use for this in React. You can use this same pattern for all form processing in React!

Here's an example:

```jsx
import { useState } from 'react'

const LoginForm = () => {
  const initialState = { 
    username: '', 
    password: '' 
  }
  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // do something with the data in the component state
    console.log(formState)
    // clear the form
    setFormState(initialState)
  }
  // Note that we need to use `htmlFor` instead of `for` in JSX
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        onChange={handleChange}
        value={formState.username}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={handleChange}
        value={formState.password}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
```

We call these form elements "controlled" because we're allowing React to _control_ their value. Let's breakdown the pattern:

### Step 1. Start with an Object in State

When working with forms, it's helpful to have all of the values in a single object. Most often, this is how our APIs will want us to send the data to them. We'll learn more about sending data to APIs in the next unit, but using this pattern will make it easy for us to work with them in the future. An object that contains a property for each input inside the form will work well for most use cases. Assume we have a wireframe for a form like this:

<img src="https://media.git.generalassemb.ly/user/17300/files/d85aa680-11e3-11eb-85a5-b64b67088b36" alt="wireframe" width="50%" />

We could have an object that represents it like this:

```js
const initialState = {
  issueType: '',
  subject: '',
  message: '',
}

const [formState, setFormState] = useState(initialState)
```

Let's create a `components` folder inside of `src`. Then, create a `Form.jsx` file. Set it up like a regular React component. Import `useState`, and let's paste the above snippet at the top of our function. Have your return statement just contain an empty `<form>` element with a button inside with `type="submit"`.

Don't forget to import it into `App.js` and let's render it right above our `<h1>Issues:</h1>`.

<details>
<summary>Starting Form.jsx</summary>

```jsx
import { useState } from 'react'

const Form = (props) => {
  const initialState = {
    issueType: '',
    subject: '',
    message: ''
  }
  const [formState, setFormState] = useState(initialState)

  return (
    <form>
      <button type="submit">Send</button>
    </form>
  )
}

export default Form

```

</details>

### Step 2. Build the Basic Form

Following best practices for form accessibility, build a JSX form that renders the corresponding HTML:

```jsx
//...
return (
  <form>
    <label htmlFor="issueType">Type of Issue:</label>
    <select id="issueType">
      <option value="outage">Service Outage</option>
      <option value="billing">Billing</option>
      <option value="cancel">Cancel Service</option>
    </select>
    <label htmlFor="subject">Subject:</label>
    <input type="text" id="subject" />
    <label htmlFor="message">Message</label>
    <textarea id="message" cols="30" rows="10"></textarea>
    <button type="submit">Send</button>
  </form>
)
//...
```

Remember that JSX **is** JavaScript, so we can't use a reserved keyword like `for` as an attribute in our label elements. Also note that we have a button with a type of `submit`. _All_ buttons that do not have a `type` attribute act as a submit for forms by default in HTML, but it's good practice to be specific.

### Step 3. Add the Form Submit Handler

By convention, we'll give our form submit handler the name `handleSubmit`. We'll then use the event object that the browser passes to it, and prevent the page from being refreshed by using the event's `preventDefault` method. When we're done doing what we need to with the data, we can clear the form by resetting it to it's initialState using the variable we set up earlier.

```jsx
// Event Handler: a callback function to be run when the event is observed
const handleSubmit = (event) => {
  // we always need to stop the browser from submitting the form or the page will be refreshed.
  event.preventDefault()
  // do something with the data in the component state
  console.log(formState)
  // clear the form
  setFormState(initialState)
};

// Event Listener: tells the browser which event to listen for on which element and what to do when the event happens
<form onSubmit={handleSubmit}>
```

### Step 4. Connect the Form Fields to State

Here's where the real magic happens! This is where our form's fields become controlled and automatically update our state.

We'll start with another event handler. This is the handler that will run every time there is a _change_ to one of our form fields. _All HTML form elements have a change event._ We listen for this event to make sure that we have a generic handler. Every form element also has a _value_ property that remembers the value the user entered in it or chose. Again, by convention, we'll name this handler `handleChange`.

```jsx
const handleChange = (event) => {
  setFormState({ ...formState, [event.target.id]: event.target.value })
}
```

Notice that we're using the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) It "spreads" the object properties, along with their corresponding values, inside a new object literal `{ }`. Then we are using `[ event.target.id ]` to [compute the property name](https://ui.dev/computed-property-names/) we would like to replace in the object, again--with its corresponding value `event.target.value`.

Now that we have our handleChange event handler, we need to connect all of the form elements to it.

Add an `onChange` attribute to each element and reference the `handleChange` function as it's value.

Lastly, we just have to connect each element's `value` attribute to it's corresponding property in the `formState`.

```jsx
<form onSubmit={handleSubmit}>
  <label htmlFor="issueType">Type of Issue:</label>
  <select id="issueType" onChange={handleChange} value={formState.issueType}>
    <option value="outage">Service Outage</option>
    <option value="billing">Billing</option>
    <option value="cancel">Cancel Service</option>
  </select>
  <label htmlFor="subject">Subject:</label>
  <input
    type="text"
    id="subject"
    onChange={handleChange}
    value={formState.subject}
  />
  <label htmlFor="message">Message</label>
  <textarea
    id="message"
    cols="30"
    rows="10"
    onChange={handleChange}
    value={formState.message}
  ></textarea>
  <button type="submit">Send</button>
</form>
```

This is a totally generic and reusable way to handle forms in React. Nice!

### Step 5. Let's go Full Stack!

This application is Full Stack, so now that we have our form values submitting from our form to state, all we need to do is make an axios call to our backend!

Refactor your handleSubmit to look something like this (import axios at the top):

```jsx
const handleSubmit = async (event) => {
  event.preventDefault()
  await axios.post('http://localhost:3001/issues', formState)
  setFormState(initialState)
}
```

Now, over in `App.js`, let's pass our `getIssues` function to `Form.jsx` as a prop.

```jsx
<Form getIssues={getIssues} />
```

Back in `Form.jsx`, let's utilize that prop inside our handleSubmit to make a new call to our backend for an updated list of issues.

```jsx
const handleSubmit = async (event) => {
  event.preventDefault()
  await axios.post('http://localhost:3001/issues', formState)
  setFormState(initialState)
  props.getIssues()
}
```

In a real world application, we would update the issues state in App.js directly, rather than just making a new axios call, but this will work for now.

Let's try submitting a new issue and watch as it gets added to our database and updated on our page. Nice!

### Recap

In this lesson, we learned how to interact with forms in React and covered some best practices for how we set them up, handle form value changes, and submission.

## Additional Resources

- [Type Attributes](https://www.w3schools.com/html/html_form_input_types.asp)
- [Accessibility Best Practices](https://webaim.org/techniques/forms/controls)
- [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Computed Property Names](https://ui.dev/computed-property-names/)
- [React Forms | React Docs](https://reactjs.org/docs/forms.html)
- [React Forms | W3Schools](https://www.w3schools.com/react/react_forms.asp)

```
