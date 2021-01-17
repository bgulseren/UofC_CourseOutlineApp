# React Notes

## Components

Each component should have a return which is html (which is actually jsx), such as:

```

function ComponentName() {
return <p>This is the return html value of this component</p>
}

```

The above is also called 'dump' or 'stateless' functional component (because it does not have any state)

This return value is used for the rendering (under the hood, the html is converted into JSX). If return is not an html, alternatively we can explicitly use React.createElement(tagName, props, children), such as:

```

return React.createElement('h1', {}, 'hello world');

```

Please note that, that would make things harder if html to be returned/created has nested tags. When returning jsx, this is no problem, however with createElement, this becomes trickier. This involves, within children of createElement function call, you need to invoke createElement function another time to create the inner html tag. This creates a lot of unreadeable code, therefore it is not a preferred method.

### Arrow Function

Explicit return format:

```

const Greeting = () => {
    return <h1>The text here</h1>;
}

```

Implicit return format:

```

const Greeting = () => <h1>The text here</h1>;
}

```

### Nesting Components

https://www.youtube.com/watch?v=4UZrsTqkcW4 (1:29:15)

If we have two functions to render, simply one function (usually called App) is used to merge things before submitting to ReactDOM.render. For instance.

```

function MergingFunctionToRender() {
    return (
        <div>
            <Function1 />
            <Function2 />
        </div>
    );
}

```

## Rendering

React.DOM is used to render the component's return value (either functional or class components) into a targeted place. Every component which needs to be rendered by React.DOM should start with a capitals. For instance:

```

ReactDOM.render(<name of component/>, document.getElementById('name of the tag id where the component will be injected inside index.html'));

```

or, alternatively

```

ReactDOM.render(<name of component></name of component>, document.getElementById('name of the tag id where the component will be injected inside index.html'));

```

## JSX Rules for Component Return

- Return single element
- either div / section / article (and follow html semantics). Alternatively we can use React.Fragment if we don't want to create an addition html tag. React fragment is same as an empty html tag (just <> and </>)
- use camel case for html attribute
- className instead of class for css classing (because class is registered for js classes)
- close every element (even html5 tags which do not usually require closing, like img)
- formatting

## Linking a static css file to index.js

Importing css is different from importing npm dependencies (ie import react, etc). Therefore it requires a path to the css file.

import './filename.css'

./ means the file is in the same folder. ../ means one level up.

Also some nice tricks for gridding / styling with a static css is presented in

https://www.youtube.com/watch?v=4UZrsTqkcW4 at (1:44:00)

## Inline styling or styling with JSX

For example, within index.js or within any component, we can change the styling with:

```
<h4 style={{}}>THe text goes here</h4>
```

An important thing here is that style={} means javascript, but
style={{}} means just an object (not sure, needs checking)

Example usage:

```
<h4 style={{ color: '#617d98', fontSize: '0.75rem', marginTop: '0.25rem' }}>THe text goes here</h4>
```

Notice that these will show up as inline style elements when looked from developer view on browser.

If static css file and both inline styling are present, inline would take over.

If only one curly level braces are used, that means we can directly use javascript. For instance, if we define a variable:

```
const title = ' I love you to the moon ';
```

we can use that variable by using single level curly braces.

```
<h1>{title}</h1>
```

We can also directly use an expression within curly braces to pass that value. Note that statements are not allowed since the return should contain a value.

```
<h1>{6+6}</h1>
```

We can also invoke js methods directly in the curly braces. For instance:

```
<h1>{title.toUpperCase()}</h1>
```

## Props

Props are basically an argument oject which is used to pass arguments to functions. Basic syntax is:

```
const Greeting = (props) => {
    return <h1>The text here</h1>;
}
```

The way props are passed from a different location:

```
<Greeting job='developer' />
```

the above means Greeting fucntion is called with the props job as developer.

### Passing values

Passing values are handled by javascript, therefore curly braces are needed. For instance,

```
<Greeting job='developer' number={22} />
```

AS you can see in the example above, since the value 22 needs to be passed using js, therefore curly braces are used.

### Accessing values

```
const Greeting = (props) => {
    return (
        <div>
            <h1>{props.job}</h1>
            <p>{props.number}</p>
        </div>
    );
}
```

or (by indirect destructring)

```
const Greeting = (props) => {
    const {job, number} = props;
    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
        </div>
    );
}
```

or (by direct destructring)

```
const Greeting = ({job, number}) => {
    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
        </div>
    );
}
```

Children props (the props which were passed between brackets) can be passed with

```
const Greeting = ({job, number, children}) => {
    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
            <p>{children}</p>
        </div>
    );
}
```

## Arrays

Simple array:

const names = ['john', 'peter', 'susan'];

Objects array:

For example, a books array with the elements:

```
const books = [
    {
        title: 'book1',
        author: 'author1',
    }
,
    {
        title: 'book2',
        author: 'author2',
    },
];

```

### Iterating over simple arrays

To iterate, we can use map().

```
const names = ['john', 'peter', 'susan'];
const newNames = names.map((name) => {
    console.log(name);
});
```

or to put each name into <h1>, simply use:

```
const names = ['john', 'peter', 'susan'];
const newNames = names.map((name) => {
    return <h1>{name}</h1>
});
```

### Iterating over objects arrays

```
const books = [
    {
        id: 1,
        title: 'book1',
        author: 'author1',
    }
,
    {
        id: 2,
        title: 'book2',
        author: 'author2',
    },
];

```

```
function BookList() {
    return (
        <section className='booklist'>
            {books.map((book) => {
                const {title, author} = book;
                return (
                    <div>
                        <h3>{title}</h3>
                        <h4>{author}</h4>
                    </div>

                    //or we can simply pass to the Book const using book as props

                    <Book key={book.id} book={book}></Book>
                );
            })}
        </section>
    );
}
```

then simply use propos.book on the Book component to access the sub props like title and author.

### Spread operator

Instead of code below:

```
<Book key={book.id} book={book}></Book>;
```

which requires usage pf props.book, we can also spread out all props as they are, using:

```
<Book key={book.id} {...book}></Book>;
```

this won't require props.book anymore.

## Events

To set up an even with one of the components, we usually need an attribute and an event handler.

To see a list of all the event types, we can google react syntetic events.

We can add an event to a button using the ref method below.

```
const Greeting = ({job, number}) => {

    //reference method
    const clickHandler = () => {
        aler('hello world');
    };

    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
            <button type="button" onClick={clickHandler}>Button Label</button>
        </div>
    );
}
```

We can add an event to a button using the inline method below.

```
const Greeting = ({job, number}) => {

    //reference method
    const clickHandler = () => {
        alert('hello world');
    };

    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
            <button type="button" onClick={ () => alert('hello world') }>Button Label</button>
        </div>
    );
}
```

ANother more complex example to use variables inside event

```
const Greeting = ({job, number}) => {

    const complexExample = (author) => {
        alert(author);
    };

    return (
        <div>
            <h1>{job}</h1>
            <p>{number}</p>
            <button type="button" onClick={ () => complexExample(author) }>Complex Button Label</button>
        </div>
    );
}
```

in the example above, we used the arrow notation to avoid calling the functions as soon as the page is rendered. This is the case when event function has an argument (author in the example), compared to the previous example.

youtube video, 3:07:40

## Exporting and Importing from Separate js files

Let's assume we wanted to move const books array declaration into a separate file and then imported into index.js for usage. To do that, simply create a separate books.js file and when declaring the variables books, put an export in front of it. For instance:

```
export const books = [
    {
    }
    ,
    {
    }

]
```

Within index.js, use (with relative pathing). Note that js files don't need to specify the extension.

import {books} from './books'

Importing another react component (which starts with upper case, ie Book)

Note that you can only use only one default export per file. Default export means that, when importing, you can specify any name that you want for the default imported component.

## Hooks

- All hooks start with a 'use' prefix, ie useState, useCallback.
- Component which use hooks should start with a capital letter.
- Hooks should be within a component or in a function body. Global declaration is not allowed.
- Hooks cannot be called conditionally (useEffect has a good example).

### useState Hook

To import useState (which is a function),

```
import React, { useState } from 'react';
```

as can be seen, it is a named import, thus it requires curly braces.

It can also be invoked without import and called from main React class directly using React.useState()

useState() returns: [undefined, f], where f is a function which controls the first part (undefined).

- Common usage pattern:

const [var, setVar] = useState(default value);

for instance:

const [text, setText] = useState('Hello World');

- Accessing value from return
  We can reference the text variable shown above within the return statement as below.

```
return (
    <React.Fragment>

        <h1>{text}</h1>
    </React.Fragment>
)
```

- Changing value

We want to change the value of text again from a function (like a click handler), we can use

const handleClick = () => {
setText('Hello New World');
}

of course, if we refresh the page, text variable will go back its initialization value.

- Handling arrays

We can use arrays with useState hook, as React.useState([]), where [] indicates our array (here is an empty one)

const [arr, setArr] = useState([]);

## Tips & Tricks

### Log to console

either console.log();
or {console.log()} (js version) can be used

### with ES7 VS Code extension

type 'rafce' and it will create a component boiler-plate automatically for us.

rfc: regular functional component

```

```
