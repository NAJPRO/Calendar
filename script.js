
recuperationCalendrier = (numMoisSearch, annee) =>{
    // Cette fonction prend en paramètre le numéro du premier jour du mois ainsi que le nombre de jour dans le mois et retourene le calendrier
    // de ce mois sous forme de matrice

    // Calendrier sous forme Matricielle
    let calend = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],                
        [0, 0, 0, 0, 0, 0, 0]                
    ]
    let index = 1;
    // On détermine les jours du mois précédent qui vont apparaitre dans la première semaine de notre calendrier. 
    // Pour cela, on crée une variable indexOut qui aura une valeur <= 0. Grace à cela on pourra déterminer exactement les numéro des jours du mois précédent 
    let indexOut = new Date(annee, numMoisSearch-1, 1).getDate() - new Date(annee, numMoisSearch, index).getDay()

    for (let i = 0; i < calend.length; i++) {

        for (let j = 0; j < calend[i].length; j++) {
            calend[i][j] = new Date(annee, numMoisSearch, indexOut).getDate()
            indexOut++
        }
            
    }
    return calend
}

// Cette fonction va permettre d'afficher le calendrier sur le navigateur. Elle prend en paramètre le calendrier sous forme matricielle, l'objet days qui va contenir notre calendrier
// Le jour actuelle(nowDay)
const CreationCompletDuCalendrier = (table, days, nowDay, numJour) =>{

    for (let i = 0; i < 6; i++) {
        // Si nous somme à la première semaine
        if(i === 0){
            for(r = 0; r < 7; r++){
                const li = document.createElement('li')
                // Si nous somme la première semaine et que un des champs est supérieur à 20 alors on passe l'élément en <"inactive">
                if(table[i][r] > 20)
                    li.className = 'inactive'
                const contenu = document.createTextNode(table[i][r])
                li.appendChild(contenu)
                if(nowDay === table[i][r]){
                    // Si le jour actuelle passé en paramètre de notre fonction correspond à ce jour, alors on passe cet élément en <"active">
                    li.className = 'active';
                }
                days.appendChild(li)
            }
        }else if(i >= 4){
            for(r = 0; r < 7; r++){
                const li = document.createElement('li')
                if(table[i][r] >= 1 && table[i][r] < 17)
                    li.className = 'inactive'
                const contenu = document.createTextNode(table[i][r])
                li.appendChild(contenu)
                if(nowDay === table[i][r]){
                    li.className = 'active';
                }
                days.appendChild(li)
            }
        }else{
            for(r = 0; r < 7; r++){
                const li = document.createElement('li')
                const contenu = document.createTextNode(table[i][r])
                li.appendChild(contenu)
                if(nowDay === table[i][r]){
                    li.className = 'active';
                }
                days.appendChild(li)
            }
        }
    }
}

setInterval(()=>{
    const tabMois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
    const mois = document.querySelector('#nomMois')

    const numMois = tabMois.indexOf(mois.textContent)
    mois.textContent = tabMois[new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getMonth()]

    const gauche = document.querySelector(".gauche")


    gauche.addEventListener('click', ()=>{
        if(numMois > -1){
            mois.innerHTML = null
            if(numMois == 0){
                mois.textContent = tabMois[11]
            }else{
                mois.textContent = tabMois[numMois - 1]
            }
            console.log(numMois);
        }

        const getYear = document.querySelector('#dateYear').value
        const getMonth = tabMois.indexOf(mois.textContent)
        // On détruit tout les enfant de l'élément <ul>
        while (days.firstChild) {
            days.removeChild(days.firstChild)
        }
        
        const date = new Date(getYear, getMonth, 1)
        const dateEnd = new Date(getYear, getMonth, 0)
        nowDay = 0
        // Si le mois en cours correspond au mois demander par l'utilisateur alors à nowDay on affecte le numéro du jour actuel 
        if(currentDate.getFullYear() == date.getFullYear() && currentDate.getMonth() == date.getMonth()){
            nowDay = currentDate.getDate();
        }
        // On récupère le nouveau tableau contenant notre calendrier
        table  = recuperationCalendrier(date.getDay(), dateEnd.getDay(), date.getMonth(), date.getFullYear())
        // On affiche le calendrier
        CreationCompletDuCalendrier(table, days, nowDay, date.getDay())
    })



    const droite = document.querySelector(".droite")

    droite.addEventListener('click', ()=>{
        if(numMois < 12){
            mois.innerHTML = null
            if(numMois == 11){
                mois.textContent = tabMois[0]
            }else{
                mois.textContent = tabMois[numMois + 1]
            }

        }
        const getYear = document.querySelector('#dateYear').value
        const getMonth = tabMois.indexOf(mois.textContent)
        while (days.firstChild) {
            days.removeChild(days.firstChild)
        }
        
        const date = new Date(getYear, getMonth, 1)
        const dateEnd = new Date(getYear, getMonth, 0)
        nowDay = 0
        if(currentDate.getFullYear() == date.getFullYear() && currentDate.getMonth() == date.getMonth()){
            nowDay = currentDate.getDate();
        }

        table  = recuperationCalendrier(date.getDay(), dateEnd.getDay(), date.getMonth(), date.getFullYear())

        CreationCompletDuCalendrier(table, days, nowDay, date.getDay())
    })

}, 1000)


const currentDate = new Date()  // Date Actuelle
// On récupère le nombre de jour dans ce mois ainsi que le numéro du premier jour
const nombreDeJourDansLeMois = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
const numeroPremierJourDuMois = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate()

// On récupère le numéro du jour actuel
nowDay = currentDate.getDate()

const days = document.querySelector('.days')

const weeks = document.querySelector('.weeks')
const tabWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
for (let i = 0; i < tabWeeks.length; i++) {
    const li = document.createElement('li')
    const contenu = document.createTextNode(tabWeeks[i])
    li.appendChild(contenu)
    weeks.appendChild(li)
    
}

let table  = recuperationCalendrier(currentDate.getMonth(), currentDate.getFullYear())

// Affichage du calendrier
CreationCompletDuCalendrier(table, days, nowDay, numeroPremierJourDuMois)






