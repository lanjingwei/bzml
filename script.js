// JavaScript for tab navigation and interactive elements

document.addEventListener('DOMContentLoaded', () => {

    // Tab Navigation Logic
    const tabLinks = document.querySelectorAll('.nav-tabs a[role="tab"]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetPane = document.querySelector(targetId);

            if (!targetPane) return;

            // Deactivate all tabs and panes
            tabLinks.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // Activate clicked tab and corresponding pane
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            targetPane.classList.add('active');
        });
    });

    // Ensure initial active tab is correctly displayed (redundant if HTML is correct, but safe)
    const initialActiveTab = document.querySelector('.nav-tabs a.active');
    if (initialActiveTab) {
        const initialTargetId = initialActiveTab.getAttribute('href');
        const initialTargetPane = document.querySelector(initialTargetId);
        if (initialTargetPane) {
            tabPanes.forEach(pane => pane.classList.remove('active')); // Ensure only one is active
            initialTargetPane.classList.add('active');
        }
    }

    // --- Optional: Add back smooth scroll IF tabs link to sections lower on the page ---
    // If the content sections are very long and you still want scrolling to the top
    // of the section when a tab is clicked, you could add this inside the click listener:
    /*
    const contentArea = document.querySelector('.center-content'); // Or a more specific parent
    if (contentArea && targetPane) {
        // Calculate scroll position relative to the main container or viewport
        const scrollTop = targetPane.offsetTop - contentArea.offsetTop + contentArea.scrollTop - 20; // Adjust offset as needed
        contentArea.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
        // Or simply:
        // targetPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    */

});

// Tooltip functionality for Luck Cycle Table
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElement = document.getElementById('luck-tooltip');
    const tableCells = document.querySelectorAll('.luck-cycle-table td[data-tooltip]');

    if (!tooltipElement) {
        console.error('Tooltip element not found!');
        return;
    }

    tableCells.forEach(cell => {
        cell.addEventListener('mouseover', (event) => {
            const tooltipText = cell.getAttribute('data-tooltip');
            if (tooltipText) {
                tooltipElement.textContent = tooltipText;
                tooltipElement.style.display = 'block';
                cell.classList.add('highlighted-cell');

                // Calculate position
                const rect = cell.getBoundingClientRect();
                let top = rect.top + window.scrollY - tooltipElement.offsetHeight - 5; // Position above the cell
                let left = rect.left + window.scrollX + (cell.offsetWidth / 2) - (tooltipElement.offsetWidth / 2); // Center horizontally

                // Adjust if tooltip goes off-screen
                if (top < window.scrollY) { // If too high, position below
                    top = rect.bottom + window.scrollY + 5;
                }
                if (left < window.scrollX) { // If too far left
                    left = rect.left + window.scrollX + 5;
                }
                const maxLeft = window.innerWidth + window.scrollX - tooltipElement.offsetWidth - 5;
                if (left > maxLeft) { // If too far right
                    left = maxLeft;
                }

                tooltipElement.style.top = `${top}px`;
                tooltipElement.style.left = `${left}px`;
                tooltipElement.style.opacity = '1'; // Fade in
            }
        });

        cell.addEventListener('mouseout', () => {
            tooltipElement.style.opacity = '0'; // Fade out
            cell.classList.remove('highlighted-cell');
             // Use setTimeout to allow fade-out transition before hiding
            setTimeout(() => {
                 if (tooltipElement.style.opacity === '0') { // Check if still hidden after delay
                    tooltipElement.style.display = 'none';
                 }
            }, 200); // Match the transition duration
        });
    });
}); 