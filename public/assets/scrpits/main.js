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
//pop uo
  document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('messagePopup');
    const textarea = document.getElementById('dropTextarea');

    textarea.addEventListener('focus', () => {
      popup.classList.add('show');
    });

    // Optional: hide popup when clicking outside or blur
    // textarea.addEventListener('blur', () => {
    //   popup.classList.remove('show');
    // });
  });

