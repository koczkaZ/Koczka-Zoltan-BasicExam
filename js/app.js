// ide deklaráljátok a függvényeket.
/*
function ascendingOrderByCost(data) {
  var i;
  var sorted = false;
  do {
    sorted = true
    for (i = 0, j = 1; i < data.length; i++ , j++) {
      if (data[i]["cost_in_credits"] === null) { data[i]["cost_in_credits"] = 0 };
      if (data[i].hasOwnProperty(["cost_in_credits"])) {
        if (parseInt(data[i]["cost_in_credits"]) > parseInt(data[j]["cost_in_credits"])) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          sorted = false
        }
      }
    } 
  }while (!sorted); return data}
*/

function ascendingOrderByCost(input) {
      var i; var j; var end;
      end = input.length;
      while (end--) {
        for (i = 0, j = 1; i < end; i++ , j++) {
            if (getInteger(input[i]["cost_in_credits"]) > getInteger(input[j]["cost_in_credits"])) {
              temp = input[i];
              input[i] = input[j];
              input[j] = temp;
            }
        }
    } return input;
}

function getInteger(value) {
  if (value !== null && value !== "unknown") {
      return parseInt(value); 
  } else {
      return 0; 
  }
}

function nullConsumableFinder (input) {
  var data = input.slice()
  let arrayOfIndexes = []
  for (var k in data){
  if (data[k]["consumables"]===null) {arrayOfIndexes.push(k)}}
   return arrayOfIndexes
}

function precisionDeleter (arrayOfIndexes, array) {
  for (var i = arrayOfIndexes.length -1; i >= 0; i--){
   array.splice(arrayOfIndexes[i],1);}
   return array
}

function setNulltoUnknown (array) {
  for (i=0; i<array.length; i++){
  for (var k in array[i]){
  if (array[i][k]===null) {
    array[i][k]="unknown"
  }
}
}
return array
}

function objectWriter (arrayOfobjects) {
  var output = ""
   for (var i=0; i<arrayOfobjects.length; i++){
    for (var k in arrayOfobjects[i]){
      output+=`${[k]}: ${arrayOfobjects[i][k]}<br>`
    }output+="<br>"
  } return output  
}

function divFiller (string){
document.getElementById('area').innerHTML =  string
}

//Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
function getSoloShips (array){
  if (!array.length) return false;
  var count = 0;
  var message = ""
  for (var k in array){
        if (array[k]["crew"]==="1") count++
    }
    message= count+" db egyfős legénységgel rendelkező hajó van.";
    return message
  }
  
// A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
function getMaxCargoCapacityShip (array){
  if (!array.length) return false;
  maxCargoCapacityShip=array[0]
  for (var i=0; i<array.length;i++){
        if (getInteger(array[i]["cargo_capacity"]) > getInteger(maxCargoCapacityShip["cargo_capacity"])) {
          maxCargoCapacityShip=array[i];
        }
    }return maxCargoCapacityShip;
} 

// Az összes hajó utasainak (passengers) összesített száma
function getTotalPassengers(array){
  if (!array.length) return false;
  var totalPassengers=0
  for (var i in array){
    if (array[i].hasOwnProperty(["passengers"])){
        totalPassengers+=getInteger(array[i]["passengers"])
      }
        }
        message= totalPassengers+" Az összes hajó utasainak összesített száma";
        return message;
} 
// A leghosszabb(lengthiness) hajó képének a neve
function getPicOfLongestShip (array){
  if (!array.length) return false;
  longestShip=array[0]
  for (var i=0; i<array.length;i++){
    if (array[i].hasOwnProperty(["lengthiness"])){
      if (getInteger(array[i]["lengthiness"]) > getInteger(longestShip["lengthiness"])) {
        longestShip=array[i];
      }
    }
  }return longestShip["image"]
} 

function search (input, array){
  array = ascendingOrderByName(array)
    input = input.toLowerCase();
  for (var i = 0; i < array.length; i++) {
    if (array[i]["model"].toLowerCase().indexOf(input) > -1) {
      console.log(array[i]["model"]);return
    }
     }console.log("Ez a részlet nem található egyik modelnévben sem")
}

function ascendingOrderByName(input) {
  var i; var j; var end;
  end = input.length;
  while (end--) {
    for (i = 0, j = 1; i < end; i++ , j++) {
        if (input[i]["model"].localeCompare(input[j]["model"]) > 0 ){
          temp = input[i];
          input[i] = input[j];
          input[j] = temp;
        }
    }
} return input;
}

/*
/// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable() {
  var columns = addAllColumnHeaders(myList);

  for (var i = 0 ; i < myList.length ; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
          var cellValue = myList[i][columns[colIndex]];

          if (cellValue == null) { cellValue = ""; }

          row$.append($('<td/>').html(cellValue));
                }
      $("#excelDataTable").append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(myList)
{
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0 ; i < myList.length ; i++) {
      var rowHash = myList[i];
      for (var key in rowHash) {
          if ($.inArray(key, columnSet) == -1){
              columnSet.push(key);
              headerTr$.append($('<th/>').html(key));
          }
      }
  }
  $("#excelDataTable").append(headerTr$);

  return columnSet;
}
*/  

function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callbackFunc(this);
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }
    
  function successAjax(xhttp) {
    // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
    var userDatas = JSON.parse(xhttp.responseText);
    // Innen lehet hívni.
    ascendingOrderByCost(userDatas)
    //console.log(nullConsumableFinder(userDatas))
    //console.log(precisionDeleter(nullConsumableFinder(userDatas),userDatas));
    divFiller(objectWriter(setNulltoUnknown(precisionDeleter(nullConsumableFinder(userDatas),userDatas))));
    getSoloShips(setNulltoUnknown(precisionDeleter(nullConsumableFinder(userDatas),userDatas)))
    getMaxCargoCapacityShip(userDatas)
    getTotalPassengers(userDatas)
    getPicOfLongestShip(userDatas)
    search("class", userDatas)
    
  }
  getData('/json/spaceships.json', successAjax);
   