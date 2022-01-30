## Nebula
### Nebula is a lightweight (1kb compressed) JavaScript library that creates beautiful universe animations.
Including configurable Stars, Nebulas, Comets, Planets and Suns.  
Nebula comes with a vanilla JS and a React wrapper.  
Compatible with SSR

<a href="https://nebula-demo.vercel.app/">
    <img src="https://raw.githubusercontent.com/flodlc/nebula/master/demo_image.jpg" />
</a>
<a href="https://nebula-demo.vercel.app/">Demo page</a>

### `Installation`
```
npm install @flodlc/nebula
```

### `usage`
#### `Vanilla JS`
```javascript
import { createNebula } from "@flodlc/nebula";

<div id="nebula-element"></div>

const element = document.getElementById("nebula-element")
const nebula = createNebula(element, {
    starsCount: 250,
    starsRotationSpeed: 3,
    solarSystemScale: 1,
    ...
});
// ... if needed:
nebula.destroy()
 ```

#### `React`
 ```javascript
import { ReactNebula } from "@flodlc/nebula";

export default App = () => {
    return (
        <>
            // With default config
            <ReactNebula/>

            // With custom config
            <ReactNebula config={{
                starsCount: 250,
                starsRotationSpeed: 3,
                solarSystemScale: 1,
                ...
            }}/>
        </>
    )
}
 ```
The canvas is positioned ``absolute`` and takes the size of its parent.
### `Config`
key | option type | default | Comment
---|-----------|---|---
`starsCount` | `number` | `350` | Recommended: < `1000`
`starsColor` | `string` | `#ffffff`
`starsRotationSpeed` | `number` | `3`
`cometFrequence` | `number` | `20` | `0` disables the comets
`nebulasIntensity` | `number` | `10`
`nebulasColors` | `string[]` accept rgb and hex | `["rgb(5,63,157)", "rgb(42,112,25)", "rgb(182,41,44)"]`
`solarSystemScale` | `number` | `1` | `0` hides the solar system
`solarSystemDistance` | `number` | `65` |  Recommended: < `100`
`solarSystemRotationSpeed` | `number` | `100`
