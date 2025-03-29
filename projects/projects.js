document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const prompt = document.getElementById('prompt');
    
    let currentDir = '~projects';
    let commandHistory = [];
    let historyIndex = -1;
    const directories = {
        'projects': ['dev', 'algos', 'ai-ml', 'thinking'],
        'dev': ['AdoPet', 'Inventora', 'Portfolio'],
        'algos': ['SpatialFourier', 'TIR_crypto'],
        'ai-ml': ['SuperXO', 'AlphaZeroGo'],
        'thinking': ['EulerProof', 'Relativity']
    };

    const projectDetails = {
        'AdoPet': 'Dummy description for Project A.',
        'Inventora': 'Dummy description for Project B.',
        'Portfolio': 'Dummy description for Project C.',
        'SpatialFourier': 'Dummy description for Project D.',
        'TIR_crypto': 'Dummy description for Project E.',
        'SuperXO': 'Dummy description for Project F.',
        'AlphaZeroGo': 'Dummy description for Project G.',
        'EulerProof': 'Dummy description for Project H.',
        'Relativity': 'Dummy description for Project G.'
    };

    const availableCommands = {
        'ls': 'List directories and projects',
        'cd [name]': 'Navigate to a directory',
        'cd ..': 'Go back to the previous directory',
        'cat [project]': 'Show project details',
        'clear': 'Clear the terminal',
        'help': 'List available commands (use Tab for autocomplete)',
        'pwd': 'Show current directory',
        'exit': 'Return to navigation'
    };

    function printToTerminal(text, color = '#00ffcc') {
        output.innerHTML += `\n<span style="color: ${color}">${text}</span>`;
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
            suggestionBox.style.position = 'absolute';
            suggestionBox.style.background = '#000';
            suggestionBox.style.color = '#00ffcc';
            suggestionBox.style.opacity = '0.7';
            suggestionBox.style.padding = '5px';
            suggestionBox.style.border = '1px solid #00ffcc';
            suggestionBox.style.zIndex = '10';
            terminal.appendChild(suggestionBox);
        }
        suggestionBox.innerHTML = suggestions.map(item => `<div>${item}</div>`).join('');
        suggestionBox.style.display = suggestions.length ? 'block' : 'none';
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
