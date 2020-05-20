import React, { useState, useEffect, useRef } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Moment from 'moment'
import Servicios from '../serviceReportes'
import {Bar} from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const ReporteParadasMaquina = (props) => {
const [fechaDesdeFundicion,setFechaDesdeFundicion] = useState(new Moment())
const [fechaHastaFundicion,setFechaHastaFundicion] = useState(new Moment ())
const [idArea,setIdArea] = useState(null)
const [vecAreas,setVecAreas] = useState([])
const [vecLabels,setVecLabels] = useState([])
const [vecValues,setVecValues] = useState([])
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
                borderWidth : 2
            }
        ]
    }
    const options = {
        scales : {
            yAxes : [
                {
                    ticks : {
                        beginAtZero : true
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
            <div className = 'containerGrafico'>
                <Bar
                    ref = {grafico}
                    data = {data}
                    plugins = {plugins}
                    options = { options}
                />
            </div>
        </div>
    )
}
export default ReporteParadasMaquina