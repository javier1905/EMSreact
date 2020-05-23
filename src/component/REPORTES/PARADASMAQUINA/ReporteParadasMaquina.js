import React, { useState, useEffect, useRef } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Moment from 'moment'
import Servicios from '../serviceReportes'
import {Bar} from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ModalDetalleXMaquina from './modalDetallePMxMaq'

const ReporteParadasMaquina = (props) => {
const [fechaDesdeFundicion,setFechaDesdeFundicion] = useState(new Moment().month(0).date(1))
const [fechaHastaFundicion,setFechaHastaFundicion] = useState(new Moment ())
const [idArea,setIdArea] = useState(null)
const [vecAreas,setVecAreas] = useState([])
const [vecLabels,setVecLabels] = useState([])
const [vecValues,setVecValues] = useState([])
const [openDetalleXmaquina,setOpenDetalleXmaquina] = useState(false)
const [vecDetalleXmaq,setVecDetalleXmaq] = useState([])
const [loadingModalDetallexMaq , setLoadingModalDetallexMaq] = useState(true)
const [maquinaSeleccionada , setMaquinaSeleccionada] = useState(undefined)
const grafico = useRef()
useEffect( () => {
    const getListas = async () => {
        const vecAre = await Servicios.listaAreas()
        if(Array.isArray(vecAre)) {
            vecAre.unshift({idArea:null , nombreArea : 'NONE'})
            setVecAreas(vecAre)
        }
    }
    getListas()
    try {  grafico.current.chartInstance.plugins.unregister(ChartDataLabels) }
    catch(e){}
} , [props] )
    useEffect(() => {
        const getPM = async () => {
            const vecReportesParaMaquina = await Servicios.listaReporteParadasMaquina (idArea , fechaDesdeFundicion , fechaHastaFundicion )
            if (vecReportesParaMaquina) {
                setVecLabels (vecReportesParaMaquina.vecLabels)
                setVecValues(vecReportesParaMaquina.vecValues)
            }
        }
        getPM ()
    } , [idArea,fechaDesdeFundicion , fechaHastaFundicion] )
    const data = {
        labels : vecLabels ,
        datasets : [
            {
                type : 'bar' ,
                data : vecValues ,
                backgroundColor : 'rgb(55, 49, 138)' ,
                borderColor : 'rgb(55, 49, 138)' ,
                borderWidth : 2 ,
                label : 'Min paradas de maquina' ,
                yAxisID : 'ejeIzquierdo'
            }
        ]
    }
    const eventGraf = e => {
        var firstPoint = grafico.current.chartInstance.getElementAtEvent(e)[0];
        if (firstPoint) {
            var label = grafico.current.chartInstance.data.labels[firstPoint._index];
            var value = grafico.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        }
        if(label !== undefined && value !== undefined){
            setMaquinaSeleccionada(label)
            setOpenDetalleXmaquina(true)
            const getVecDetallexMaquina = async () => {
                const vecDetxMaq = await Servicios.listaDetallePMxMaquina (fechaDesdeFundicion , fechaHastaFundicion , label, idArea)
                if(vecDetxMaq) {
                    setVecDetalleXmaq(vecDetxMaq)
                    setLoadingModalDetallexMaq(false)
                }
            }
            getVecDetallexMaquina()
        }
    }
    const closeDetalleXmaquina = () => {
        setLoadingModalDetallexMaq(true)
        setOpenDetalleXmaquina(false)
    }
    const options = {
        plugins : {
            datalabels : {
                color : 'white' ,
                font : {
                    size : '20'
                } ,
                formatter : (value , constext) => {
                    return `${value} min`
                }
                // borderColor : '#0C1863',
                // borderWidth : 2 ,
                // backgroundColor : 'red'
            }
        } ,
        responsive : true ,
        onClick : eventGraf ,
        tooltips : {
            mode : 'label' ,
            intersect : true
        } ,
        title : {
            text : 'Paradas de Maquina' ,
            display : true ,
            position : 'top' ,
            fontSize : 20
        },
        element : {
            line : {
                tension : 0 ,
                fill : false
            }
        } ,
        legend : {
            display : true ,
            position : 'bottom' ,
            align : 'center'
        } ,
        scales : {
            yAxes : [
                {
                    id : 'ejeIzquierdo' ,
                    position : 'left' ,
                    ticks : {
                        beginAtZero : true
                    } ,
                    gridLines : {
                        offsetGridLines: true
                    }
                }
            ] ,
            xAxes : [
                {
                    id : 'ejeMaquina' ,
                    position : 'bottom' ,
                    gridLines : {
                        display : false
                    }
                }
            ]
        }
    }


    const plugins = [
        ChartDataLabels
    ]
    return (
        <div className ='containerPM'>
            <div className = 'containerFiltros'>
                <MyComponent.fecha id = 'fechaDesde' label = 'Desde' value = {fechaDesdeFundicion} onChange = { e=> setFechaDesdeFundicion (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
                <MyComponent.fecha label = 'fechaHasta' value = {fechaHastaFundicion} onChange = { e=> setFechaHastaFundicion (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
                <MyComponent.listaDesplegable onChange = { e => setIdArea(e.target.value) } value = { idArea } label = 'Area' array = {vecAreas} member = {{displayMember : 'nombreArea' , valueMember : 'idArea'}} />
            </div>
            <div>
                <ModalDetalleXMaquina
                    closeDetalleXmaquina = {closeDetalleXmaquina}
                    openDetalleXmaquina = {openDetalleXmaquina}
                    vecDetalleXmaq = {vecDetalleXmaq}
                    loadingModalDetallexMaq = {loadingModalDetallexMaq}
                    maquinaSeleccionada = {maquinaSeleccionada}
                    fechaDesdeFundicion = {fechaDesdeFundicion}
                    fechaHastaFundicion = {fechaHastaFundicion}
                    area = {vecAreas.find(a => a.idArea === idArea)}
                />
            </div>
            <div className = 'containerGrafico'>
                <Bar
                    ref = {grafico}
                    height= {150}
                    data = {data}
                    plugins = {plugins}
                    options = { options}
                />
            </div>
        </div>
    )
}
export default ReporteParadasMaquina