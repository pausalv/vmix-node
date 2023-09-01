# vMix library for NodeJS

This library allows you to control vMix from NodeJS.

# Installation

```bash
npm install vmix-node
```

# Quick Start

```typescript
import { ConnectionVMix } from "vmix-node";

// Create a new connection to vMix
const vMix = new ConnectionVMix('localhost');

// Listen for connect event
vMix.on("connect", async () => {
  console.log("Connected to vMix");
});

// Listen for disconnect event
vMix.on("disconnect", () => {
  console.log("Disconnected from vMix");
});

// Listen for tally event
vMix.on("tally", (tally: string) => {
  console.log('TALLY:', tally);
});


(async () => { //This is for async/await
  // connect to vMix
  await vMix.connectAsync();

  // send tally command
  vMix.sendCommand("TALLY");

  // subscribe to tally events
  vMix.subscribe("TALLY");
})();
```

# Implemented Commands

- [x] VERSION
- [x] TALLY
- [x] ACTS
- [x] SUBSCRIBE
- [x] UNSUBSCRIBE
- [ ] FUNCTION
- [ ] XML
- [ ] XMLTEXT
