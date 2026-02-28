### Answer 1 :

getElementById() : getElementById() means finds one single element by its id. It is used when we know the exact id.
getElementsByClassName() : getElementsByClassName() means finds all elements with the same class name. It is used when many elements share the same class.
querySelector(): querySelector() means finds the first element that matches a CSS selector. It is used when  we want to use CSS style selectors.
querySelectorAll(): querySelectorAll() means finds all elements that match a CSS selector. It is used when you want to select many elements using CSS rules.

### Answer 2:

DOM is like a web page tree. we can create a new branch (element), then attach it to the tree. Steps:- 
1.Create a new element
2.Add text or content
3.Add class or id
4.Insert it into the page

### Answer 3:

Event bubbling means when we click on something inside a web page, the event starts from the element we clicked and then moves upward to its parent elements, one by one.
Imagine this situation:

You are in a room,
inside a house,
inside a street,
inside a city.

Now you clap your hands in the room.

The sound is heard:
1.First in the room
2.Then in the house
3.Then in the street
4.Then in the city

Your clap starts at the smallest place and moves up to bigger places.
That’s exactly how event bubbling works.

### Answer 4:

Event Delegation means:
Instead of listening to actions on many small items,
you listen on one bigger parent,
and let it handle what happens to the small items inside it.

Event Delegation is useful. Because,

1.Less work for the browser.
2.Works for new items added later.
3.Easier to manage our code.

### Answer 5:

preventDefault() stops the normal built-in behavior of something but stopPropagation() stops the action from traveling to bigger containers.