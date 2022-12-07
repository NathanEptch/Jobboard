

# T-WEB-501-LYN-5-1-jobboard-felix.allaire



installation du projet ------------------------------=>
{

clonez le project avec la commande "git clone" dans le terminal 


![image](https://user-images.githubusercontent.com/113336285/195361778-2d5db91f-8e46-4e40-b104-51e7859b502b.png)



}

//task01
{
  La task01 contient la base de données 
}
Connectez-vous à MySQL en tant que "root" ou un autre utilisateur disposant de privilèges suffisants pour créer de nouvelles bases de données:
mysql -u root -p

Ensuite, créez une nouvelle base de données avec la commande suivante.
CREATE DATABASE jobBoard;

Ensuite, quittez le shell MySQL en appuyant sur CTRL+D. A partir du terminal normal, vous pouvez importer le fichier de sauvegarde contenue dans la task01 avec la commande suivante:
mysql -u [Nom d'utilisateur SQL] -p jobBoard < jobBoard.sql

Pour que votre base de données soit bien liés a l'API il faudra que vous modifier dans la task04/config/config.js les informations "new Sequelize('jobBoard', 'felix', 'root123', {" par votre Nom_utilisateur_SQL pour "felix" et votre mot de passe pour "root123". 

//task02
{
La task 02 contient un index.html ainsi qu'une feuille de styles. La page affiche une liste d'offre avec un design simple. Le bouton Afficher plus n'est pas fonctionel. 
}


//task03
{
A partir de cette task vous allez avoir besoin d'ouvrir les pages en localhost. Par exemple avec http-server dans le terminal à l'emplacement du projet.
La task prend la base de task précedente, mais change son contenu par les objets du fichier Json data.json
Dans le main.js, on change le contenu de chaque card par les objets json dans une boucle. On affiche l'entierté de la description sur click. 
}

//task04
{
A partir de cette task vous allez avoir besoin de démarrer la base de donnée MariaDb, avec la commmande "systemctl start mariadb" dans le terminal.
La task 04 ets la création de notre API. Nous avons choisi de la faire en Node.js en utilsant Express.js, puis des modules comme Sequelize pour la connexion et definition de nos données. 
Vous pouvez donc entrer "npm install" pour installer les modules nécéssaire au fonctionnement de l'API. 
Notre API suit cette architecture


![image](https://user-images.githubusercontent.com/113336285/196053861-b2e03015-0188-470d-9bfd-776f89a54a9c.png)






CONFIG sont les opération nécéssaire à la connexion avec mariaDB, par Sequalize
MODELS sont les fichiers definissant le modeles de nos tables utilisés 
ROUTER sont les fichiers ou sont faites les opérations CRUD, pour les utilisateurs, les advertisements....
index.js est le fichier ou nos importons nos composants, créons le router, et définisson les middlewares. 

Vous pouvez tester l'API avec un logiciel comme Postman 
![image](https://user-images.githubusercontent.com/113336285/196058590-b3857e08-caa7-4127-b0ac-414ff7a5ef53.png)

}

//task05 - 06 - -07 - 08
{
task05->Lister les advertisement avec un bouton apply, ouvrant un modal qui contiendra les données dans la table 'Application'

task06->Login, register and register-mod pages sur le projet, utilisant Auth.service pour se connecter à l'API

task07-La page MOD permet au créateur d'edit ses annonces et d'en rajouter, la page admin n'est pas fonctionnelle cependant. 

task08-> Nous avons repirs le design des pages html pour l'instaurer sur l'entiereté du project. 

}
