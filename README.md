<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry Bank - Fintech App

This is a project made by a team of 8 people *(check contributors)* as part of [Soy Henry](https://www.soyhenry.com/)'s education program. The point of this project consisted in creating a Fintech App using React Native complemented with an microservice architecture API.

### Tech Stack

- **Front End:**
    + React Native, React Navigation
    + Expo
    + Formik
    + Native Base
    + Redux
    + Axios

- **Back End:**
    + Express.js
    + Express Gateway
    + Passport Session Authentification (Local Strategy)
    + PostgreQL
    + Baileys
    + Sendgrid
    + Sequelize

# How to start the project:

To run this project locally follow the next steps:

- Clone (or fork and clone) this repository
- Install [PostgreSQL](https://www.postgresql.org/) 
- Run command prompt and enter `psql -U postgres` and enter the password you provided when installing PostgreSQL.
- Enter `CREATE DATABASE henrybank;` 
- Run ```npm i``` inside ```/api/microservices``` and ```/client```
- Sign up with [Sendgrid](https://sendgrid.com/) and obtain an API key, create at least one dynamic template.

- Create a `.env` file inside  `api/microservices` folder with the format provided in the `.env.example` file

- Head to `api/microservices/db.js` uncomment lines 86-92, run `npm start` inside `api/microservices` TWICE, afterwards comment those lines again. This is used to create a bank user who is responsable of the recharge system.

- Head to `api/microservices/config/gateway.config.yml` and replace all `'YOUR_LOCAL_IP'` by your preffered IPv4 (you can find it by running `cmd` and writing `ipconfig /all`.

- Run `npm start` inside `/client` folder and start the project from Expo emulating a device or using your own device.

**NOTE**: If you want to promote yourself to administrador you must create an user and use Postman (or some related software) and make a PATCH request to: `http://YOUR_LOCAL_IP/users/promote/:userId`
# App Previews

### Promotional Video:
[![Click Here](https://img.youtube.com/vi/t1KtkQB5uQ8/0.jpg)](https://www.youtube.com/watch?v=t1KtkQB5uQ8) 
Click Me

### Project Full Demo (in spanish):

[![Click Me](https://img.youtube.com/vi/BcFIxGM8K_Y/0.jpg)](https://www.youtube.com/watch?v=BcFIxGM8K_Y)
Click Me

# About Us:

We are 5 developers actually residing in Argentina and Uruguay.

	
[Full Stack]
- Mathías Falcón (UY) [GitHub](https://github.com/mathfalcon) [LinkedIn](https://www.linkedin.com/in/math%C3%ADas-falc%C3%B3n-13b03a1b8/)

[Backend Team]
- Victor Guiliana (AR) [GitHub](https://github.com/ViktorArg) [LinkedIn](https://www.linkedin.com/in/victor-guiliana-9410898b/)
- Fabio Argañaraz (AR) [GitHub](https://github.com/FabioDrizZt) [LinkedIn](https://www.linkedin.com/in/fabiodrizzt/)
- Jose Chacin (AR) [GitHub](https://github.com/joc13th) [LinkedIn](https://www.linkedin.com/in/josechacinm/)

[Frontend Team]
- Matias Bonino (AR) [GitHub](https://github.com/matias2301) [LinkedIn](https://www.linkedin.com/in/mat%C3%ADas-bonino-179ab71b2/)
- Agustin Dominguez (AR) [GitHub](https://github.com/GusdomDominguez) [LinkedIn](https://www.linkedin.com/in/agustindominguez-43b4221b1/)
- Ariel Tecay (AR) [GitHub](https://github.com/arieltecay) [LinkedIn](https://www.linkedin.com/in/ariel-tecay-9a78a957/)
- José González Padrón (AR) [GitHub](https://github.com/JoseTomas-GP95) [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-gonz%C3%A1lez-padr%C3%B3n-6251a316a//)
