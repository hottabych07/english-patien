import React from 'react'

import './PageHeader.css'

function PageHeader(props) {
    return <header className={"PageHeader"}>
            <h1>{props.pageName}</h1>
        </header>

}

export default PageHeader
