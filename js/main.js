/**
 * Discite Main JavaScript File
 *
 * Includes:
 * - Active Navigation Link Highlighting
 * - Copy-to-Clipboard functionality for code blocks
 * - Interactive Demo functionality (if elements exist)
 */

document.addEventListener('DOMContentLoaded', () => {

    console.log("Discite JS Initializing... 🚀");

    // --- Active Navigation Link Highlighting ---
    function highlightActiveNav() {
        try {
            const navLinks = document.querySelectorAll('.main-nav .nav-link');
            // Get the filename from the current URL (e.g., "html.html" or "index.html")
            const currentPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';

            // console.log(`Current Page: ${currentPath}`); // Debugging

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
                // Remove active class from all links first
                link.classList.remove('active');
                link.removeAttribute('aria-current');

                // Add active class if the link path matches the current path
                if (linkPath === currentPath) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page'); // Accessibility best practice
                    // console.log(`Activating link: ${linkPath}`); // Debugging
                }
            });
        } catch (error) {
            console.error("Error highlighting active navigation:", error);
        }
    }

    // --- Copy-to-Clipboard for Code Blocks ---
    function setupCopyButtons() {
        try {
            const codeBlocks = document.querySelectorAll('.code-block-wrapper');

            codeBlocks.forEach(wrapper => {
                const copyButton = wrapper.querySelector('.copy-button');
                const codeElement = wrapper.querySelector('pre code');

                if (copyButton && codeElement) {
                    copyButton.addEventListener('click', () => {
                        const codeToCopy = codeElement.textContent || "";
                        navigator.clipboard.writeText(codeToCopy).then(() => {
                            // Success feedback
                            copyButton.textContent = 'Copied! ✅';
                            copyButton.classList.add('copied');
                            // Prevent multiple clicks while showing feedback
                            copyButton.disabled = true;

                            setTimeout(() => {
                                copyButton.textContent = 'Copy';
                                copyButton.classList.remove('copied');
                                copyButton.disabled = false; // Re-enable button
                            }, 2000); // Reset after 2 seconds
                        }).catch(err => {
                            console.error('Failed to copy code: ', err);
                            copyButton.textContent = 'Error ❌';
                            // Optionally provide more user feedback here, maybe a tooltip
                            setTimeout(() => {
                                copyButton.textContent = 'Copy';
                            }, 3000); // Reset after 3 seconds on error
                        });
                    });
                } else {
                     // If button/code element missing in a wrapper, log it (might indicate HTML issue)
                     if (!copyButton) console.warn("Copy button not found in wrapper:", wrapper);
                     if (!codeElement) console.warn("Code element not found in wrapper:", wrapper);
                }
            });
        } catch (error) {
            console.error("Error setting up copy buttons:", error);
        }
    }

    // --- Interactive Demo Functionality ---
    function setupDemo() {
        try {
            const inputElement = document.querySelector('#demo-input');
            const actionButton = document.querySelector('#demo-action-button');
            const outputArea = document.querySelector('#demo-output');

            // Only run if all demo elements are present on the current page
            if (!inputElement || !actionButton || !outputArea) {
                 // This is expected on pages without the demo, so no error needed
                 // console.log("Interactive demo elements not found on this page.");
                return;
            }

            const handleUpdate = () => {
                const inputText = inputElement.value.trim();

                if (inputText === '') {
                    outputArea.textContent = 'Bruh, enter something! 🤷';
                    outputArea.style.color = '#b91c1c'; // Match CSS error color (red-700)
                } else {
                    // Use textContent for safety against HTML injection
                    outputArea.textContent = `You entered: "${inputText}" 😎`;
                    outputArea.style.color = '#1e3a8a'; // Match CSS default color (blue-800)
                    inputElement.value = ''; // Clear the input field
                }
                inputElement.focus(); // Return focus to input for better UX
            };

            actionButton.addEventListener('click', handleUpdate);

            inputElement.addEventListener('keydown', (event) => {
                // event.key is the modern standard
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent default Enter behavior (like potential form submission)
                    handleUpdate(); // Call the same handler
                }
            });

            console.log("Interactive demo initialized. ✅"); // Confirm initialization
        } catch (error) {
            console.error("Error setting up interactive demo:", error);
        }
    }

    // --- Initialize all features ---
    highlightActiveNav();
    setupCopyButtons();
    setupDemo();

    // --- Optional: Async User Fetch Demo Trigger ---
    // Example: Add a button in javascript.html with id="fetch-user-button"
    /*
    const fetchButton = document.querySelector('#fetch-user-button');
    if (fetchButton) {
        fetchButton.addEventListener('click', () => fetchAndDisplayUser(1));
    }

    async function fetchAndDisplayUser(userId) {
        const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const outputElement = document.querySelector('#user-output'); // Ensure this exists in HTML

        if (!outputElement) {
            console.error("User output element (#user-output) not found!");
            return;
        }

        outputElement.textContent = 'Fetching user data... ⏳';
        outputElement.style.color = '#6b7280'; // gray-500

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok (status: ${response.status})`);
            }
            const userData = await response.json();
            console.log('User Data:', userData);
            outputElement.textContent = `User: ${userData.name} (${userData.email}) 👍`;
            outputElement.style.color = '#1e3a8a'; // blue-800
            return userData;
        } catch (error) {
            console.error('Fetch error:', error);
            outputElement.textContent = `Failed to load user data: ${error.message} 😭`;
            outputElement.style.color = '#b91c1c'; // red-700
        }
    }
    */

}); // End DOMContentLoaded
