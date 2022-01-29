## Nebula
### Nebula is a lightweight (1kb compressed) JavaScript library for creating beautifull universe animations with React / Next / Gatsby.
Including configurable Stars, Nebulas, Comets, Planets and Suns.  
Compatible with SSR

<a href="https://nebula-demo.vercel.app/">
    <img src="https://raw.githubusercontent.com/flodlc/nebula/master/demo.jpg" />
</a>
<a href="https://nebula-demo.vercel.app/">Demo page</a>

### `Installation`
```
npm install @flodlc/nebula
```

### `Basic usage`
```javascript
import { ReactNebula, smallSolarSystem, bigSolarSystem } from "@flodlc/nebula";

export default App = () => {
    return (
        <>
            {/*With default config*/}
            <ReactNebula/>

            {/*With custom config*/}
            <ReactNebula config={{
                starsCount: 250,
                starsColor: "#FFFFFF",
                starsRotationSpeed: 3,
                cometFrequence: 2,
                nebulasIntensity: 8,
                nebulasColors: ["rgb(27,2,140)", "rgb(22,91,2)", "#880554"],
                solarSystemScale: 1,
                solarSystemDistance: 65,
                solarSystemRotationSpeed: 100
            }}/>
            <ReactNebula config={{astres: smallSolarSystem}}/>
            <ReactNebula config={{astres: bigSolarSystem}}/>
        </>
    )
}
 ```
The canvas is positioned ``absolute`` and takes the size of its parent.
### `Config`
key | option type | default | Comment
---|-----------|---|---
`starsCount` | `number` | `250` | Recommended to keep smaller than `1000`
`starsColor` | `string` | `#ffffff`
`starsRotationSpeed` | `number` | `3`
`cometFrequence` | `number` | `2` | Value `0` disables the comets
`nebulasIntensity` | `number` | `8`
`nebulasColors` | `string[]` accept rgb and hex | `["rgb(5,63,157)", "rgb(42,112,25)", "rgb(182,41,44)"]`
`solarSystemScale` | `number` | `1` | Value `0` hides the solar system
`solarSystemDistance` | `number` | `65` | Values greater than `100` can be out of screen 
`solarSystemRotationSpeed` | `number` | `100`
