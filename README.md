# vMix library for NodeJS

This library allows you to control vMix from NodeJS.

# Installation

```bash
npm install vmix-node
```

# Quick Start

```typescript
import { ConnectionVMix, TallyArray } from "vmix-node";

// Create a new connection to vMix
const vMix = new ConnectionVMix();

// Listen for connect event
vMix.on("connect", async () => {
  console.log("Connected to vMix");
});

// Listen for disconnect event
vMix.on("disconnect", () => {
  console.log("Disconnected from vMix");
});

// Listen for tally event
vMix.on("tally", (tally: TallyArray) => {
  console.log('TALLY:', tally);
});

(async () => {
  // connect to vMix
  await vMix.connectAsync();

  // send tally command
  vMix.sendCommand("TALLY");

  // subscribe to tally events
  vMix.subscribe("TALLY");


})();
```

# Implemented Commands

- ✅ VERSION
- ✅ TALLY
- ✅ ACTS
- ✅ SUBSCRIBE
- ✅ UNSUBSCRIBE
- ❌ FUNCTION
- ❌ XML
- ❌ XMLTEXT
