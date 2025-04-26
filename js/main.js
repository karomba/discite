/**
 * Discite Main JavaScript File
 *
 * Includes:
 * - Active Navigation Link Highlighting
 * - Copy-to-Clipboard functionality for code blocks
 * - Interactive Demo functionality (if elements exist)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Active Navigation Link Highlighting ---
    function highlightActiveNav() {
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current filename

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPath === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page'); // Accessibility
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // --- Copy-to-Clipboard for Code Blocks ---
    function setupCopyButtons() {
        const codeBlocks = document.querySelectorAll('.code-block-wrapper');

        codeBlocks.forEach(wrapper => {
            const copyButton = wrapper.querySelector('.copy-button');
            const codeElement = wrapper.querySelector('pre code');

            if (copyButton && codeElement) {
                copyButton.addEventListener('click', () => {
                    const codeToCopy = codeElement.textContent || "";
                    navigator.clipboard.writeText(codeToCopy).then(() => {
                        // Success feedback
                        copyButton.textContent = 'Copied!';
                        copyButton.classList.add('copied');
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                            copyButton.classList.remove('copied');
                        }, 2000); // Reset after 2 seconds
                    }).catch(err => {
                        console.error('Failed to copy code: ', err);
                        copyButton.textContent = 'Error';
                        // Optionally provide more user feedback here
                    });
                });
            }
        });
    }

    // --- Interactive Demo Functionality ---
    function setupDemo() {
        const inputElement = document.querySelector('#demo-input');
        const actionButton = document.querySelector('#demo-action-button');
        const outputArea = document.querySelector('#demo-output');

        // Only run if all demo elements are present on the current page
        if (!inputElement || !actionButton || !outputArea) {
            // console.log("Interactive demo elements not found on this page.");
            return;
        }

        const handleUpdate = () => {
            const inputText = inputElement.value.trim();

            if (inputText === '') {
                outputArea.textContent = 'Please enter some text first!';
                outputArea.style.color = '#b91c1c'; // Match CSS error color
            } else {
                outputArea.textContent = `You entered: "${inputText}"`;
                outputArea.style.color = '#1e3a8a'; // Match CSS default color
                inputElement.value = '';
            }
            inputElement.focus();
        };

        actionButton.addEventListener('click', handleUpdate);

        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleUpdate();
            }
        });

        console.log("Interactive demo initialized."); // Confirm initialization
    }

    // --- Initialize all features ---
    highlightActiveNav();
    setupCopyButtons();
    setupDemo(); // This will only run fully if demo elements are found

    // --- Optional: Async User Fetch Demo Trigger ---
    // You could add a button or trigger to call this if needed
    /*
    async function fetchAndDisplayUser(userId) {
        // ... (fetch logic from previous examples) ...
        const outputElement = document.querySelector('#user-output');
        if (!outputElement) return;
        // ... (rest of fetch logic) ...
    }
    // Example: fetchAndDisplayUser(1);
    */

}); // End DOMContentLoaded
/**
 * Discite Main JavaScript File
 *
 * Includes:
 * - Active Navigation Link Highlighting
 * - Copy-to-Clipboard functionality for code blocks
 * - Interactive Demo functionality (if elements exist)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Active Navigation Link Highlighting ---
    function highlightActiveNav() {
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current filename

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPath === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page'); // Accessibility
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // --- Copy-to-Clipboard for Code Blocks ---
    function setupCopyButtons() {
        const codeBlocks = document.querySelectorAll('.code-block-wrapper');

        codeBlocks.forEach(wrapper => {
            const copyButton = wrapper.querySelector('.copy-button');
            const codeElement = wrapper.querySelector('pre code');

            if (copyButton && codeElement) {
                copyButton.addEventListener('click', () => {
                    const codeToCopy = codeElement.textContent || "";
                    navigator.clipboard.writeText(codeToCopy).then(() => {
                        // Success feedback
                        copyButton.textContent = 'Copied!';
                        copyButton.classList.add('copied');
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                            copyButton.classList.remove('copied');
                        }, 2000); // Reset after 2 seconds
                    }).catch(err => {
                        console.error('Failed to copy code: ', err);
                        copyButton.textContent = 'Error';
                        // Optionally provide more user feedback here
                    });
                });
            }
        });
    }

    // --- Interactive Demo Functionality ---
    function setupDemo() {
        const inputElement = document.querySelector('#demo-input');
        const actionButton = document.querySelector('#demo-action-button');
        const outputArea = document.querySelector('#demo-output');

        // Only run if all demo elements are present on the current page
        if (!inputElement || !actionButton || !outputArea) {
            // console.log("Interactive demo elements not found on this page.");
            return;
        }

        const handleUpdate = () => {
            const inputText = inputElement.value.trim();

            if (inputText === '') {
                outputArea.textContent = 'Please enter some text first!';
                outputArea.style.color = '#b91c1c'; // Match CSS error color
            } else {
                outputArea.textContent = `You entered: "${inputText}"`;
                outputArea.style.color = '#1e3a8a'; // Match CSS default color
                inputElement.value = '';
            }
            inputElement.focus();
        };

        actionButton.addEventListener('click', handleUpdate);

        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleUpdate();
            }
        });

        console.log("Interactive demo initialized."); // Confirm initialization
    }

    // --- Initialize all features ---
    highlightActiveNav();
    setupCopyButtons();
    setupDemo(); // This will only run fully if demo elements are found

    // --- Optional: Async User Fetch Demo Trigger ---
    // You could add a button or trigger to call this if needed
    /*
    async function fetchAndDisplayUser(userId) {
        // ... (fetch logic from previous examples) ...
        const outputElement = document.querySelector('#user-output');
        if (!outputElement) return;
        // ... (rest of fetch logic) ...
    }
    // Example: fetchAndDisplayUser(1);
    */

}); // End DOMContentLoaded
