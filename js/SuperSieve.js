function refreshPage() { // ok
  document.location.reload(true);
};

function clearDocumentName() { // ok
  let element = document.getElementById('document-name');
  element.value = '';
  element.style.backgroundColor = "#e5e5e5";
};

function resetConfirmButton() { // ok
  let textArea = document.querySelector("textarea");
  textArea.style.backgroundColor = "#e5e5e5";
};

/* 
placeholder="Ex.:
189012
196023
200510"
*/

function confirmAreaColor() { // ok
  let textArea = document.querySelector("textarea");
  if (textArea.value != "") {
    textArea.style.backgroundColor = "rgb(210, 255, 210)";
  }
  else { 
    console.log('txtarea is empty');
    textArea.style.backgroundColor = "rgb(255, 255, 200)";
  };
};

function confirmTextBoxColor() { // ok
  let textBox = document.querySelector("#document-name");
  let extension = document.querySelector("#extension");
  if (textBox.value != "") {
    textBox.style.backgroundColor = "rgb(210, 255, 210)";
    extension.style.backgroundColor = "rgb(210, 255, 210)";
  }
  else { 
    console.log('txtBox is empty');
    textBox.style.backgroundColor = "rgb(255, 255, 200)";
    extension.style.backgroundColor = "rgb(255, 255, 200)";

  };
};
// getting a string separated by commas and whitespace and turning this string into an array
function getControlValues() { // ok
  let controlValues = document.querySelector("textarea").value;
  controlValues = controlValues.split(/\r?\n/);
  return controlValues;
};
  
function getDocumentName() { // ok
  let documentName = document.getElementById("document-name").value;
  return documentName;
};
  
// function showOutputFilename() {
//   let confirmButton = document.getElementById("section-two");
//   confirmButton.style.visibility = "visible";
// };
  
// function showUploadButton() {
//   let confirmButton = document.getElementById("upload-file");
//   confirmButton.style.visibility = "visible";
// };

/* ************************************************ */
/* *********** file updating functions ************ */
/* ************************************************ */

function findNumber(line) {
    let numCheck = "";
    let index = 0;
    for (var i = 0; i < line.length; i++) {
      if (line[i] == '"') {
          index += 1;
      };
      if ((index == 3) && (line[i+1] != '"')){
          numCheck += line[i+1];
      };
    };
    return numCheck;
};
  
function newFileContents(inputArray, controlArray) {
  var flag = true;
  let outputString = "";
  for (var element in inputArray) {
    var arrayElement = findNumber(inputArray[element]);
    for (var controlNumber in controlArray) {
      if (controlArray[controlNumber] == arrayElement) {
        flag = false;
      };
    };
    if (flag) {
      // console.log("good element: ", inputArray[element]);
      outputString += inputArray[element] + "\n"};
    flag = true;
  };
  outputString = outputString.substring(0, outputString.length - 1);
  // console.log("newFileContents: ", outputString);
  return outputString;
};
  
/* ********************************************************** */
/* *********** saving file using update functions *********** */
/* ********************************************************** */

var file;

/* ********************************************************** */
/* The solution of a filePick function below */
/* was presented by Abhishek Choudhary */
/* https://stackoverflow.com/a/65440892 */
/* ********************************************************** */
async function filePick() {
  var filepicker = document.createElement("input");
  filepicker.setAttribute("type","file");
  filepicker.click();
  return new Promise((resolve,reject) => {
    filepicker.addEventListener("change", e => {
      var reader = new FileReader();
      reader.addEventListener('load', file => resolve(file.target.result));
      reader.addEventListener('error', reject);
      reader.readAsText(e.target.files[0]);
    });
  });
};

document.getElementById("save-btn").onclick = async()=>{ 
  if (getControlValues() == '') {
    alert("Warning!\nNo numbers input for comparison.");
  };
  if (getDocumentName() == '') {
    alert("Warning!\nNo filename provided.");
  };
  let file = await filePick();
  let oldFileArray = file.split("\n");
  let controlArray = getControlValues();
  let documentName = getDocumentName() + ".txt";
  let outputArray = [newFileContents(oldFileArray, controlArray)];
  let newArray = outputArray[0].split("\n");
  let blob = new Blob(outputArray, {type: "text/plain;charset=utf-8"});
  saveAs(blob, documentName);
  document.getElementById("document-name").value = '';
  // console.log("old array:", oldFileArray.length);
  // console.log("new array:", newArray.length);
  /* below line to be elaborated on in the new version
  alert(oldFileArray.length - newArray.length + " lines removed."); */
};
