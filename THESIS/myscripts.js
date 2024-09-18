const connectors = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const words = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const wordsMax = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const fieldChosen = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const wordsAftakia = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const fieldValues = ["1", "Accession", "Acknowledgments", "Affiliation", "All Fields",
    "Author", "Body - All Words", "Body - Key Terms", "DOI",
    "EC/RN Number", "Figure/Table Caption", "Filter", "Full Author Name", "Grant Number",
    "Issue", "Journal", "MeSH Major Topic", "MeSH Subheadings",
    "MeSH Terms", "Methods - Key Terms", "Organism", "Organism unsynonymized",
    "Pagination", "Reference", "Reference Author",
    "Section Title", "Supplementary Concept", "Text Word", "Title","Volume"
    
];

const leftParsArray = [];
const leftParsIndex = [];

const rightParsArray = [];
const rightParsIndex = [];
const uniqueWords = [];



function addThingsOnTextArea(rowNum, colNum) {


    var valueForTextArea = "";
    var leftPar = 0;
    var rightPar = 0;
    var placing = 0;
    var highestRecall = 0;
    var count = 0;
 
    



    if (colNum == 1) {

        var connectorName = "connector" + rowNum.toString();
        connectors[rowNum - 1] = document.getElementById(connectorName).value;

    } else if (colNum == 2) {

        var textName = "text" + rowNum.toString();
        let str = document.getElementById(textName).value;

        if (document.getElementById(textName).value.length == 0) {
            words[rowNum - 1] = "";
            wordsMax[rowNum - 1] = "";
        } else {
            words[rowNum - 1] = document.getElementById(textName).value;

            if (document.getElementById(textName).value.length > 2) {

                let newStr = str.substring(0, str.length - 1) + "*";
                wordsMax[rowNum - 1] = newStr;
            } else {
                wordsMax[rowNum - 1] = document.getElementById(textName).value + "*";
            }
        }

    } else if (colNum == 3) {

        var fieldName = "field" + rowNum.toString();
        fieldChosen[rowNum - 1] = document.getElementById(fieldName).value;

    } else if (colNum == -1) {
        leftPar = 1;
    } else if (colNum == -2) {
        rightPar = 1;
    } else if (colNum == -10) {
        leftParsIndex.pop();
        leftParsArray.pop();
    } else if (colNum == -20) {
        rightParsIndex.pop();
        rightParsArray.pop(); 
    }

    var index = -1;
    var exists = false;

    if (leftPar == 1) {



        for (let j = 0; j < connectors.length; j++) {

            if (connectors[j] == "AND" || connectors[j] == "OR" || connectors[j] == "NOT" ||
                connectors[j] == "AND NOT" || connectors[j] == "OR NOT" || connectors[j] == "10023") {
                index = j;
            }



            if (j == connectors.length - 1) {
                if (index != -1) {
                    leftParsArray.push("(");
                    leftParsIndex.push(index);

                } else {

                    leftParsIndex.push(0);
                    leftParsArray.push("(");
                }

            }

        }


    } else if (rightPar == 1) {

        for (let j = 0; j < fieldChosen.length; j++) {

            exists = fieldValues.includes(fieldChosen[j]);
            if (exists == true) {
                index = j;
            }

            if (j == connectors.length - 1) {
                if (index != -1) {
                    rightParsArray.push(")");
                    rightParsIndex.push(index);
                } else {
                    alert("You can add right parenthesis ')' only after a field");
                }

            }

        }

    }





    for (let i = 0; i < 30; i++) {

        if (connectors[i] != "") {

            if (connectors[i] != "0") {

                if (connectors[i] != "10023") {
                    valueForTextArea += connectors[i] + " ";
                }



                count = leftParsIndex.filter(x => x === i).length;


                if (count > 0) {

                    for (let k = 0; k < count; k++) {
                        valueForTextArea += " ( ";
                    }
                }
            }
            count = 0;
        } else {
            if (i == 0) {
                if (leftParsIndex.filter(x => x === 0).length > 0) {
                    for (let k = 0; k < leftParsIndex.filter(x => x === 0).length > 0; k++) {
                        valueForTextArea += " ( ";
                    }

                }

            }

            count = 0;
        }

       

            if (words[i] != "") {

                valueForTextArea += words[i];

                if ( words[i].startsWith("\"") &&  words[i].endsWith("\"") ) {

                    wordsAftakia[i] = "1";

                  
                }
                else {

                    

                     wordsAftakia[i] =  "";
                }

            }
        





        if (fieldChosen[i] != "") {

            if (fieldChosen[i] != "1" && fieldChosen[i] != "0") {
                valueForTextArea += "[" + fieldChosen[i] + "] ";

            } else {
                valueForTextArea += " ";

            }

            count = rightParsIndex.filter(x => x === i).length;


            if (count > 0) {

                for (let k = 0; k < count; k++) {
                    valueForTextArea += " ) ";
                }
            }

        }

    }




    document.getElementById("exampleFormControlTextarea2").value = valueForTextArea;

    for (i = 0; i <= 30; i++){

        if (wordsAftakia[i] == "1"){

            document.getElementById("flexCheckDefault").disabled = true;
            document.getElementById("flexCheckDefault").checked = false;
         
            break;

        }
        else {

            document.getElementById("flexCheckDefault").disabled = false; 

        }
    }



   

}


function reloadPage() {
    location.reload();
}

function visibleInvisible() {



    var terms = document.getElementById("termNumber").value;
    var flag = 0;



    for (let i = 1; i <= 30; i++) {

        var row = "row" + i.toString();

        if (i <= terms) {

            if (document.getElementById(row).classList.contains('d-none')) {

                document.getElementById(row).classList.remove('d-none');
                document.getElementById(row).classList.add('d-block');
            }
        } else {

            if (document.getElementById(row).classList.contains('d-block')) {

                document.getElementById(row).classList.remove('d-block');
                document.getElementById(row).classList.add('d-none');
            }

        }

    }

}


function parenthesisCounter() {

    var totalTerms = document.getElementById("termNumber").value;

    var emptyTextFields = 0;
    var textField = "text";
    var warMes = "";
    var flagg2 = 0;
    var flagg3 = 0;
    var warMes2 = "";
    var warMes3 = "";
    var highestRecall = 0;
    var userQuery = "";

    var flagg = 0;
    var dropFields;

    for (let i = 1; i <= totalTerms; i++) {

        textField = "text" + i.toString();
        dropFields = "field" + i.toString();
        connectorsFields = "connector" + i.toString();

        if (document.getElementById(dropFields).value == 0) {
            warMes2 += dropFields + " ";
            flagg2 = 1;
        }

        if (document.getElementById(textField).value.length == 0) {
            warMes += textField + " ";
            flagg = 1;
        }

        if (i == 1){
            continue;
        }

        if (document.getElementById(connectorsFields).value == 0) {
            warMes3 += connectorsFields + " ";
            flagg3 = 1;
        }


    }

    if (flagg == 1) {
        alert("Empty Fields: " + warMes);
    } else if (flagg2 == 1) {
        alert("Not Selected Dropdown Menus: " + warMes2);
    } else if (flagg3 == 1) {
        alert("Not Selected connectors: " + warMes3);
    }


    if (flagg == 0 && flagg2 == 0 && flagg3 == 0) {

        var URL = "https://www.ncbi.nlm.nih.gov/search/all/?term=";
        var par1;
        var par2;
        var text;
        var dropField;
        var con;

        if (document.getElementById("flexCheckDefault").checked) {
            highestRecall = 1;
            console.log("is checked");
        }

        

        if (highestRecall == 1){

             userQuery = document.getElementById("exampleFormControlTextarea2").value;
             console.log("userQuery: ",userQuery);
             console.log("calling...");
              responseQuery = requestPmc(userQuery);         

        }

        else {

             URL += document.getElementById("exampleFormControlTextarea2").value;

             var accessionChecked = 0;
    var sourceDataChecked = 0;
    var rawDataChecked = 0;
    var extraQuery = "AND (";
    var countter = 0;

    if ( document.getElementById("rawDataCheckBox").checked ) {

        rawDataChecked = 1;
        countter += 1;
    }

    if ( document.getElementById("sourceDataCheckBox").checked ) {

        sourceDataChecked = 1;
        countter += 1;
    }

    if ( document.getElementById("accessionCheckBox").checked ) {

        accessionChecked = 1;
        countter += 1;
    }

    if (countter == 1){

        if ( accessionChecked == 1){

            extraQuery += "\"accession\")";

        }
        else if (rawDataChecked == 1){
            extraQuery += "\"raw data\")";
        }
        else if (sourceDataChecked == 1){
            extraQuery += "\"sequencing data\" )";
        }

        URL += extraQuery;
    }
    else if (countter == 2){

        if (sourceDataChecked == 1 && rawDataChecked == 1){
            extraQuery += "\"raw data\" OR \"sequencing data\")";
        }
        else if (sourceDataChecked == 1 && accessionChecked == 1){
            extraQuery += "\"sequencing data\" OR \"accession\")";
        }
        else if (rawDataChecked == 1 && accessionChecked == 1){
             extraQuery += "\"raw data\" OR \"accession\")";
        }


        URL += extraQuery;
    }

    else if (countter == 3){

        extraQuery += "\"raw data\" OR \"sequencing data\" OR \"accession\")";
        URL += extraQuery;

    }
             window.open(URL, "_blank");
        }

       

       

    }



}

async function requestPmc(term){

    let myRes = "";
    var flag = 0;
    var query = "";
    var counter = 0;
    
    var url = "https://www.ncbi.nlm.nih.gov/pmc/?term=";

    //console.log("Sending... ", term);
    //term = term.replace(/ /g, "%20");
    //term = term.substring(0, term.length - 3);
    console.log("term is: ", term);
    url += term;

   console.log("URL: ", url);
   const response = await fetch(url);
   myRes = await response.text();
   var response_Words = [];
   var response_Connectors = [];
   var response_Fields = [];
   var tempString = "";
   var skipCounter;

   //console.log("reponse: ",myRes);

       
        
        const arr = myRes.split('db="pmc">');
       // console.log(arr[1]);
        var stringSplitted = arr[1].split("");

        //console.log(stringSplitted);

        while (flag == 0){

            if (stringSplitted[counter] == "\""){
                
            }else if (stringSplitted[counter] == "<"){
                flag = 1;
            }else{
                query += stringSplitted[counter];
            }

            counter += 1;
        }
        console.log("The final Query is: ",query);

        var res_split = query.split("");

        //console.log("Splitted Query ", res_split);

        for (let i = 0; i < res_split.length; i++){

            if(skipCounter == 1){
                skipCounter = 0;
                continue;
            }

            if (tempString == "" && res_split[i] == " "){
                continue;
            }
 

            if (res_split[i] == "[" ){
                response_Words.push(tempString);
                tempString = res_split[i];
                continue;
            }
            else if (res_split[i] == "]"){ 
                tempString += res_split[i];

                if (res_split[i+1] == ")"){

                     tempString += res_split[i+1];
                     response_Fields.push(tempString)
                     tempString = "";
                     skipCounter = 1;
                     continue;
                     
                }
                response_Fields.push(tempString)
                tempString = "";
                continue;
            }
            else if (tempString == "AND" || tempString == "OR" || tempString == "NOT"){
                response_Connectors.push(tempString);
                tempString = res_split[i];
                continue;
            }



            tempString += res_split[i];


        }

       /* for (i = 0; i < response_Connectors.length; i++){
            console.log("connector " ,i, " " ,response_Connectors[i]);
        }

         for (i = 0; i < response_Words.length; i++){
            console.log("word " ,i, " " ,response_Words[i]);
        }

        for (i = 0; i < response_Fields.length; i++){
            console.log("Fields " ,i, " " ,response_Fields[i]);
        } */

         var toTerms = document.getElementById("termNumber").value;
        
         var lala;
         var lala2;
         var finalQuery = "";

         
         for ( i = 0; i < toTerms; i++){

              lala = "unique" +  (i+1).toString();

              if(document.getElementById(lala).checked){

                lala2 = "text" + (i+1).toString();

                

                uniqueWords.push(document.getElementById(lala2).value );

              }
         }

         let checker = 0;

        
    for (i = 0; i < uniqueWords.length; i++){
        console.log("Unique Word: ", uniqueWords[i]);
    }

    for (i = 0; i < response_Words.length; i++){

        let temp1 = '(' + response_Words[i];
       // console.log("Word now: ",response_Words[i]);


        
        for (let k = 0; k < uniqueWords.length; k++){

            if ( " " + uniqueWords[k] == response_Words[i] || " (" + uniqueWords[k] == response_Words[i] ||  uniqueWords[k] == response_Words[i]
                || "(" + uniqueWords[k] == response_Words[i]){
                checker = 1;
                
                break;


            }
        }

        if ( checker == 1   ){
            checker = 0;
            finalQuery += response_Words[i];
            //console.log("lala1234");

        }
        else {

            if (response_Words[i].includes("cancer")){
                finalQuery += response_Words[i] + "*";
               

            }
            else {

                finalQuery += response_Words[i].slice(0, -1) + "*";
            

            }
        }

        if (i < response_Fields.length){
            finalQuery += response_Fields[i];
        }

        if (i < response_Connectors.length){
            finalQuery += " " + response_Connectors[i];
        }



    }
    uniqueWords.length = 0; 
    console.log("FinalQuery: ", finalQuery);
    URL = "https://www.ncbi.nlm.nih.gov/search/all/?term=" + finalQuery;
    document.getElementById("exampleFormControlTextarea2").value = finalQuery;

    var accessionChecked = 0;
    var sourceDataChecked = 0;
    var rawDataChecked = 0;
    var extraQuery = " AND ( ";
    var countter = 0;

    if ( document.getElementById("rawDataCheckBox").checked ) {

        rawDataChecked = 1;
        countter += 1;
    }

    if ( document.getElementById("sourceDataCheckBox").checked ) {

        sourceDataChecked = 1;
        countter += 1;
    }

    if ( document.getElementById("accessionCheckBox").checked ) {

        accessionChecked = 1;
        countter += 1;
    }

    if (countter == 1){

        if ( accessionChecked == 1){

            extraQuery += "\"accession\")";

        }
        else if (rawDataChecked == 1){
            extraQuery += "\"raw data\")";
        }
        else if (sourceDataChecked == 1){
            extraQuery += "\"source data\")";
        }

        URL += extraQuery;
    }
    else if (countter == 2){

        if (sourceDataChecked == 1 && rawDataChecked == 1){
            extraQuery += "\"raw data\" OR \"sequencing data\")";
        }
        else if (sourceDataChecked == 1 && accessionChecked == 1){
            extraQuery += "\"sequencing data\" OR \"accession\")";
        }
        else if (rawDataChecked == 1 && accessionChecked == 1){
             extraQuery += "\"raw data\" OR \"accession\")";
        }


        URL += extraQuery;
    }

    else if (countter == 3){


        extraQuery += "\"raw data\" OR \"sequencing data\" OR \"accession\")";
        URL += extraQuery;

    }



    window.open(URL, "_blank");

    
  
}