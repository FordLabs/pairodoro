# pairodoro

Pairodoro is a timer to help better facilitate paired programming in vscode. 

## Features

Provide the name of the two developers that are currently pairing, set an amount of time in seconds to pass before enforcing a pair swap, develop!

This displays the name of the developer who should currently be driving through the codebase at the bottom right of the editor and the time until a pair swap should happen. 

## Extension Settings

This extension contributes the following settings:

``` 
   "pairodoro.player1": {
        "color": "#fff",
        "name": "First Pair"
    },
    "pairodoro.player2": {
        "name": "Second Pair"
    },
    "pairodoro.seconds": 25, # How many seconds until a pair swaps
```

