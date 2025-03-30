document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const prompt = document.getElementById('prompt');
    let currentDir = '~projects';
    let commandHistory = [];
    let historyIndex = -1;
    const directories = {
        'projects': ['dev', 'algos', 'ai-ml', 'research'],
        'dev': ['AdoPet', 'Inventora', 'Portfolio', 'VJTI-Maps'],
        'algos': ['SpatialFourier', 'TIR_crypto', 'AutoAdjustLight'],
        'ai-ml': ['SuperXO', 'AlphaZeroGo'],
        'research': ['EulerProof', 'Relativity']
    };
    const projectDetails = {
        'AdoPet': '\nProgress: [########..]\nA pet adoption portal designed with very interactive animated frontend and a robust backend. Know more @ https://github.com/SuperJPcoder/Adopet',
        'Inventora': '\nProgress: [##########]\nAn inventory management system for general stores with a smooth UI and a database with all essesntial CRUD functionalites + more. Know more @ https://github.com/SuperJPcoder/Inventory-Management-System',
        'Portfolio': '\nProgress: [#########.]\nMy portfolio website I made for some light fun. (YOU ARE SEEING IT RN). Know more @ https://github.com/SuperJPcoder/portfolio-website',
        'VJTI-Maps': '\nProgress: [#########.]\nA QGIS based project displaying the entire map of VJTI with easy to find places. Know more @ https://github.com/SuperJPcoder/VJTI-map-QGIS',
        'SpatialFourier': '\nProgress: [####......]\nA GIS project which can trandsform, store and render spatial data using fourier series, and execute spatial queries. Know more @ https://github.com/SuperJPcoder/SpatialStorageFourier',
        'AutoAdjustLight': '\nProgress: [#########.]\nA digital logic design project which, without the use of expensive microcontrollers - solely based on logic, can sense surrounding brightness and automatically & dynamically keep adjusting the brightness of a lamp',
        'TIR_crypto': '\nProgress: [##........]\nA project which can encrypt and decrypt messages using principles of optics. Know more @ https://github.com/SuperJPcoder/Light-TIR-Cryptography',
        'SuperXO': '\nProgress: [########..]\nA superXO game with AI opponoent using minimax. Game has strategis depth as there are boards within board with moves being restricted. Know more @ https://github.com/SuperJPcoder/Ultimate-Tic-Tac-Toe',
        'AlphaZeroGo': '\nProgress: [###.......]\nA reinforcement learning model which trains on its own games to master the game of Go. Know more @ https://github.com/SuperJPcoder/AmiGo',
        'EulerProof': '\nProgress: [########..]\nA beautiful proof I came up with while playing with integrals, unravelling connections in math. Know more @ https://github.com/SuperJPcoder/Euler_Research',
        'Relativity': '\nProgress: [########..]\nA new perspective and interpretation of the explaination for relativity given by Lewis Epstein in his book `Relativty Visualized`. Know more @ https://github.com/SuperJPcoder/Relativity'
    };
    const availableCommands = {
        'ls': 'List directories and projects',
        'cd [name]': 'Navigate to a directory',
        'cd ..': 'Go back to the previous directory',
        'cat [project]': 'Show project details',
        'clear': 'Clear the terminal',
        'help': 'List available commands (use Tab for autocomplete)',
        'pwd': 'Show current directory',
        'exit': 'Return to navigation',
        'ping Priyank': 'Contact Me'
    };
    function printToTerminal(text, color = '#00ffcc') {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const formattedText = text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" style="color: #66ff66; text-decoration: underline;">${url}</a>`;
        });
        output.innerHTML += `\n<span style="color: ${color}">${formattedText}</span>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
    function updatePrompt() {
        prompt.innerHTML = `<span style="color: #00ffcc">~${currentDir}$</span>`;
    }
    function showHelp() {
        printToTerminal('Available commands:', '#ffff66');
        for (let cmd in availableCommands) {
            printToTerminal(`${cmd} - ${availableCommands[cmd]}`, '#ffff66');
        }
    }
    function processCommand(command) {
        const args = command.split(' ');
        const cmd = args[0];
        switch (cmd) {
            case 'ls':
                const dirKey = currentDir === '~projects' ? 'projects' : currentDir.replace('~projects/', '');
                if (directories[dirKey]) {
                    directories[dirKey].forEach(item => {
                        const color = directories[item] ? '#00ffff' : '#66ff66';
                        printToTerminal(item, color);
                    });
                } else {
                    printToTerminal('No items found.', '#ff6666');
                }
                break;
            case 'cd':
                if (args[1]) {
                    const target = args[1];
                    if (target === '..') {
                        if (currentDir !== '~projects') {
                            currentDir = '~projects';
                        }
                    } else if (currentDir === '~projects' && directories['projects'].includes(target)) {
                        currentDir = `~projects/${target}`;
                    } else if (directories[currentDir.replace('~projects/', '')]?.includes(target)) {
                        printToTerminal(`cd: ${target} is a project, not a directory.`, '#ff6666');
                    } else {
                        printToTerminal(`cd: No such directory: ${target}`, '#ff6666');
                    }
                    updatePrompt();
                } else {
                    printToTerminal('Usage: cd [name]', '#ff6666');
                }
                break;
            case 'cat':
                const currentDirKey = currentDir === '~projects' ? 'projects' : currentDir.replace('~projects/', '');
                if (args[1] && directories[currentDirKey]?.includes(args[1]) && projectDetails[args[1]]) {
                    printToTerminal(`\n${args[1]}: ${projectDetails[args[1]]}`, '#66ff66');
                } else {
                    printToTerminal('cat: Invalid project name or missing argument.', '#ff6666');
                }
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'help':
                showHelp();
                break;
            case 'pwd':
                printToTerminal(currentDir, '#00ffff');
                break;
            case 'exit':
                printToTerminal('Returning to navigation...', '#ffff66');
                setTimeout(() => {
                    window.location.href = '../landing/landing.html';
                }, 1000);
                break;
            case 'ping':
                if (args[1] === 'Priyank') {
                    printToTerminal('Pinging Priyank... Redirecting to contact page.', '#66ff66');
                    setTimeout(() => {
                        window.location.href = '../contact%20me/contact.html';
                    }, 1000);
                } else {
                    printToTerminal(`ping: Unknown target: ${args[1]}`, '#ff6666');
                }
                break;
            default:
                printToTerminal(`Command not found: ${cmd}`, '#ff6666');
                break;
        }
    }
    function showAutoCompleteSuggestions(suggestions) {
        let suggestionBox = document.getElementById('suggestions');
        if (!suggestionBox) {
            suggestionBox = document.createElement('div');
            suggestionBox.id = 'suggestions';
            suggestionBox.style.position = 'fixed';
            suggestionBox.style.background = '#000';
            suggestionBox.style.color = '#00ffcc';
            suggestionBox.style.opacity = '0.7';
            suggestionBox.style.padding = '5px';
            suggestionBox.style.border = '1px solid #00ffcc';
            suggestionBox.style.zIndex = '10';
            document.body.appendChild(suggestionBox);
        }
        suggestionBox.innerHTML = suggestions.map(item => `<div>${item}</div>`).join('');
        suggestionBox.style.display = suggestions.length ? 'block' : 'none';
        if (suggestions.length) {
            const inputRect = input.getBoundingClientRect();
            suggestionBox.style.left = inputRect.left + 'px';
            suggestionBox.style.top = inputRect.bottom + 'px';
            suggestionBox.style.width = inputRect.width + 'px';
        }
    }
    function autoComplete(inputValue) {
        const args = inputValue.split(' ');
        const currentDirKey = currentDir === '~projects' ? 'projects' : currentDir.replace('~projects/', '');
        if (args.length === 2 && args[0] === 'cat') {
            const possibilities = directories[currentDirKey]?.filter(item => item.startsWith(args[1])) || [];
            showAutoCompleteSuggestions(possibilities);
            return possibilities.length === 1 ? `cat ${possibilities[0]}` : inputValue;
        }
        if (args.length === 2 && args[0] === 'cd' && currentDir === '~projects') {
            const possibilities = directories['projects'].filter(item => item.startsWith(args[1]));
            showAutoCompleteSuggestions(possibilities);
            return possibilities.length === 1 ? `cd ${possibilities[0]}` : inputValue;
        }
        if (args.length === 2 && args[0] === 'ping') {
            if ('Priyank'.startsWith(args[1])) {
                showAutoCompleteSuggestions(['Priyank']);
                return `ping Priyank`;
            }
        }
        if (inputValue === '') {
            showAutoCompleteSuggestions([]);
        }
        return inputValue;
    }
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                printToTerminal(`~${currentDir}$ ${command}`, '#00ffcc');
                processCommand(command);
            }
            input.value = '';
            showAutoCompleteSuggestions([]);
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            input.value = autoComplete(input.value.trim());
        } else {
            autoComplete(input.value.trim());
        }
    });
    updatePrompt();
    printToTerminal('Lets explore! Type `help` to begin. Use Tab for autocomplete.', '#ffff66');
});
