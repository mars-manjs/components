![Mars Man Components Logo](./imgs/logo.png)

# Description

Mars Man Components implements common components to be used in a React application

# Table of Contents
1. [Design Overview](#design-overview)
2. [Development](#development)
3. [API Documentation](<#API Documentation>)
3. [Examples](<#Examples>)


# Development
## System Requirements
- Dependencies: 
    - node: >14.15
    - npm:  >6.14
## Commands
```bash
# installation
npm i 

# tests
# run full test suite
`jest`

# run specific test suite
`jest forms.test.ts`

# run specific test 
`jest model.test.ts -t "async true"`

# build
npm run build

# publish
npm publish
```

# API Documentation


# Examples

## Route Guards
```tsx
const Routes = () => {
    return <Router history={history}>
        <Switch>
            // if model is loaded
            <LoadedRoute path='/app' model={model} component={Component}/>
            <AuthedRoute path='/app' component={Component}/>

            <UnauthedRoute path='/login' component={Component}/>
            <UnauthedRoute path='/signup' component={Component}/>
            <UnauthedRoute path='/demo' component={Component}/>
        </Switch>
    </Router>
}
```


## Forms and Inputs
### Basic Form
```tsx
import {Input as MaterialUIInput} from "@material-ui";

const MyForm = () => {
    return <Form form={form}>
        <Input id="name"/>

        // custom Input
        <Input id="name" input={MaterialUIInput}/>
    </Form>
}
```

### Automatic Forms
- if no children are defined the form will automatically define each field
    - using meta data to determine the input types
```tsx
const MyForm = () => {
    return <Form form={form}/>
}
```

### Input Types
- date picker
- textfield
- input 
- number


### Built In Forms
- form has to have fields, `username` and `password`
```tsx
// login form
<LoginForm form={form}/>
```


## Tables
### CRUD Tables
- if the model has a repo called delete it will enable the delete
- if a form is passed, all the members upon the class become editable fields
    - `dropdown=True` will result in the form being
```tsx
<Table model={}>
```