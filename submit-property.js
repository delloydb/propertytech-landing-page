document.addEventListener('DOMContentLoaded', function() {
  // Form Navigation
  const formSteps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.step');
  const progressFill = document.querySelector('.progress-fill');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const form = document.getElementById('propertyForm');
  
  let currentStep = 1;
  const totalSteps = formSteps.length;
  
  // Initialize form
  updateFormProgress();
  
  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nextStep = parseInt(this.dataset.next);
      if (validateStep(currentStep)) {
        navigateToStep(nextStep);
      }
    });
  });
  
  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      const prevStep = parseInt(this.dataset.prev);
      navigateToStep(prevStep);
    });
  });
  
  // Step navigation function
  function navigateToStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show new step
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    
    // Update current step
    currentStep = step;
    
    // Update progress bar and steps
    updateFormProgress();
    
    // Scroll to top of form
    document.querySelector('.property-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Update progress bar and steps
  function updateFormProgress() {
    // Update progress bar
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update step indicators
    progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      if (stepNumber < currentStep) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (stepNumber === currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }
  
  // Form validation for current step
  function validateStep(step) {
    let isValid = true;
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    
    // Get all required fields in current step
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        
        // Add error message if not already present
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
          const errorMessage = document.createElement('span');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'This field is required';
          errorMessage.style.color = 'var(--danger-color)';
          errorMessage.style.fontSize = '0.8rem';
          errorMessage.style.marginTop = '0.25rem';
          errorMessage.style.display = 'block';
          field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
      } else {
        field.classList.remove('error');
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
          field.nextElementSibling.remove();
        }
        
        // Additional validation for specific fields
        if (field.type === 'email' && !validateEmail(field.value)) {
          isValid = false;
          field.classList.add('error');
          const errorMessage = document.createElement('span');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'Please enter a valid email address';
          errorMessage.style.color = 'var(--danger-color)';
          errorMessage.style.fontSize = '0.8rem';
          errorMessage.style.marginTop = '0.25rem';
          errorMessage.style.display = 'block';
          field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        
        if (field.id === 'zip' && !validateZip(field.value)) {
          isValid = false;
          field.classList.add('error');
          const errorMessage = document.createElement('span');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'Please enter a valid ZIP code';
          errorMessage.style.color = 'var(--danger-color)';
          errorMessage.style.fontSize = '0.8rem';
          errorMessage.style.marginTop = '0.25rem';
          errorMessage.style.display = 'block';
          field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
      }
    });
    
    // Special validation for media step
    if (step === 4) {
      const fileInputs = document.querySelectorAll('.dz-preview');
      if (fileInputs.length < 5) {
        isValid = false;
        alert('Please upload at least 5 photos of your property.');
      }
    }
    
    return isValid;
  }
  
  // Email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // ZIP code validation
  function validateZip(zip) {
    const re = /^\d{5}(?:[-\s]\d{4})?$/;
    return re.test(zip);
  }
  
  // Initialize Dropzone for file uploads
  if (document.getElementById('propertyMediaDropzone')) {
    Dropzone.autoDiscover = false;
    
    const myDropzone = new Dropzone('#propertyMediaDropzone', {
      url: '/upload', // This would be your server upload endpoint
      paramName: 'file',
      maxFilesize: 10, // MB
      acceptedFiles: 'image/*,.pdf',
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: 20,
      maxFiles: 20,
      dictDefaultMessage: 'Drop files here or click to upload',
      dictFallbackMessage: 'Your browser does not support drag and drop file uploads.',
      dictFileTooBig: 'File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB.',
      dictInvalidFileType: 'You can\'t upload files of this type.',
      dictResponseError: 'Server responded with {{statusCode}} code.',
      dictCancelUpload: 'Cancel upload',
      dictUploadCanceled: 'Upload canceled.',
      dictRemoveFile: 'Remove file',
      dictMaxFilesExceeded: 'You can only upload up to 20 files.',
      init: function() {
        this.on('addedfile', function(file) {
          updateFilePreview();
        });
        
        this.on('removedfile', function(file) {
          updateFilePreview();
        });
        
        // Browse files button
        document.getElementById('browseFiles').addEventListener('click', function() {
          myDropzone.hiddenFileInput.click();
        });
      }
    });
    
    function updateFilePreview() {
      const previewGrid = document.getElementById('previewGrid');
      previewGrid.innerHTML = '';
      
      const files = myDropzone.files;
      
      if (files.length === 0) {
        previewGrid.innerHTML = `
          <div class="no-files">
            <i class="far fa-images"></i>
            <p>No files uploaded yet</p>
          </div>
        `;
        return;
      }
      
      files.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e) {
            previewItem.innerHTML = `
              <img src="${e.target.result}" alt="Preview">
              <button class="remove-btn" data-file-index="${index}">
                <i class="fas fa-times"></i>
              </button>
            `;
            
            // Add remove button event
            previewItem.querySelector('.remove-btn').addEventListener('click', function() {
              myDropzone.removeFile(file);
            });
          };
          reader.readAsDataURL(file);
        } else {
          previewItem.innerHTML = `
            <div style="background:#eee;height:120px;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-file-alt" style="font-size:2rem;color:#777;"></i>
            </div>
            <button class="remove-btn" data-file-index="${index}">
              <i class="fas fa-times"></i>
            </button>
          `;
          
          // Add remove button event
          previewItem.querySelector('.remove-btn').addEventListener('click', function() {
            myDropzone.removeFile(file);
          });
        }
        
        previewGrid.appendChild(previewItem);
      });
    }
  }
  
  // Save draft functionality
  const saveDraftBtn = document.querySelector('.btn-save-draft');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', function(e) {
      e.preventDefault();
      saveFormData(true);
      alert('Draft saved successfully! You can return later to complete your submission.');
    });
  }
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      saveFormData(false);
      showSubmissionSuccess();
    }
  });
  
  // Save form data (simulated - in a real app, this would send to server)
  function saveFormData(isDraft) {
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Add files if in media step
    if (currentStep >= 4 && window.myDropzone) {
      data.files = window.myDropzone.files;
    }
    
    data.isDraft = isDraft;
    data.currentStep = currentStep;
    
    console.log('Form data to be saved:', data);
    // In a real application, you would send this data to your server
    // For now, we'll store it in localStorage
    localStorage.setItem('propertyDraft', JSON.stringify(data));
  }
  
  // Show submission success message
  function showSubmissionSuccess() {
    const mainContent = document.querySelector('.submit-property-main .container');
    mainContent.innerHTML = `
      <div class="submission-success">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h1>Thank You for Your Submission!</h1>
        <p>Your property listing has been successfully submitted. Our team will review your submission and contact you within 24 hours.</p>
        <div class="success-actions">
          <a href="/" class="btn btn-primary">Return to Homepage</a>
          <a href="/my-listings" class="btn btn-secondary">View My Listings</a>
        </div>
      </div>
    `;
  }
  
  // Load draft if exists
  function loadDraft() {
    const draft = localStorage.getItem('propertyDraft');
    if (draft) {
      const data = JSON.parse(draft);
      
      // Ask user if they want to continue their draft
      if (confirm('You have a saved draft. Would you like to continue where you left off?')) {
        // Populate form fields
        for (const key in data) {
          if (key !== 'files' && key !== 'isDraft' && key !== 'currentStep') {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
              if (field.type === 'checkbox' || field.type === 'radio') {
                field.checked = data[key] === field.value;
              } else {
                field.value = data[key];
              }
            }
          }
        }
        
        // Navigate to saved step
        navigateToStep(data.currentStep || 1);
      }
    }
  }
  
  // Load draft on page load
  loadDraft();
});