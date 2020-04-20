
admin email: coronavirus.aus.tracker@gmail.com
admin password: SENG-3011

# Format
- Someone.... - task that someone needs to do
- Note: - important note
- Task (Person) - do this so we know who is doing what task
- **Task (DONE)** - do this so we know said task is done

# Map that shows diseases over time
- coronavirus + days
- Someone needs to fix the positioning of the maps (when you click a country + maps generated when you select a disease)

# Map that you can simulate the spread of coronavirus


# Coronavirus Avoider
- Someone needs to have this page show only a map of Australia (which you can zoom into on a street level) by default. If you can't get it to show only Australia, that is ok.
- Someone needs to make sure Australia shows all suburbs which have cases and the amount of cases (done by bigger circles for more cases?)
- Someone needs to make it so someone can input a starting & final destination
- Someone then needs to implement an algorithm which will find the path between 2 locations which will ensure the user is least exposed to the virus
- Note: This path algorithm will be mainly for walking & public transport or specifically for that
- Note: This map then also shows the hot spots that an infected user may have inputted

# Infected Users System
- **Somone needs to create a login/sign up page (DONE)**
- Someone needs to make it so on sign up a user must input their data (name/home address/age/gender/email address/phone number) this will be saved to the firestore db
- Someone needs to then have it when someone logs in they see a map of Australia, people they have come into contact with, new symptoms (all this data will be stored on firestore db)
- People who you have come into contact with section - takes in an email address/name/phone number
- Someone needs to make it so coronavirus.aus.tracker@gmail.com emails a new user when they sign up
- Someone needs to make it so when someone adds a marker to the map that location will be saved as a hot spot to the firestore db
- Note : all of the above should be done on 1 page

So areas the user has recently been to or goes to will be known as hot spots (will stay active as an infected area for 3 days)
