const readlineSync = require('readline-sync');
const fs = require('fs');

// returns the file with all the records
// if the file does not exist create the file with empty list
function readLogFile(file){
    let fileContents;
    try {
        fileContents = fs.readFileSync(file);
        fileContents = fileContents.toString();
        console.log("reading the file")
        debugger;
        return JSON.parse(fileContents);
        
    } catch (err) {
        console.log("Creating New Record file.");
        fs.writeFileSync(file,"[]",{flag:"a+"});
        debugger;
        return  [];         
    }
}

// adds a record to the records.json file
// @params: file: fileName, fileContents: list of record, record: new record
function logRecord(file,record){
    const fileContents = readLogFile(file);
    fileContents.push(record)
    console.log("adding record to the array");
    debugger;
    try{
        fs.writeFileSync(file,JSON.stringify(fileContents));
        console.log("new record stored successfully");
        debugger;
    } catch(err){
        console.log("failed to store new record");
        debugger;
    }

}

// returns a new record object 
function getRecord(){
    let fName =  readlineSync.question('What is your first name? ');
    let lNmae =  readlineSync.question('What is your last name? ');
    let gender = readlineSync.question('What is your last gender? ');
    let email =  readlineSync.question('What is your last email? ');
    return {fName:fName, lName:lNmae,gender:gender, email:email, date: new Date()}
}

function main(){
    let record = getRecord();
    debugger;
    console.log(record);
    logRecord("records.json", record);
    debugger;

}

main();













