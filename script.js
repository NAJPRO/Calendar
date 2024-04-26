
    recuperationCalendrier = (numJour, nombreDeJourDuMois, numMoisSearch, annee) =>{
        // Cette fonction prend en paramètre le numéro du premier jour du mois ainsi que le nombre de jour dans le mois et retourene le calendrier
        // de ce mois sous forme de matrice

        let calend = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],                
            [0, 0, 0, 0, 0, 0, 0]                
        ]
        let index = 1;
        let indexOut = new Date(annee, numMoisSearch-1, index).getDate() - new Date(annee, numMoisSearch, index).getDay()
       
       
        for (let i = 0; i < calend.length; i++) {

            if(i == 0)
            {
                for (let j = 0; j < calend[i].length; j++) {
                    if(j >= numJour){
                        calend[i][j] = new Date('2024', '03', index).getDate()
                        index++
                    }else{
                        calend[i][j] = new Date('2024', '02', indexOut).getDate()
                        indexOut++
                    }
                    
                }
            }else{
                for (let j = 0; j < calend[i].length; j++) {
                    calend[i][j] = new Date('2024', '03', index).getDate()
                    index++
                }

            }
                
        }
        console.log(calend);

        // n represente le numéro du jour (1-30...)
        // n = 1
        // for (let i = 0; i < 5; i++) {
        //     // S'il s'agit de la première semaine, je remplis uniquement les champs qui doivent l'être
        //     if(i === 0){
        //         let temp = 0
        //         if(numJour != 7){
        //             temp = numJour
        //         }
        //         for (let j = temp; j < 7; j++) {
        //             calend[0][j] = n
        //             n++           
        //         }
        //     }else if(i == 4){
        //         // Si c'est la quatrième semaine, je remplis juste les jours restant
        //         let j = 0
        //         while(n <= nombreDeJourDuMois){
        //             calend[4][j] = n
        //             n++
        //             j++
        //         }
        //     }else{
        //         for(let tmp = 0; tmp < 7; tmp++){
        //             calend[i][tmp] = n
        //             n++
        //         }
        //     }
        // }
        
        // Remplissage des autres case qui sont à zéro par les valeurs correspondantes
        
        // const date = new Date('2024', '02', 0)
        // let dernierJourMoisPrecedent = date.getDate() - date.getDay()
        // // let utile = date.getDay()
        // // dernierJourMoisPrecedent - utile
        
        // let val = 1
        // for(let i = 0; i< 7 ; i++){
        //     if(calend[4][i] === 0){
        //         calend[4][i] = val
        //         val++
        //     }
        // }
        // for(let i = 0; i< 7 ; i++){
        //     if(calend[0][i] === 0){
        //         calend[0][i] = dernierJourMoisPrecedent
        //         dernierJourMoisPrecedent++
        //     }
        // }

        return calend
        
    }

    const CreationCompletDuCalendrier = (table, days, nowDay, numJour) =>{

        for (let i = 0; i < 6; i++) {
            if(i === 0){
                for(r = 0; r < 7; r++){
                    const li = document.createElement('li')
                    if(table[0][r] > 20)
                        li.className = 'inactive'
                    const contenu = document.createTextNode(table[0][r])
                    li.appendChild(contenu)
                    if(nowDay === table[0][r]){
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
            // console.log(days);


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




    const currentDate = new Date()

    console.log(currentDate);
    console.log(currentDate.getFullYear()); // Ann.es
    console.log(currentDate.getMonth()); // Mois
    console.log(currentDate.getDate()); // Jour
    console.log(currentDate.getDay()); // numéro jour semaine

    const premierJour = new Date('2024', '03', 26)
    const premier = new Date('2024', '03')
    console.log(premierJour.getDate());
    // console.log(`Le premier jour du mois est ${premierJour}`);
    nowDay = 0
    if(currentDate.getFullYear() == premierJour.getFullYear() && currentDate.getMonth() == premierJour.getMonth() && currentDate.getDate() == premierJour.getDate() && currentDate.getDay() == premierJour.getDay()){
        nowDay = currentDate.getDate();
    }

    const days = document.querySelector('.days')

    const numJour = 1

    let table  = recuperationCalendrier(1, 30, currentDate.getMonth(), currentDate.getFullYear())

    CreationCompletDuCalendrier(table, days, nowDay, numJour)


    // console.log('Annee : ' + AnneeSearchCalendar);




