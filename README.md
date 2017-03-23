# DTYApp

## GETTING TO KNOW THE APPLICATIONS
The following are various applications/APIs that we use/will use in the web app that you should be familiar with:

* [Meteor.JS framework](https://www.meteor.com/)
	* A full-stack framework built on JavaScript
	* Includes MongoDB - database system
 	* Running the app on your localhost
   		* meteor

* [Semantic UI](http://semantic-ui.com/usage/theming.html)
	* UI elements are created using Semantic UI
	* It is built for themes, therefore you can change the themes of elements under: _DTYApp/client/lib/semantic-ui/ui/theme.config.import.less_
	* Then you will have to refresh the folders and it will import the appropriate themes

* [BrainTree](https://www.braintreepayments.com/)
	* Used for credit card transactions
	* Created by PayPal
	* Not yet implemented but will be used in: _DTYApp/client/patient/reservePage.html_

* [MailGun](https://www.mailgun.com/)
	* Used to send emails
	* Not yet implemented until we have a server to run the app on

* [Twilio](https://www.twilio.com/)
	* Used to send text messages
	* Not yet implemented yet

## GETTING TO KNOW THE SOURCE CODE


| File          | Comments                                     |
| ------------- |:--------------------------------------------:|
| .meteor       | DON'T NEED TO MODIFY                         |
| client        | Client side                                  |
| lib           | Contains shared files between client/server  |
| public/images | Contains shared images between client/server |
| server        | Server side                                  |
| .gitignore    | DON'T NEED TO MODIFY                         |
| READEME.txt   | Only add if needed                           |
| package.json  | DON'T NEED TO MODIFY                         |

## CURRENT FOLDER LAYOUT
Look at code comments for more details.

| File                             | Comments                                                                         		|
|----------------------------------|:---------------------------------------------------------------------------------------|
| client                           | Contains all client side files                                                   		|
| client/lib/semantic-ui/ui/...    | Semantic UI folders to modify theme                                              		|
| client/patient                   | All patient side elements/pages                                                  		|
| client/callPage.html             | Call page html layout                                                            		|
| client/countriesList.html        | List of countries in a dropdown menu                                             		|
| client/dashboard.html            | Dashboard html layout for patient. Has each step of the housecall/consultation.. 		|
| client/dashboard.js              | Dashboard js to change steps                                                     		|
| client/editProfileForm.html      | Patient profile html layout                                                      		|
| client/editProfileForm.js        | Patient profile js to add to database                                            		|
| client/email.js                  | Used to send emails                                                              		|
| client/followupPage.html         | First shown follow-up page. After treatment, the patient will wait for follow-up 		|
| client/followupPage2.html        | Second shown follow-up page. Once it is time for follow-up, smiley faces will show for patient to select their status and see if they need more follow-up 			|
| client/footer.html               | Footer html layout. Dynamically changes the year                                 		|
| client/header.html               | Header html layout for patient. Includes Home, Profile, Languages, and LogOut button 	|
| client/header.js                 | Header js for LogOut button                                                     		|
| client/main.html                 | Basic layout templates and Login page template                                   		|
| client/main.js                   | Login validation for patient                                                     		|
| client/requestPage.css           | Request page css, mainly for toggle button                                       		|
| client/requestPage.html          | Request page html layout                                                         		|
| client/requestPage.js            | Request page js                                                                  		|
| client/reservePage.css           | Reserve page css, mainly for toggle button                                       		|
| client/reservePage.html          | Reserve page html layout                                                         		|	
| client/reviewPage.html           | First shown review page. Asks for ratings before can conclude care               		|
| client/reviewPage2.html          | Second shown review page. Can download medical report and invoice and will ask to review on Yelp and Facebook if it was a very good rating 						|
| client/statesList.html           | List of states in a dropdown menu                                                		|
| client/treatmentPage.html        | Treatment page html layout                                                       		|
| provider                         | All provider side elements/pages                                                 		|
| provider/dashboard_provider.html | Provider dashboard html layout. Shows patient cards dynamically from database	  		|
| provider/header_provider.html    | Provider header html layout. Includes Home, Profile, Schedule, and LogOut       		|
| provider/profile_provider.html   | Provider profile html layout. Provider can see their ratings and comments        		|
| lib                              | Shared between client and server                                                 		|
| lib/methods.js                   | Various JS methods, such as validating form input for profiles                   		|
| lib/routes.js                    | Routing URLs are created here                                                    		|
| public/images                    | Shared images are put here                                                       		|
| server                           | Server side files                                                                		|
| server/main.js                   | Default file for startup. Created by Meteor                                      		|
| server/server_methods.js         | Server methods, such as email regex validation                                   		|


## Modifying Themes
To select a certain theme for elements, check which themes are available for which elements but clicking the dropdown menu on the top of each Semantic UI element page. To understand the lib/semantic-ui/... files: [Click Here](https://github.com/Semantic-Org/Semantic-UI-Meteor) 

Generally to set a theme for an element:

1. Check what themes there are available for what element you want to change.
2. Inside _custom.semantic.json_ set that theme to "true" and save. Themes should automatically add themselves to the project
3. Inside _theme.config.import.less_ set the element to the theme name you want.

You can also change the entire site theme by setting @site to that theme
