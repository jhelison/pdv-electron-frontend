import React from "react"

export default (props) => (
    <main className="content" id="main-content">
        <div className="main-content-title">
            <div className="main-content-title-icon">
                {props.icon}
            </div>
            
            <div>
                <h3>{props.title}</h3>
                <h4>{props.subtitle}</h4>
            </div>
        </div>


        <div className="children-content">{props.children}</div>
    </main>
)
