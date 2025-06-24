document.addEventListener('DOMContentLoaded', () => {
    // --- Config & Elements ---
    const challengeBtn = document.getElementById('challenge-btn');
    const initialContainer = document.getElementById('initial-container');
    const terminalContainer = document.getElementById('terminal-container');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    // --- The Secret Key Section ---
    
    const masterKey = "2nc&bcHj-kf8_pQz!dGv$LwXyZ1aB3eF"; 

    let isTyping = false;

    // --- Event Listeners ---
    challengeBtn.addEventListener('click', startChallenge);
    terminalInput.addEventListener('keydown', handleInput);
    
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // --- Functions ---
    function startChallenge() {
        initialContainer.style.display = 'none';
        terminalContainer.style.display = 'flex';
        terminalInput.focus();
        playIntroSequence();
    }

    async function playIntroSequence() {
        const introLines = [
            { text: "[SYSTEM]: Initializing P.A.I.G.E...", class: 'text-system' },
            { text: "[AI]: Greetings. I am P.A.I.G.E (Priyank's Artificially Intelligent Gatekeeper Entity).", class: 'text-ai' },
            { text: "[AI]: Access to private contact details is restricted.", class: 'text-ai' },
            { text: "[AI]: If you are smart enough, determine the answer to this question:", class: 'text-ai' },
        ];

        isTyping = true;
        for (const line of introLines) {
            await typeLine(line.text, line.class);
        }
        isTyping = false;
        terminalInput.focus();
    }

    async function handleInput(event) {
        if (event.key !== 'Enter' || isTyping) return;
        
        const command = terminalInput.value.trim();
        if (command === '') return;

        // Echo user command
        const promptEcho = document.createElement('p');
        promptEcho.innerHTML = `<span class="prompt-user">guest@portfolio:~$</span> ${command}`;
        terminalOutput.appendChild(promptEcho);

        terminalInput.value = '';
        isTyping = true;
        await processCommand(command);
        isTyping = false;
        terminalInput.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
    }

    async function processCommand(command) {
        if (command.toLowerCase() === 'exit') {
            await typeLine("[AI]: Ah, a reader of the sacred texts. I see you.", 'text-ai');
            await typeLine("[SYSTEM]: Aborting sequence...", 'text-system');
            setTimeout(() => {
                // You can redirect or just close the window
                window.location.href = '../contact%20me/contact.html';
            }, 1000);
        } else if (command === masterKey) {
            await typeLine("[SYSTEM]: KEY ACCEPTED. AUTHENTICATING...", 'text-success');
            await typeLine("[AI]: Impressive. You found the key in the source.", 'text-ai');
            await typeLine("[AI]: Which begs the question... why didn't you just look for the phone number there?", 'text-ai');
            // So u figured out I haven't shared my number? Just type `exit` on the terminal and return lol
            await typeLine("[AI]: Oh, right.", 'text-ai'); 
            await typeLine("[AI]: Security through obscurity is for amateurs. A real conversation needs a real encrypted channel.", 'text-ai');
            await typeLine("[AI]: Routing you there now.", 'text-ai');
            createSecureChannelButton();
        } else {
            await typeLine("[SYSTEM]: KEY REJECTED.", 'text-error');
            await typeLine("[AI]: Negative. The blueprint is more complex than that.", 'text-ai');
            await typeLine("[AI]: My intelligence reading of you is... dropping.", 'text-ai');
        }
    }

    function typeLine(text, className) {
        return new Promise(resolve => {
            const p = document.createElement('p');
            p.className = className;
            terminalOutput.appendChild(p);

            let i = 0;
            const interval = setInterval(() => {
                p.textContent += text[i];
                i++;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                if (i >= text.length) {
                    clearInterval(interval);
                    setTimeout(resolve, 300); // Small pause after line is typed
                }
            }, 30); // Typing speed
        });
    }

    function createSecureChannelButton() {
        const button = document.createElement('button');
        button.textContent = 'Proceed to Secure Channel';
        button.className = 'terminal-btn';
        button.onclick = () => {
            window.location.href = '../contact%20me/contact.html';
        };
        terminalOutput.appendChild(button);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});