import React, { useEffect } from 'react'
import { Col, Grid, View } from 'native-base'
import ActivityImage from './ActivityImage'

export default function ActivitiesContainer(props) {

    const [data, setData] = React.useState(null)

    useEffect(() => {
        fetch('https://villaggio.ghostyjade.workers.dev/activities', {
            headers: {
                'x-access-token': props.user.token
            }
        }).then(response => response.json()).then(result => {
            setData(result.list)
        })
    }, [])

    if (!data) return <></>

    return (
        <View>
            {
                data.map((v, i) => {
                    return (<ActivityImage key={i} data={v} />)
                })
            }
        </View>
    )
}