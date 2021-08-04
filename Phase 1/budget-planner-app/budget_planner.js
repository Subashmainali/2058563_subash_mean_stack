function addBudget(){
    console.log("adding budget");
    // let budgetInfo = document.getElementById("budgetAdded");
    // budgetInfo.setAttribute('visibility', 'visible');
    console.log(sessionStorage.getItem("projectList"));
    storeData();
    alert("Budget was Added");

}


function storeData() {

    //alert("alert");

    const cName = document.getElementById('clientName').value;
    const pName = document.getElementById('projectName').value;
    const budget      = document.getElementById('budget').value;


    let projectList = sessionStorage.getItem("projectList");

    // first time adding budget
    if(projectList === null){
        projectList = [];
    }else{
        projectList = JSON.parse(projectList);
    }
        
   

    let project = {clientName : cName,projectName : pName , budget : budget}
    projectList.push(project);

    let sProjectList = JSON.stringify(projectList);
    //console.log(sProjectList);

    sessionStorage.setItem("projectList", sProjectList);
    

}

function removeData() {
    let canDelete = confirm("Are you sure you want to delete the data?");
    if(canDelete){
        sessionStorage.removeItem("projectList");
        localStorage.removeItem("projectList");
    }

}

function displayData() {

    let tableHeader = "<table class='table table-striped'>  \
                            <thead class='table-bisque'>    \
                                <tr>                        \
                                    <th>Client Name</th>    \
                                    <th>Project Name</th>   \
                                    <th>Budget</th>         \
                                </tr>                       \
                            </thead>                        "


    let tableBody = "";
    let endTable="</table>"

    let sProjectList = sessionStorage.getItem("projectList");
    let projectList  = JSON.parse(sProjectList);
    // check if project list is empty , return if empty
    if(projectList == null){
        document.getElementById('tableDiv').innerHTML = "<div style='color:black'>No data to display";
        return;
    }

    let budgetSum = 0;
    projectList.forEach(element => {
        console.log(element)
        tableBody += `<tr><td>${element.clientName}</td> <td> ${element.projectName} </td><td>  $${element.budget} </td></tr>`
        budgetSum += eval(element.budget);

    });

    let table = tableHeader + tableBody + endTable;
    document.getElementById('tableDiv').innerHTML = table;
    document.getElementById('tableDiv').innerHTML += "<div style='color:black'> Sum: " + budgetSum + " </div>";

    console.log(sProjectList);
}