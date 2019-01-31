const getElement = (document, id) => document.getElementById(id);

const appendChildren = function(parent, ...children) {
  children.forEach(function(child) {
    parent.appendChild(child);
  });
};

const createLabel = function(document, labelText, className = "label") {
  const label = document.createElement("label");
  label.className = className;
  label.innerText = labelText;
  return label;
};

const createButton = function(
  document,
  buttonLabel,
  onclickFunc,
  className = "button"
) {
  const button = document.createElement("button");
  button.innerText = buttonLabel;
  button.className = className;
  button.onclick = onclickFunc;
  return button;
};

const createTextBox = function(
  document,
  initialValue = "",
  placeholder = "",
  className = "textBox"
) {
  textBox = document.createElement("input");
  textBox.type = "text";
  textBox.value = initialValue;
  textBox.placeholder = placeholder;
  textBox.className = className;
  return textBox;
};

const createFieldSet = function(document, legendTag) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = legendTag;
  fieldset.appendChild(legend);
  return fieldset;
};

const createTextArea = function(document, type, name, placeholder) {
  const textArea = document.createElement("textarea");
  textArea.type = type;
  textArea.name = name;
  textArea.placeholder = placeholder;
  return textArea;
};
