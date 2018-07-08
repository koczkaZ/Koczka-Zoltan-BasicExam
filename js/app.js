// ide deklaráljátok a függvényeket.
/* Ez valamiért nem működik...:
function ascendingOrderByCost2(data) {
  var i;
  var sorted = false;
  do {
    sorted = true;
    for (i = 0, j = 1; i < data.length; i++ , j++) {
      if (data[i].cost_in_credits === null) { data[i].cost_in_credits = 0; }
      if (data[i].hasOwnProperty(['cost_in_credits'])) {
        if (parseInt(data[i].cost_in_credits) > parseInt(data[j].cost_in_credits)) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          sorted = false;
        }
      }
    }
  } while (!sorted); return data
    ;
}
*/

// Ár szerint növekvő sorrendbe rendez
function ascendingOrderByCost(input) {
  var i; var j; var end;
  end = input.length;
  while (end--) {
    for (i = 0, j = 1; i < end; i++, j++) {
      if (getInteger(input[i].cost_in_credits) > getInteger(input[j].cost_in_credits)) {
        var temp = input[i];
        input[i] = input[j];
        input[j] = temp;
      }
    }
  } return input;
}

// Így bírkózik meg a többi függvény a null-lal és az unknown-nal
function getInteger(value) {
  if (value !== null && value !== 'unknown') {
    return parseInt(value, 10);
  }
  return 0;
}

// A null-os objektumokot indexét összeszedi egy tömbbe
function nullConsumableFinder(input) {
  let arrayOfIndexes = [];
  for (var k in input) {
    if (input[k].consumables === null) { arrayOfIndexes.push(k); }
  }
  return arrayOfIndexes;
}

// Megadott indexek (arrayOfIndexes) alapját kivagdos elemeket egy tömbből.
function precisionDeleter(arrayOfIndexes, array) {
  for (var i = arrayOfIndexes.length - 1; i >= 0; i--) {
    array.splice(arrayOfIndexes[i], 1);
  }
  return array;
}

// A nullokat unknown-ra állítja.
function setNulltoUnknown(array) {
  for (var i = 0; i < array.length; i++) {
    for (var k in array[i]) {
      if (array[i][k] === null) {
        array[i][k] = 'unknown';
      }
    }
  }
  return array;
}

// Stringbe írja egy objektumokból álló tömb adatait.
function objectWriter(arrayOfobjects) {
  var output = '';
  for (var i = 0; i < arrayOfobjects.length; i++) {
    for (var k in arrayOfobjects[i]) {
      if (arrayOfobjects[i].hasOwnProperty([k])) {
        output += `${[k]}: ${arrayOfobjects[i][k]}<br>`;
      }
    } output += '<br>';
  } return output;
}

// Stringbe írja egy objektumokból álló tömb adatát.
function soloObjectWriter(object) {
  var output = '<b>A keresés eredménye:</b> <br><br>';
  for (var k in object) {
    if (object.hasOwnProperty(k)) {
      output += `${[k]}: ${object[k]}<br>`;
    }
  } return output;
}

// Kitölti a kapott stringgel az area id-jű divet.
function divFiller(string) {
  document.getElementById('area').innerHTML += string;
}

// Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
function getSoloShips(array) {
  if (!array.length) return false;
  var count = 0;
  var message = '';
  for (var k in array) {
    if (array[k].crew === '1') count++;
  }
  message = count + ' db egyfős legénységgel rendelkező hajó van.';
  return message;
}

// A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
function getMaxCargoCapacityShip(array) {
  if (!array.length) return false;
  var maxCargoCapacityShip = array[0];
  for (var i = 0; i < array.length; i++) {
    if (getInteger(array[i].cargo_capacity) > getInteger(maxCargoCapacityShip.cargo_capacity)) {
      maxCargoCapacityShip = array[i];
    }
  } return ('A legnagyobb kapacitású model a ' + maxCargoCapacityShip.model);
}

// Az összes hajó utasainak (passengers) összesített száma
function getTotalPassengers(array) {
  if (!array.length) return false;
  var message = '';
  var totalPassengers = 0;
  for (var i in array) {
    if (array[i].hasOwnProperty(['passengers'])) {
      totalPassengers += getInteger(array[i].passengers);
    }
  }
  message = totalPassengers + ' Az összes hajó utasainak összesített száma';
  return message;
}
// A leghosszabb(lengthiness) hajó képének a neve
function getPicOfLongestShip(array) {
  if (!array.length) return false;
  var longestShip = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(['lengthiness'])) {
      if (getInteger(array[i].lengthiness) > getInteger(longestShip.lengthiness)) {
        longestShip = array[i];
      }
    }
  } return ('A leghosszabb hajó képének a neve: ' + longestShip.image);
}

// Keresés (nem case sensitive). Első találatig megy az előzetesen modelnév szerint rendezett tömbben.
function search(inputString, inputArr) {
  var array = ascendingOrderByName(inputArr);
  var input = inputString.toLowerCase();
  for (var i = 0; i < array.length; i++) {
    if (array[i].model.toLowerCase().indexOf(input) > -1) {
      return array[i];
    }
  } return alert('Ez a részlet nem található egyik modelnévben sem');
}

// Modelnévszerinti ABC-sorba rendezés.
function ascendingOrderByName(input) {
  var i; var j; var end;
  end = input.length;
  while (end--) {
    for (i = 0, j = 1; i < end; i++, j++) {
      if (input[i].model.localeCompare(input[j].model) > 0) {
        var temp = input[i];
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
    if (this.readyState === 4 && this.status === 200) {
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
  // 1. feladat:
  console.log(ascendingOrderByCost(userDatas));

  // 2. feladat:
  console.log(precisionDeleter(nullConsumableFinder(userDatas), userDatas));

  // 3. feladat:
  setNulltoUnknown(precisionDeleter(nullConsumableFinder(userDatas), userDatas));
  // 4. feladat:
  divFiller(objectWriter(setNulltoUnknown(precisionDeleter(nullConsumableFinder(userDatas), userDatas))));
  // 5. feladat:
  console.log(getSoloShips(setNulltoUnknown(precisionDeleter(nullConsumableFinder(userDatas), userDatas))));
  console.log(getMaxCargoCapacityShip(userDatas));
  console.log(getTotalPassengers(userDatas));
  console.log(getPicOfLongestShip(userDatas));
  // 6. feladat:
  divFiller(soloObjectWriter(search('star', userDatas)));
}
getData('/json/spaceships.json', successAjax);
