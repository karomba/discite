/**
 * Discite Main JavaScript File
 *
 * Includes:
 * - Dark Mode Toggle & Persistence
 * - Active Navigation Link Highlighting
 * - Copy-to-Clipboard functionality for code blocks
 * - Interactive Demo functionality (if elements exist)
 * - Simple Quiz Functionality
 * - Basic Client-Side Search
 */

document.addEventListener('DOMContentLoaded', () => {

    console.log("Discite JS Initializing... 🚀");

    // --- Dark Mode Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = themeToggleButton?.querySelector('.light-icon');
    const darkIcon = themeToggleButton?.querySelector('.dark-icon');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'inline';
        } else {
            document.body.classList.remove('dark-mode');
            if (lightIcon) lightIcon.style.display = 'inline';
            if (darkIcon) darkIcon.style.display = 'none';
        }
    }

    // Apply initial theme
    applyTheme(currentTheme);

    // Add toggle listener
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme); // Save preference
            applyTheme(newTheme);
        });
    } else {
        console.warn("Theme toggle button not found.");
    }

    // --- Active Navigation Link Highlighting ---
    function highlightActiveNav() {
        try {
            const navLinks = document.querySelectorAll('.main-nav .nav-link');
            const currentPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                if (linkPath === currentPath) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
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
                        navigator.clipboard.writeText(codeElement.textContent || "").then(() => {
                            copyButton.textContent = 'Copied! ✅';
                            copyButton.classList.add('copied');
                            copyButton.disabled = true;
                            setTimeout(() => {
                                copyButton.textContent = 'Copy';
                                copyButton.classList.remove('copied');
                                copyButton.disabled = false;
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy code: ', err);
                            copyButton.textContent = 'Error ❌';
                            setTimeout(() => { copyButton.textContent = 'Copy'; }, 3000);
                        });
                    });
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
            if (!inputElement || !actionButton || !outputArea) return;

            const handleUpdate = () => {
                const inputText = inputElement.value.trim();
                outputArea.textContent = inputText ? `You entered: "${inputText}" 😎` : 'Bruh, enter something! 🤷';
                outputArea.style.color = inputText ? 'var(--heading-text)' : '#b91c1c'; // Use CSS var or red
                inputElement.value = '';
                inputElement.focus();
            };
            actionButton.addEventListener('click', handleUpdate);
            inputElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') { event.preventDefault(); handleUpdate(); }
            });
            console.log("Interactive demo initialized. ✅");
        } catch (error) {
            console.error("Error setting up interactive demo:", error);
        }
    }

    // --- Simple Quiz Functionality ---
    function setupQuizzes() {
        try {
            const quizContainers = document.querySelectorAll('.quiz-container');
            if (quizContainers.length === 0) return;

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
                if (!form || !resultsDiv || !answers) return;

                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    let score = 0;
                    let totalQuestions = 0;
                    resultsDiv.innerHTML = '';
                    form.querySelectorAll('.quiz-question legend').forEach(lg => lg.style.borderBottom = ''); // Reset borders

                    const questions = form.querySelectorAll('.quiz-question');
                    questions.forEach((question, index) => {
                        totalQuestions++;
                        const questionName = `q${index + 1}`;
                        const selectedAnswer = form.querySelector(`input[name="${questionName}"]:checked`);
                        const correctAnswer = answers[questionName];
                        const legend = question.querySelector('legend');
                        const resultP = document.createElement('p');
                        resultP.style.marginBottom = '0.5rem';

                        if (selectedAnswer) {
                            const selectedLabel = selectedAnswer.closest('label');
                            if (selectedAnswer.value === correctAnswer) {
                                score++;
                                resultP.innerHTML = `<strong>Q${index + 1}:</strong> Correct! ✅`;
                                resultP.style.color = 'var(--syntax-js-string)'; // Use green color var
                                if (legend) legend.style.borderBottom = '2px solid var(--syntax-js-string)';
                                if (selectedLabel) selectedLabel.style.fontWeight = 'bold';
                            } else {
                                resultP.innerHTML = `<strong>Q${index + 1}:</strong> Incorrect. ❌`;
                                resultP.style.color = 'var(--syntax-js-number)'; // Use red/pink color var
                                if (legend) legend.style.borderBottom = '2px solid var(--syntax-js-number)';
                                const correctInput = form.querySelector(`input[name="${questionName}"][value="${correctAnswer}"]`);
                                if (correctInput) {
                                    const correctLabel = correctInput.closest('label');
                                    if (correctLabel) correctLabel.style.borderBottom = '2px solid var(--syntax-js-string)';
                                }
                            }
                        } else {
                            resultP.innerHTML = `<strong>Q${index + 1}:</strong> Not answered. 🤔`;
                            resultP.style.color = 'var(--syntax-js-function)'; // Use orange/yellow color var
                            if (legend) legend.style.borderBottom = '2px solid var(--syntax-js-function)';
                        }
                        resultsDiv.appendChild(resultP);
                    });

                    const scoreP = document.createElement('p');
                    scoreP.innerHTML = `<strong>Final Score: ${score} out of ${totalQuestions}</strong> ${score === totalQuestions ? '🎉 Perfect!' : (score / totalQuestions >= 0.6 ? '👍 Good Job!' : '🧐 Keep Practicing!')}`;
                    scoreP.className = 'final-score'; // Use class from CSS
                    resultsDiv.appendChild(scoreP);

                    resultsDiv.style.backgroundColor = 'var(--quiz-results-bg)';
                    resultsDiv.style.border = '1px solid var(--quiz-results-border)';
                    resultsDiv.style.marginTop = '1rem';
                    resultsDiv.style.padding = '1rem';
                    resultsDiv.style.borderRadius = '0.75rem';
                });
            });
             console.log(`Quizzes initialized (${quizContainers.length} found). ✅`);
        } catch (error) {
            console.error("Error setting up quizzes:", error);
        }
    }

    // --- Basic Client-Side Search ---
    function setupSearch() {
        try {
            const searchInput = document.getElementById('site-search');
            const contentSections = document.querySelectorAll('main .content-section'); // Target sections in main content

            if (!searchInput || contentSections.length === 0) {
                // console.log("Search input or content sections not found.");
                return; // Exit if search input or sections aren't present
            }

            searchInput.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase().trim();

                contentSections.forEach(section => {
                    // Make text content easily searchable (ignore code blocks for now)
                    let sectionText = '';
                    section.querySelectorAll('p, h2, h3, h4, li, legend, caption, th, td').forEach(el => {
                        sectionText += (el.textContent || '').toLowerCase() + ' ';
                    });

                    // Basic show/hide logic
                    if (sectionText.includes(searchTerm)) {
                        section.classList.remove('hidden-by-search');
                        section.style.display = ''; // Reset display
                    } else {
                        section.classList.add('hidden-by-search');
                        section.style.display = 'none'; // Hide section
                    }
                });
            });
            console.log("Search functionality initialized. ✅");
        } catch (error) {
            console.error("Error setting up search:", error);
        }
    }


    // --- Initialize all features ---
    highlightActiveNav();
    setupCopyButtons();
    setupDemo();
    setupQuizzes();
    setupSearch(); // Initialize search

}); // End DOMContentLoaded
