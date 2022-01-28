## Nebula
### Nebula is a lightweight (1kb compressed) JavaScript library for creating universe animations with React.
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

### `Usage`
```javascript
import { ReactNebula, smallSolarSystem, bigSolarSystem } from "@flodlc/nebula";

export default App = () => {
    return (
        <>
            <ReactNebula/>
            <ReactNebula config={...}/>
            <ReactNebula config={{astres: smallSolarSystem}}/>
            <ReactNebula config={{astres: bigSolarSystem}}/>
        </>
    )
}
 ```

The canvas is positioned ``absolute`` and takes the size of its parent.
### `Config`
key | option type | default
---|-----------|---
`astres` | `AstreDescription[]` `smallSolarSystem` or `bigSolarSystem` (see Usage) | `[]`
`scale` | `number` | `1`
`speed` | `number` | `1`
`starsCount` | `number` | `200`
`starsColor` | `string` | `#ffffff`
`starsRotationSpeed` | `number` | `5`
`cometFrequence` | `number` | `3`
`nebulasIntensity` | `number` | `8`
`nebulasColors` | `string[]` accept rgb and hex | `["rgb(5,63,157)", "rgb(42,112,25)", "rgb(182,41,44)"]`
