# TODOS

### Capture Keystrokes
1. Set global state on extension start with user names
- During someone's turn, hook into the onDidChangeTextDocument API
- Listen for changes
- Increment a count per user for each change they make with the keyboard
- Handle swapping of currently paired person (update global/extension state)
- Give some way at the end to get a report of this, maybe a keystroke or window or something