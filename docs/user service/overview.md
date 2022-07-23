## Overview

Today, most organizations need to keep their software applications secure by allowing only authenticated users to gain access to their protected data and resources. This may include computer systems, networks, databases, websites and other software based applications.

Samagra’s User Service provides some basic set of functionalities, easy to integrate apis and various authentication strategies to authenticate users to your application. You can directly use an instance of User Service in your application to access these services. With this, your users can sign in to a web or mobile app instantly through User service. It supports authentication using Passwords, Phone number, Bit password as well as additional services such as Forget/Reset password, Providing Role based access control (RBAC) to users within an enterprise, User creation &  various CRUD operations on a user.

### Use Cases

User service can be easily integrated and synced with many of the software applications in many industrial, medical & government sectors. These companies can then utilize the different services provided by the user service to either enhance user experience on their portals, provide easy to use authentication instance or strengthen the security to their network infrastructure.

1. User Service for Shiksha Sathi app
2. User Service for Samagra E-samwad app

Let us understand in detail how user service plays a part in the following sector

### Shiksha Sathi Mobile App

Shiksha Saathi is a mobile application developed by Samagra Shiksha for digitally recording the monthly school visits conducted by the different stakeholders across all levels in the state. The android app uses an instance of User service for its authentication portal. As you can see in the diagram below:

<p align="center">
<img src="images/sathi-login.jpg" width="400" height="600"/>
</p>

Similarly, e-Samwad is a flagship program of the Department of Education, Himachal Pradesh to involve parents in child's education by providing them regular updates about child's progress. It is an android app which also uses the same instance of User service for its registration portal. As you can see, User service components are reusable and can be easily re-integrate into different applications smoothly. As all the user credentials are stored centrally on a server hosted by Samagra, the developer need not worry about managing server hardware and creating a separate authentication software from scratch.

<p align="center">
<img src="images/esamwad-login.jpg" width="400" height="600"/>
</p>


### User Service Workflow 

<p align="center">
<img src="images/sam.png" width="800" height="600"/>
</p>

