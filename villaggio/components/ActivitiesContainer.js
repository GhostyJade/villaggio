import { Col, Grid } from 'native-base'
import React, { useEffect } from 'react'

export default function ActivitiesContainer(props) {

    const [data, setData] = React.useState([])

    useEffect(() => {
        fetch('https://workers.ghostyjade.workers.dev/activities/list', {
            headers: {
                'x-access-token': props.user.token
            }
        }).then()
    }, [])

    return (
        <Grid>
            {
                data.map(v, i => {
                    
                })
            }
        </Grid>
    )
}