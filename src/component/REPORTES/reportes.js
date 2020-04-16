import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import BarChartIcon from '@material-ui/icons/BarChart'
import TabPanel from './tabPanelReportes'
import OeeFundicion from './OEEFUNDICION/oeeFundicion'

const Reportes = ( props ) => {
    const [value , setValue] = React.useState ( 0 )
    function a11yProps(index) {
        return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
        }
    }
    const handleChange = ( event , newValue ) => { setValue ( newValue ) }
    return (
    <div >
        <AppBar position="static" color="default">
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
        >
            <Tab label="OEE Fundicion" icon={<BarChartIcon />} {...a11yProps(0)} />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <OeeFundicion/>
        </TabPanel>
    </div>
    )
}

export default Reportes