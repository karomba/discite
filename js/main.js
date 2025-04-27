/**
 * Discite Main JavaScript File
 *
 * Includes:
 * - Active Navigation Link Highlighting
 * - Copy-to-Clipboard functionality for code blocks
 * - Interactive Demo functionality (if elements exist)
 * - Simple Quiz Functionality
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

    // --- Simple Quiz Functionality ---
    function setupQuizzes() {
        try {
            const quizContainers = document.querySelectorAll('.quiz-container');
            if (quizContainers.length === 0) return; // No quizzes on this page

            // Define correct answers (could be fetched or stored differently)
            const correctAnswers = {
                'html-quiz': { q1: 'a', q2: 'c', q3: 'a' },
                'css-quiz': { q1: 'c', q2: 'a', q3: 'b' },
                'js-quiz': { q1: 'c', q2: 'b', q3: 'c' }
            };

            quizContainers.forEach(container => {
                const form = container.querySelector('.quiz-form');
                const resultsDiv = container.querySelector('.quiz-results');
                const quizId = container.id;
                const answers = correctAnswers[quizId];

                if (!form || !resultsDiv || !answers) {
                    console.warn(`Quiz setup incomplete for container ID: ${quizId}`);
                    return; // Skip this quiz if elements are missing
                }

                form.addEventListener('submit', (event) => {
                    event.preventDefault(); // Prevent default form submission
                    let score = 0;
                    let totalQuestions = 0;
                    resultsDiv.innerHTML = ''; // Clear previous results
                    // Reset legend borders
                    form.querySelectorAll('.quiz-question legend').forEach(lg => lg.style.borderBottom = '');


                    const questions = form.querySelectorAll('.quiz-question');
                    questions.forEach((question, index) => {
                        totalQuestions++;
                        const questionName = `q${index + 1}`;
                        const selectedAnswer = form.querySelector(`input[name="${questionName}"]:checked`);
                        const correctAnswer = answers[questionName];
                        const legend = question.querySelector('legend');

                        const resultP = document.createElement('p');
                        resultP.style.marginBottom = '0.5rem'; // Add some spacing

                        if (selectedAnswer) {
                            // Find the label associated with the selected answer for potential styling
                            const selectedLabel = selectedAnswer.closest('label');

                            if (selectedAnswer.value === correctAnswer) {
                                score++;
                                resultP.innerHTML = `<strong>Q${index + 1}:</strong> Correct! ✅`;
                                resultP.style.color = '#059669'; // Green-600
                                if (legend) legend.style.borderBottom = '2px solid #10b981'; // emerald-500
                                if (selectedLabel) selectedLabel.style.fontWeight = 'bold'; // Highlight correct selection
                            } else {
                                resultP.innerHTML = `<strong>Q${index + 1}:</strong> Incorrect. ❌`;
                                resultP.style.color = '#dc2626'; // Red-600
                                if (legend) legend.style.borderBottom = '2px solid #f87171'; // red-400
                                // Optionally find and highlight the correct answer's label
                                const correctInput = form.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
                                if (correctInput) {
                                    const correctLabel = correctInput.closest('label');
                                    if (correctLabel) correctLabel.style.borderBottom = '2px solid #10b981'; // Highlight correct answer
                                }
                            }
                        } else {
                            resultP.innerHTML = `<strong>Q${index + 1}:</strong> Not answered. 🤔`;
                            resultP.style.color = '#f59e0b'; // Amber-500
                            if (legend) legend.style.borderBottom = '2px solid #fbbf24'; // amber-400
                        }
                        resultsDiv.appendChild(resultP);
                    });

                    // Display final score
                    const scoreP = document.createElement('p');
                    scoreP.innerHTML = `<strong>Final Score: ${score} out of ${totalQuestions}</strong> ${score === totalQuestions ? '🎉 Perfect!' : (score / totalQuestions >= 0.6 ? '👍 Good Job!' : '🧐 Keep Practicing!')}`;
                    scoreP.className = 'text-lg font-semibold mt-4 pt-2 border-t border-purple-300 border-opacity-50'; // Added Tailwind classes via CSS instead if preferred
                    resultsDiv.appendChild(scoreP);

                    // Add styles for results area appearance
                    resultsDiv.style.backgroundColor = 'rgba(245, 243, 255, 0.7)'; // Light purple tint bg
                    resultsDiv.style.border = '1px solid rgba(196, 181, 253, 0.7)'; // violet-200 border
                    resultsDiv.style.marginTop = '1rem';
                    resultsDiv.style.padding = '1rem';
                    resultsDiv.style.borderRadius = '0.75rem'; // squircle-sm equivalent
                });
            });
             console.log(`Quizzes initialized (${quizContainers.length} found). ✅`);
        } catch (error) {
            console.error("Error setting up quizzes:", error);
        }
    }


    // --- Initialize all features ---
    highlightActiveNav();
    setupCopyButtons();
    setupDemo();
    setupQuizzes(); // Initialize quizzes

}); // End DOMContentLoaded
