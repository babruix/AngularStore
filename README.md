**The Challenge**

Use Angular 2+ to build an e-commerce site with:

 - [ ]  User registration
    - [ ] User can register at any time to the store 
      >  (registration/auth mocking is permitted)
    - [ ] Recaptcha on user registration
- [ ] Product catalog
- [ ] Authentication
  >  (registration/auth mocking is permitted)
  - [ ] Recaptcha on user authentication
- [ ] Roles
  - [ ] Three types of roles: admin, manager, user
      - [ ] Admin
          - [x] Can *CRUD (Create, Read, Update, Delete)* users
          - [x] Can assign/remove roles to users
          - [x] Can *CRUD* products
          - [ ] Can *RD* orders
      - [ ] Manager
          - [ ] Can *CRU* products
          - [ ] Can *R* orders
          - [ ] Can change status of an order
      - [ ] User
          - [ ] Can *CR* orders
          - [x] Update Profile
              - [x] Billing Address
              - [x] Shipping Address
- [ ] Order checkout
    - [x] Ability to add different products and different quantities to the cart
    - [ ] Payment using PayPal or Stripe Sandboxes
    
**Technical requirements**
- [x] You can use a service like Firebase to power the backend of your application, 
    > alternatively, you can create your own with your language of preference.
- [x] Use Ngrx to manage the state.
- [x] You can use third party UI libraries.
- [ ] Separate modules for User/Admin+Manager supporting Lazy Loading.
