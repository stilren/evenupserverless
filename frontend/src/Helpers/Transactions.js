const Transactions = {
    update(persons){
      let receiversRemaining = persons.filter((person) => {
        return person.balance > 0
      })

      const giversStart = persons.filter((person) => {
        return person.balance < 0
      })
      let giversRemaining = giversStart.slice();
      let transactions = [];

      //First find all transactions that match evenly
      for (let i = 0; i < giversStart.length; i++) {
        const giver = giversStart[i];
        const match = receiversRemaining.find((receiver) => { //this could prob be a map
            return receiver.balance + giver.balance === 0
        })
        if(typeof match !== "undefined"){
          receiversRemaining.splice(receiversRemaining.indexOf(match), 1) //remove from receiver list
          giversRemaining.splice(giversRemaining.indexOf(giver) ,1) //remove giver from list
          transactions.push({
            from: giver.name,
            to: match.name,
            amount: match.balance
          })
        }
      }

      //Then see if you can cancel out any givets
      while(receiversRemaining.length > 0){
        const giverWithMostToGive = giversRemaining.reduce(this.findHighestBalance);
        const receiverWithMostToReceive = receiversRemaining.reduce(this.findHighestBalance);

        if(receiversRemaining.length === 1 && giversRemaining.length === 1){
          transactions.push({
           from: giversRemaining[0].name,
           to: receiversRemaining[0].name,
           amount: receiversRemaining[0].balance, 
          });
          receiversRemaining = [];
          giversRemaining = [];

        }else if(Math.abs(giverWithMostToGive.balance) > receiverWithMostToReceive.balance){
          //Givers cancels out receiver
          receiversRemaining.splice(receiversRemaining.indexOf(receiverWithMostToReceive) ,1);
          //Update giver balance
          const newBalance = giverWithMostToGive.balance + receiverWithMostToReceive.balance;
          giversRemaining = this.updateBalance(giversRemaining, giverWithMostToGive, newBalance);
          //Add new transaction
          transactions.push({
            from: giverWithMostToGive.name,
            to: receiverWithMostToReceive.name,
            amount: receiverWithMostToReceive.balance
          });
        } else {
          //Receiver cancels out giver
          giversRemaining.splice(giversRemaining.indexOf(giverWithMostToGive) ,1);
          //Update reciver balance
          const newBalance = giverWithMostToGive.balance + receiverWithMostToReceive.balance;
          this.updateBalance(receiversRemaining, receiverWithMostToReceive, newBalance)
          //Add new transaction
          transactions.push({
            from: giverWithMostToGive.name,
            to: receiverWithMostToReceive.name,
            amount: Math.abs(giverWithMostToGive.balance),
          });
        }
      } 

      return transactions;
    },

    findHighestBalance(currentMax, contender){
      return Math.abs(currentMax.balance) > Math.abs(contender.balance) ? currentMax : contender;
    },

    updateBalance(personArray, target, newBalance){
      return personArray.map((person, i) => {
            if(person.personId === target.personId){
              person.balance = newBalance
            }
            return person;
        })
    },
}


export default Transactions;