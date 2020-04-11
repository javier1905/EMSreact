import React from 'react'
import Piezas from './PIEZAS/listaPiezas'
import Procesos from './PROCESOS/listaProcesos'
import ListaDefectos from './DEFECTOS/listaDefectos'
import ListaMoldes from './MOLDES/listaMoldes'
import ListaParadasMaquina from './PARADASMAQUINA/listaParadasMaquina'
import ListaMaquinas  from './MAQUINAS/listaMaquinas'
import ListarTrabajadores from './TRABAJADORES/listaTrabajadores'
import { AppBar , Tabs , Tab  } from '@material-ui/core'
import TabPanel from './tabPanelIngenieria'
import {Phone as PhoneIcon , Favorite as FavoriteIcon , PersonPin as PersonPinIcon , Help as HelpIcon , ShoppingBasket , ThumbDown , ThumbUp } from '@material-ui/icons'

const Ingenieria = ( props ) => {
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
            <Tab label="Piezas" icon={<PhoneIcon />} {...a11yProps(0)} />
            <Tab label="Procesos" icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab label="Defectos" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="Moldes" icon={<HelpIcon />} {...a11yProps(3)} />
            <Tab label="Paradas de maquina" icon={<ShoppingBasket />} {...a11yProps(4)} />
            <Tab label="Maquina" icon={<ThumbDown />} {...a11yProps(5)} />
            <Tab label="Trabajadores" icon={<ThumbUp />} {...a11yProps(6)} />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Piezas/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Procesos/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ListaDefectos/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <ListaMoldes/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <ListaParadasMaquina/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <ListaMaquinas/>
        </TabPanel>
        <TabPanel value={value} index={6}>
            <ListarTrabajadores/>
        </TabPanel>
    </div>
    )
}

export default Ingenieria