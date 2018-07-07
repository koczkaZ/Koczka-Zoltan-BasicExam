// ide deklaráljátok a függvényeket.

function ascendingOrderByCost(data) {
  var i;
  var sorted = false;
  do {
    sorted = true
    for (i = 0; i < data.length; i++) {
     // if (data[i].hasOwnProperty(cost_in_credits)&&data[i+1].hasOwnProperty(cost_in_credits)) {
        if (parseInt(data[i].id) < parseInt(data[i + 1].id)){
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
          sorted = false
        }
      
    } 
  }while (!sorted); return data
}

function sortmax(data) {
  
  var i; var j; var end;
  var count;
  end = data.length;
  while (end--) {
    for (i = 0, j = 1; i < end; i++, j++) {
      if (parseInt(data[i].id) < parseInt(data[j].id)) {
        temp = data[i];
        data[i] = data[j];
        data[j] = temp;
        count++
      }
    } 
  } return count;
}
;

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
  console.log(userDatas);
  console.log(ascendingOrderByCost(userDatas))
  console.log(Object.keys(userDatas))
  
 

 
}
  getData('/json/spaceships.json', successAjax);
