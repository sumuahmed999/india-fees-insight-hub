
// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
  }
  
  // Check window width and adjust sidebar accordingly
  function adjustSidebar() {
    if (window.innerWidth < 992) {
      sidebar.classList.remove('show');
    }
  }
  
  // Initial call and event listener for window resize
  adjustSidebar();
  window.addEventListener('resize', adjustSidebar);

  // Setup Revenue Chart if on dashboard page
  const revenueChartCanvas = document.getElementById('revenueChart');
  if (revenueChartCanvas) {
    setupRevenueChart();
  }

  // Add Student Form Handling
  const addStudentForm = document.getElementById('addStudentForm');
  const saveStudentBtn = document.getElementById('saveStudentBtn');
  if (saveStudentBtn) {
    saveStudentBtn.addEventListener('click', function() {
      // Basic form validation
      if (addStudentForm.checkValidity()) {
        // In a real app, this would send data to server
        showToast('Student added successfully!', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
        modal.hide();
        
        // Reset form
        addStudentForm.reset();
      } else {
        // Trigger form validation
        addStudentForm.reportValidity();
      }
    });
  }

  // Edit Student Form Handling
  const updateStudentBtn = document.getElementById('updateStudentBtn');
  if (updateStudentBtn) {
    updateStudentBtn.addEventListener('click', function() {
      // In a real app, this would update data on server
      showToast('Student updated successfully!', 'success');
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'));
      modal.hide();
    });
  }

  // Delete Student Handling (on students page)
  const deleteButtons = document.querySelectorAll('.fa-trash');
  deleteButtons.forEach(button => {
    button.closest('button').addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this student?')) {
        // In a real app, this would delete from server
        showToast('Student deleted successfully!', 'success');
      }
    });
  });
});

// Function to create and display toast notifications
function showToast(message, type = 'success') {
  // Create container if not exists
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  
  // Toast content
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  // Add to container
  toastContainer.appendChild(toastEl);
  
  // Initialize and show toast
  const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
  toast.show();
  
  // Remove from DOM when hidden
  toastEl.addEventListener('hidden.bs.toast', function() {
    toastEl.remove();
  });
}

// Setup Revenue Chart
function setupRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  
  // Sample data for the chart
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [250000, 300000, 200000, 350000, 400000, 300000, 250000, 450000, 500000, 550000, 450000, 600000],
      backgroundColor: '#2C74B3',
      borderRadius: 4,
      barThickness: 20,
    }]
  };
  
  // Chart configuration
  const chart = new Chart(ctx, {
    type: 'bar',
    data: monthlyData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return '₹' + context.raw.toLocaleString('en-IN');
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₹' + (value/1000) + 'K';
            }
          }
        }
      }
    }
  });
}
