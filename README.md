**Specifications**

Use Angular 2+ to build an e-commerce site with user registration
(registration/auth mocking is permitted), product catalog,
authentication, and roles.
-   User can register at any time to the store 
    > (registration/auth mocking is permitted)
    -   Recaptcha on user registration
-   Three types of roles: admin, manager, user
    -   Admin
        -   Can *CRUD (Create, Read, Update, Delete)* users
        -   Can assign/remove roles to users
        -   Can *CRUD* products
        -   Can *RD* orders
    -   Manager
        -   Can *CRU* products
        -   Can *R* orders
        -   Can change status of an order
    -   User
        -   Can *CR* orders
        -   Update Profile
            -   Billing Address
            -   Shipping Address
-   Order checkout
    -   Ability to add different products and different quantities to the cart
    -   Payment using PayPal or Stripe Sandboxes
    
**Technical requirements**
-   You can use a service like Firebase to power the backend of your application, 
    > alternatively, you can create your own with your language of preference.
-   Use Ngrx to manage the state.
-   You can use third party UI libraries.
-   Separate modules for User/Admin+Manager supporting Lazy Loading.
