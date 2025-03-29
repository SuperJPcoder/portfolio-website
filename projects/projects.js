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
      'dev': ['AdoPet', 'Inventora'],
      'algos': ['Project C', 'Project D'],
      'ai-ml': ['Project E', 'Project F'],
      'thinking': ['Project G', 'Project H']
  };

  const projectDetails = {
      'AdoPet': 'Dummy description for Project A.',
      'Inventora': 'Dummy description for Project B.',
      'Project C': 'Dummy description for Project C.',
      'Project D': 'Dummy description for Project D.',
      'Project E': 'Dummy description for Project E.',
      'Project F': 'Dummy description for Project F.',
      'Project G': 'Dummy description for Project G.',
      'Project H': 'Dummy description for Project H.'
  };

  const availableCommands = {
      'ls': 'List directories and projects',
      'cd [name]': 'Navigate to a directory',
      'cd ..': 'Go back to the previous directory',
      'cat [project]': 'Show project details',
      'clear': 'Clear the terminal',
      'help': 'List available commands',
      'pwd': 'Show current directory'
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
              if (args[1] && projectDetails[args[1]]) {
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

          default:
              printToTerminal(`Command not found: ${cmd}`, '#ff6666');
              break;
      }
  }

  function autoComplete(inputValue) {
      const dirKey = currentDir === '~projects' ? 'projects' : currentDir.replace('~projects/', '');
      const possibilities = directories[dirKey].filter(item => item.startsWith(inputValue));
      return possibilities.length === 1 ? possibilities[0] : null;
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
          const autoCompleteResult = autoComplete(input.value.trim());
          if (autoCompleteResult) {
              input.value = autoCompleteResult;
          }
      }
  });

  updatePrompt();
  printToTerminal('Lets explore! Type `help` to begin.', '#ffff66');
});
