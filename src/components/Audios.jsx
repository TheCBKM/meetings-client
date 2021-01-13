import { Link } from '@reach/router'
import { Button, Card } from 'antd'
import React from 'react'

export default function Audios() {
    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <Card title={"TITLE"}>
                    <p>
                        DESCRIPTION
        </p>
                    <Link to={`/audio/1U0WT4ohvFx11RP1nz32MXCE4yKzEJjQE`}>
                        <Button>PLAY</Button>
                    </Link>
                </Card>
            </div>
        </div>
    )
}
