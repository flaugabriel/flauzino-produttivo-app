import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import EquipmentCrud from '../components/equipment/EquipmentCrud'
import PlaceCrud from '../components/place/PlaceCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/equipaments' component={EquipmentCrud} />
        <Route path='/places' component={PlaceCrud} />
        <Redirect from='*' to='/' />
    </Switch>