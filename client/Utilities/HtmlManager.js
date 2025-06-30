class HtmlManager{
    createBuildingForm(saveBuilding) {
        // Create the form container
        const formContainer = document.createElement('div');
        formContainer.id = 'form-container';
        formContainer.style.position = 'absolute';
        formContainer.style.top = '10px';
        formContainer.style.right = '10px';  // Align the form to the right side of the screen
        formContainer.style.display = 'flex';
        formContainer.style.flexDirection = 'column';  // Stack form fields vertically
        formContainer.style.alignItems = 'flex-start'; // Align fields to the left side
        formContainer.style.padding = '15px';
        formContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        formContainer.style.borderRadius = '8px';
        
    
        // Create the form element
        const form = document.createElement('form');
        form.id = 'buildingForm';

        //x field
        const xButton = document.createElement('button');
        xButton.textContent = 'X';
        xButton.type = 'button'; // Correct button type
        xButton.style.position = 'absolute';
        xButton.style.top = '5px';
        xButton.style.right = '10px';
        xButton.style.background = 'transparent';
        xButton.style.border = 'none';
        xButton.style.fontSize = '16px';
        xButton.style.cursor = 'pointer';
        xButton.style.color = '#ff0000';

        // Latitude field
        const latitudeLabel = document.createElement('label');
        latitudeLabel.setAttribute('for', 'latitude');
        latitudeLabel.textContent = 'Latitude:';
        const latitudeInput = document.createElement('input');
        latitudeInput.id = 'latitude';
        latitudeInput.type = 'number';
        latitudeInput.required = true;
        latitudeInput.style.display = 'block';  // Ensure input takes full width
    
        // Longitude field
        const longitudeLabel = document.createElement('label');
        longitudeLabel.setAttribute('for', 'longitude');
        longitudeLabel.textContent = 'Longitude:';
        const longitudeInput = document.createElement('input');
        longitudeInput.id = 'longitude';
        longitudeInput.type = 'number';
        longitudeInput.required = true;
        longitudeInput.style.display = 'block';  // Ensure input takes full width
    
        // Function field
        const functieLabel = document.createElement('label');
        functieLabel.setAttribute('for', 'functie');
        functieLabel.textContent = 'Function:';
        const functieInput = document.createElement('input');
        functieInput.id = 'functie';
        functieInput.type = 'text';
        functieInput.required = true;
        functieInput.style.display = 'block';  // Ensure input takes full width
    
        // Capacity field
        const capaciteitLabel = document.createElement('label');
        capaciteitLabel.setAttribute('for', 'capaciteit');
        capaciteitLabel.textContent = 'Capacity:';
        const capaciteitInput = document.createElement('input');
        capaciteitInput.id = 'capaciteit';
        capaciteitInput.type = 'number';
        capaciteitInput.required = true;
        capaciteitInput.style.display = 'block';  // Ensure input takes full width
    
        // Open checkbox
        const openLabel = document.createElement('label');
        openLabel.setAttribute('for', 'isOpen');
        openLabel.textContent = 'Is Open:';
        const openCheckbox = document.createElement('input');
        openCheckbox.id = 'isOpen';
        openCheckbox.type = 'checkbox';
        openCheckbox.style.display = 'block';  // Ensure checkbox takes full width
    
        // Submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Add Building';
        submitButton.type = 'submit';
        submitButton.style.marginTop = '10px';  // Add some space at the top
        submitButton.style.padding = '5px 10px';
        submitButton.style.cursor = 'pointer';
    
        // Append fields to the form
        form.appendChild(xButton);
        form.appendChild(latitudeLabel);
        form.appendChild(latitudeInput);
        form.appendChild(longitudeLabel);
        form.appendChild(longitudeInput);
        form.appendChild(functieLabel);
        form.appendChild(functieInput);
        form.appendChild(capaciteitLabel);
        form.appendChild(capaciteitInput);
        form.appendChild(openLabel);
        form.appendChild(openCheckbox);
        form.appendChild(submitButton);
    
        // Attach the form to the container
        formContainer.appendChild(form);
    
        // Attach the form container to the body of the document
        document.body.appendChild(formContainer);
    
        // Attach event listener for form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            saveBuilding(); // Call the saveEvent function
        });
        xButton.onclick = function () {
            formContainer.remove();
        };
    }

     createEventForm(saveEvent) {
        // Create the form container
        const formContainer = document.createElement('div');
        formContainer.id = 'form-container';
        formContainer.style.position = 'absolute';
        formContainer.style.top = '10px';
        formContainer.style.right = '10px';  // Align the form to the right side of the screen
        formContainer.style.display = 'flex';
        formContainer.style.flexDirection = 'column';  // Stack form fields vertically
        formContainer.style.alignItems = 'flex-start'; // Align fields to the left side
        formContainer.style.padding = '15px';
        formContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        formContainer.style.borderRadius = '8px';
    
        // Create the form element
        const form = document.createElement('form');
        form.id = 'eventForm';
    
        // Close button
        const xButton = document.createElement('button');
        xButton.textContent = 'X';
        xButton.type = 'button'; // Correct button type
        xButton.style.position = 'absolute';
        xButton.style.top = '5px';
        xButton.style.right = '10px';
        xButton.style.background = 'transparent';
        xButton.style.border = 'none';
        xButton.style.fontSize = '16px';
        xButton.style.cursor = 'pointer';
        xButton.style.color = '#ff0000';
    
        // Name field
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Name:';
        const nameInput = document.createElement('input');
        nameInput.id = 'name';
        nameInput.type = 'text';
        nameInput.required = true;
        nameInput.style.display = 'block';  // Ensure input takes full width
    
        // Description field
        const descriptionLabel = document.createElement('label');
        descriptionLabel.setAttribute('for', 'description');
        descriptionLabel.textContent = 'Description:';
        const descriptionInput = document.createElement('input');
        descriptionInput.id = 'description';
        descriptionInput.type = 'text';
        descriptionInput.required = true;
        descriptionInput.style.display = 'block';  // Ensure input takes full width
    
        // Begin Date field
        const beginDateLabel = document.createElement('label');
        beginDateLabel.setAttribute('for', 'beginDate');
        beginDateLabel.textContent = 'Begin Date:';
        const beginDateInput = document.createElement('input');
        beginDateInput.id = 'beginDate';
        beginDateInput.type = 'date';
        beginDateInput.required = true;
        beginDateInput.style.display = 'block';  // Ensure input takes full width
    
        // End Date field
        const endDateLabel = document.createElement('label');
        endDateLabel.setAttribute('for', 'endDate');
        endDateLabel.textContent = 'End Date:';
        const endDateInput = document.createElement('input');
        endDateInput.id = 'endDate';
        endDateInput.type = 'date';
        endDateInput.required = true;
        endDateInput.style.display = 'block';  // Ensure input takes full width
    
        // Submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Add Event';
        submitButton.type = 'submit';
        submitButton.style.marginTop = '10px';  // Add some space at the top
        submitButton.style.padding = '5px 10px';
        submitButton.style.cursor = 'pointer';
    
        // Append fields to the form
        form.appendChild(xButton);
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(beginDateLabel);
        form.appendChild(beginDateInput);
        form.appendChild(endDateLabel);
        form.appendChild(endDateInput);
        form.appendChild(submitButton);
    
        // Attach the form to the container
        formContainer.appendChild(form);
    
        // Attach the form container to the body of the document
        document.body.appendChild(formContainer);
    
        // Attach event listener for form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            saveEvent(); // Call the saveEvent function
        });
    
        xButton.onclick = function () {
            formContainer.remove();
        };
    }
    

    // Create buttons dynamically when a box is clicked
     createButtons(buttonConfigs) {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = "button-container";
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.top = '10px';
        buttonContainer.style.left = '10px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        
    
        buttonConfigs.forEach(({ label, action }) => {
            const button = document.createElement('button');
            button.textContent = label;
            button.style.marginBottom = '5px';
            button.style.padding = '5px';
            button.style.cursor = 'pointer';
            button.addEventListener('click', action);
            buttonContainer.appendChild(button);
        });
    
        document.body.appendChild(buttonContainer);
    }
    
    
}
export default HtmlManager;