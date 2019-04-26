## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] Mention two parts of Express that you learned about this week.

Middleware and routing

- [ ] Describe Middleware?

Functions that get the request and response objects and can operate on them and either return the response or call the next middleware in the pipeline. Useful for checking request conditions, logging, and security.

- [ ] Describe a Resource?

The things are application cares about; what we want to manage; the nouns in the application domain.

- [ ] What can the API return to help clients know if a request was successful?

Successful HTTP status code in the 200 range, namely status code 200 OK.

- [ ] How can we partition our application into sub-applications?

We can use express routers to break up application into smaller, modular pieces, and to make code more readable.