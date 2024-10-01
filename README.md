# Django-Next Auth Boilerplate
Learning authentication with Django and Next had always been a pain in my ass. I remember I had to look up countless tutorials to make web apps when i was just starting out and still couldn't figure out how to manage and run authentication. Thankfully, 
I eventually was able to figure it out, and this is the boilerplate code for the same. The template for login and registration uses components from Aceternity UI, just to give it a better overall look. Hopefully this boilerplate code is helpful to someone 
out there suffering from the same problem which i used to suffer with.

## Working
This code uses axios, context api and jwt tokens for connection with backend api as well as authentication. Axios sends a post request and during registration, fetches and stores access and refresh tokens locally. Validation of access token takes place during login, and during logout, 
Refresh token is posted on the logout api using axios following which the user is logged out. 

### Please Note
This code is not perfect, but i believe it to be a good starting point to learn how to connect django backend with next frontend for authentication for basics. I am open to suggestions as well as guidance on how I could make this better! Contributions are very welcome!
