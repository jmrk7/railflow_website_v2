import React from "react"

import FeatureHero from "./hero"
import FeatureList from "./feature-list"

const FeaturePage = (props) => {
    return (
        <div>
            <FeatureHero {...props} />
            <FeatureList {...props} />
        </div>
    )
}

export default FeaturePage
