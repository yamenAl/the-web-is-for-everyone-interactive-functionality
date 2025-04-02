const anonymousCheckbox = document.getElementById('anonymousCheck');
const nameField = document.getElementById('nameField');
const fromInput = document.getElementById('fromInput');

anonymousCheckbox.addEventListener('change', () => {
  if (anonymousCheckbox.checked) {
    nameField.style.display = 'none';         
    fromInput.value = 'Anoniem';              
  } else {
    nameField.style.display = 'block';        
    fromInput.value = '';                     
  }
});