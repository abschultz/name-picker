var randomize = () => {
  let results = {};
  let names = [...document.getElementsByClassName("name")].map((x) => x.value);
  let unpickables = [...document.getElementsByClassName("unpickable")].map((x) => x.value);
  names.unshift(...unpickables);
  let clone = [...names];

  for (let name of names) {
    let filteredNames = clone.filter((x) => !(x === name || unpickables.includes(name) && unpickables.includes(x)));
    if (filteredNames.length > 0) {
      let randomFilteredName = filteredNames[filteredNames.length * Math.random() << 0]
      results[name] = clone.splice(clone.indexOf(randomFilteredName), 1)[0];
    } else {
      let keys = Object.keys(results);
      let randKey = keys[(keys.length - 1) * Math.random() << 0];
      results[name] = results[randKey];
      results[randKey] = name;
    }
  }

  let html = '';
  for (let name in results) {
    html += `<div>${name} has ${results[name]}<div><br>`;
  }
  document.getElementById('result').innerHTML = html;
}

var showUnpickable = () => {
  let html = '';
  if (document.getElementById('show_unpickable').checked) {
    html = `
      <p>Unpickable names:</p>
      <input type="number" id="unpickable_qty">
      <button onclick="updateInputs('unpickable')">Update</button>
      <button onclick="addInput('unpickable')">+</button>
      <button onclick="removeInput('unpickable')">-</button>
      <br>
      <div id="unpickables_container">
      </div>
    `
  }
  document.getElementById('unpickables_area').innerHTML = html;
}

let elementIdReference = {
  name: {inputId: 'name_qty', containerId: 'names_container'},
  unpickable: {inputId: 'unpickable_qty', containerId: 'unpickables_container'}
}

var addInput = (cls) => {
  let container = document.getElementById(elementIdReference[cls]['containerId']);
  let input = document.createElement("input");
  input.type = "text";
  input.className = cls;
  container.appendChild(input);
  if ([...document.getElementsByClassName('unpickable')].length > [...document.getElementsByClassName('name')].length) {
    addInput('name');
  }
}

var removeInput = (cls) => {
  let container = document.getElementById(elementIdReference[cls]['containerId']);
  container.removeChild(container.lastChild);
  if ([...document.getElementsByClassName('unpickable')].length > [...document.getElementsByClassName('name')].length) {
    removeInput('unpickable');
  }
}

var updateInputs = (cls) => {
  let qty = document.getElementById(elementIdReference[cls]['inputId']).value;
  let currentLength = [...document.getElementsByClassName(cls)].length;
  let diff = qty - currentLength;

  if (diff < 0) {
    for (i=0; i < diff*-1; i++) {
      removeInput(cls);
    }
  } else if (diff > 0) {
    for (i=0; i < diff; i++) {
      addInput(cls);
    }
  }
}
