import React , { useState , useEffect , useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import Typography from '@material-ui/core/Typography'
import Moment from 'moment'
import Loading from '@material-ui/core/CircularProgress'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import './styleOeeFun.css'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const GraficoOeeFun = ( props ) => {

    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [fechaFundicionDesde , setFechaFundicionDesde] = useState ( new Moment ( new Date (  ) ).add (  -1 , 'months').format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaFundicionHasta , setFechaFundicionHasta] = useState ( new Date (  ) )
    const [vecMaquinas , setVecMaquinas] = useState ( '' )
    const [vecPiezas , setVecPiezas] = useState ( '' )
    const [vecMoldes , setVecMoldes] = useState ( '' )
    const [loading , setLoading] = useState ( true )
    const [vecFechass , setVecFechass] = useState ( [  ] )
    const [vecDis , setVecDis] = useState ( [  ] )
    const [vecRen , setVecRen] = useState ( [  ] )
    const [vecQal , setVecQal] = useState ( [  ] )
    const [vecOee , setVecOee] = useState ( [  ] )
    const [vecColores , setVecColores] = useState ( [  ] )
    const [vecObjetivoMin , setVecObjetivoMin] = useState ( [  ] )
    const [vecObjetivoMax , setVecObjetivoMax] = useState ( [  ] )
    const [idAgrupar , setIdAgrupar] = useState( 1 )

    const grafico = useRef (  )

    useEffect ( (  ) => {
        const getListas = async (  ) => {
            const listaMaq = await Servicios.listaMaquinas (  )
            const listaPie = await Servicios.listaPiezas (  )
            if ( listaMaq) {
                listaMaq.unshift ( { idMaquina : '' , nombreMaquina : 'NONE' } )
                setVecMaquinas ( listaMaq )
            }
            if ( listaPie) {
                listaPie.unshift ( { idPieza : '' , nombrePieza : 'NONE' } )
                setVecPiezas ( listaPie )
            }
        }
        getListas (  )
        try {
            grafico.current.chartInstance.plugins.unregister(ChartDataLabels)
        }
        catch ( e ) { }
    }  , [ props ]  )
    useEffect ( (  ) => {
        const getMoldes =  async (  ) => {
            const listaMoldes = await Servicios.listaMoldes ( idPieza )
            if (  listaMoldes ) {
                if (Array.isArray ( listaMoldes ) ) {
                    listaMoldes.unshift (  { idMolde : '' , nombreMolde : 'NONE' } )
                }
                setIdMolde ( '' )
                setVecMoldes ( listaMoldes )
            }
        }
        getMoldes (  )
    } , [ idPieza ] )
    useEffect ( (  ) => {
        setLoading ( true )
        const getListaOee = async (  ) => {
            const listaOee = await Servicios.listaOeeFundicion (  idMaquina === '' ? null : idMaquina ,
            idPieza === '' ? null : idPieza ,  idMolde === '' ? null : idMolde , fechaFundicionDesde , fechaFundicionHasta  )
            if ( listaOee.vecOeefundicion && Array.isArray ( listaOee.vecOeefundicion )) {
                    var vecP1 = listaOee.vecOeefundicion.filter ( items => items.idPlanta === 1 )
                    var vecP2 = listaOee.vecOeefundicion.filter ( items => items.idPlanta === 2 )
                const unificadorVecP1 = ( vecP1 ) => {
                    if ( idAgrupar === 2 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `${new Moment (e.fechaFundicion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = new Moment (e.fechaFundicion).year()
                        } )
                    }
                    var vecUnificadoP1 = [  ]
                    vecP1.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 1 ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : null ,
                            produccion : 0 ,
                            pmMatrizeria : 0 ,
                            pmMantenimiento : 0 ,
                            pmProduccion : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP1 ) && vecUnificadoP1.length > 0 ) {
                        vecUnificadoP1.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP1
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalrechazosPlanta1 += elem.totalrechazosPlanta1 === null ? 0 : parseInt ( elem.totalrechazosPlanta1 )
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                            })
                            vecUnificadoP1.push ( newItems )
                        }
                    } )
                    return vecUnificadoP1
                }
                const unificadorVecP2 = ( vecP2 ) => {
                    var vecUnificadoP2 = [  ]
                    if ( idAgrupar === 2 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `${new Moment (e.fechaFundicion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = new Moment (e.fechaFundicion).year()
                        } )
                    }
                    vecP2.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 2 ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : items.piezasXhora ,
                            produccion : null ,
                            pmMatrizeria : null ,
                            pmMantenimiento : null ,
                            pmProduccion : null ,
                            totalPNP : null ,
                            pmProgramada : null ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : null ,
                            minTotal : null
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP2 ) && vecUnificadoP2.length > 0 ) {
                        vecUnificadoP2.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP2
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde  ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                            })
                            vecUnificadoP2.push ( newItems )
                        }
                    } )
                    return vecUnificadoP2
                }
                const unificadorP1conP2 = ( vecPlantaUno , vecPlantaDos ) => {
                    var vecFinal = vecPlantaUno
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        vecPlantaUno.forEach ( ( p1 , index ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                vecFinal[index].totalrechazosPlanta2 += p2.totalrechazosPlanta2 === null ? 0 : parseInt ( p2.totalrechazosPlanta2 )
                            }
                        } )
                    } )
                    var vecNoEncontrados =[ ]
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        var elemento = undefined
                        vecPlantaUno.forEach ( ( p1 , indexp1 ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                elemento = p2
                            }
                        } )
                        if ( elemento === undefined ) {
                            if ( p2.totalrechazosPlanta2 > 0 ) {
                                vecNoEncontrados.push ( p2 )
                            }
                        }
                    } )
                    vecFinal = vecFinal.concat ( vecNoEncontrados )
                    return vecFinal
                }
                var vecP1MasvecP2 = unificadorP1conP2 ( unificadorVecP1( vecP1 ) , unificadorVecP2( vecP2 ) )
                var vecFechas = [  ]
                vecP1MasvecP2.forEach ( ( el , i ) => {
                    var fechaEncontrada = false
                    vecFechas.forEach ( ( f , index ) => {
                        if ( f === el.fechaFundicion ) {
                            fechaEncontrada = true
                            return
                        }
                    } )
                    if ( fechaEncontrada === false ) {
                        vecFechas.push ( el.fechaFundicion )
                    }
                } )
                var vecFinal = [  ]
                vecFechas.sort (  )
                vecFechas.forEach ( ( e , i ) => {
                    var ele = {
                        fecha : idAgrupar === 1 ? new Moment ( e ).add( 1 , 'd' ) .format ( 'DD/MM/YYYY' ) : e ,
                        minTotal : 0 ,
                        pmProgramada : 0 ,
                        totalPNP : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecP1MasvecP2.forEach ( ( elementos , ind ) => {
                        if ( e === elementos.fechaFundicion ) {
                            if ( elementos.idPlanta === 1 ) {
                                ele.minTotal += elementos.minTotal === null ? 0 : parseInt ( elementos.minTotal )
                                ele.pmProgramada += elementos.pmProgramada === null ? 0 : parseInt ( elementos.pmProgramada )
                                ele.totalPNP += elementos.totalPNP === null ? 0 : parseInt ( elementos.totalPNP )
                                ele.minNoCalidad += ele.minNoCalidad === null ? 0 : ( parseInt ( elementos.totalrechazosPlanta2 ) + parseInt ( elementos.totalrechazosPlanta1 ) ) * 60 / parseInt ( elementos.piezasXhora )
                                ele.minPorPiezaProducidas += ele.minPorPiezaProducidas === null ? 0 : ( parseInt ( elementos.produccion ) * 60 / parseInt ( elementos.piezasXhora ) )
                            }
                            else if ( elementos.idPlanta === 2 ) {
                                ele.minNoCalidad += ele.minNoCalidad === null ? 0 : ( parseInt ( elementos.totalrechazosPlanta2 ) ) * 60 / parseInt ( elementos.piezasXhora )
                            }
                        }
                    } )
                    vecFinal.push ( ele )
                } )
                if ( vecFinal.length > 0 ) {
                    var ele = {
                        fecha : 'Acumulado' ,
                        minTotal : 0 ,
                        pmProgramada : 0 ,
                        totalPNP : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecFinal.forEach ( ( dato , indexDatos ) => {
                        ele.minTotal += dato.minTotal
                        ele.pmProgramada += dato.pmProgramada
                        ele.totalPNP += dato.totalPNP
                        ele.minNoCalidad += dato.minNoCalidad
                        ele.minPorPiezaProducidas += dato.minPorPiezaProducidas
                    } )
                    vecFinal.push ( ele )
                }
                var vecFech = [  ]
                var vecD = [  ]
                var vecR = [  ]
                var vecQ = [  ]
                var vecOEE = [  ]
                var vecColoress = [  ]
                var vecObjetivoMinn = [  ]
                var vecObjetivoMaxx = [  ]
                vecFinal.forEach ( ( e , i ) => {
                    var dato =  ( ( ( e.minTotal - e.pmProgramada - e.totalPNP) / (e.minTotal - e.pmProgramada)) *
                    (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP ) ) *
                    ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
                        vecFech.push ( e.fecha )
                        vecD.push ( isNaN ( ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) ) ? 0 :  ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) )
                        vecR.push ( isNaN ( (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) ) ? 0 : (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) )
                        vecQ.push ( isNaN ( ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) ) ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100) === - Infinity ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) )
                        vecOEE .push ( isNaN ( dato ) ? 0 : dato )
                        vecObjetivoMinn.push ( 50 )
                        vecObjetivoMaxx.push ( 70 )
                        vecColoress.push ( i === vecFinal.length -1 ? 'grey' : 'rgb(55, 49, 138)' )
                } )
                setVecFechass ( vecFech )
                setVecDis ( vecD )
                setVecRen ( vecR )
                setVecQal ( vecQ )
                setVecOee ( vecOEE )
                setVecColores ( vecColoress )
                setVecObjetivoMin ( vecObjetivoMinn )
                setVecObjetivoMax ( vecObjetivoMaxx )
                setLoading ( false )
            }
        }
        getListaOee (  )
    }  , [ fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza ,  idMolde , idAgrupar ]  )
    const vecAgrupar = [
        { idAgrupar : 1 , nombreAgrupar : 'DIA'} ,
        { idAgrupar : 2 , nombreAgrupar : 'SEMANA'} ,
        { idAgrupar : 3 , nombreAgrupar : 'MES'} ,
        { idAgrupar : 4 , nombreAgrupar : 'AÑO'} ,
    ]

    const data = {
        labels : vecFechass ,
        datasets : [
            {
                datalabels: {
                    color: 'black' ,
                    display : false
                } ,
                pointRadius: 1,
                pointHitRadius: 10,
                label : 'Objetivo Min' ,
                data :  vecObjetivoMin ,
                type : 'line' ,
                fill : false ,
                backgroundColor : '#17202A' ,
                borderColor : '#17202A' ,
                yAxisID : 'escalaIzquierda'
            } ,
            {
                datalabels: {
                    color: 'black' ,
                    display : false
                } ,
                pointRadius: 1,
                pointHitRadius: 10,
                label : 'Objetivo Max' ,
                data :  vecObjetivoMax ,
                type : 'line' ,
                fill : false ,
                backgroundColor : '#17202A' ,
                borderColor : '#17202A' ,
                yAxisID : 'escalaIzquierda'
            } ,
            {
                datalabels: {
                    color: 'black' ,
                    display : true
                } ,
                label : 'Disponibilidad' ,
                data :  vecDis ,
                type : 'line' ,
                fill : false ,
                backgroundColor : 'blue' ,
                borderColor : 'blue' ,
                yAxisID : 'escalaIzquierda'
            } ,
            {
                datalabels: {
                    color: 'black' ,
                    display : true
                } ,
                label : 'Rendimiento' ,
                data :  vecRen ,
                type : 'line' ,
                fill : false ,
                backgroundColor : '#C42722' ,
                borderColor : '#C42722' ,
                yAxisID : 'escalaIzquierda'
            } ,
            {
                datalabels: {
                    color: 'black' ,
                    display : true ,
                } ,
                label : 'Calidad' ,
                data :  vecQal ,
                type : 'line' ,
                fill : false ,
                backgroundColor : '#34CC32' ,
                borderColor : '#34CC32' ,
                yAxisID : 'escalaIzquierda'
            } ,
            {
                datalabels: {
                    color: 'white' ,
                    display : true ,
                    font : {
                        size : 16
                    }
                } ,
                type : 'bar' ,
                label : 'OEE' ,
                data :  vecOee ,
                backgroundColor : vecColores ,
                fill :  false ,
                yAxisID : 'escalaIzquierda' ,
                pointBackgroundColor: vecColores,
                hoverBackgroundColor: vecColores,
                borderWidth: 3,
                hoverBorderColor: vecColores,
            }
        ]
    }
    const option = {
        onClick : clickHandler ,
        plugins: {
            datalabels : {
                color : 'black' ,
                display : false
            }
        } ,
        title : {
            text : 'OEE fundicion' ,
            display : true ,
            fontSize : 30
        } ,
        legend: {
            display: true,
            position : 'bottom' ,
            labels: {
                padding : 30 ,
                fontColor: 'black'
            }
        } ,
        responsive : true ,
        tooltips : {
            mode : 'label'
        } ,
        elements : {
            line : {
                tension : 0 ,
                cubicInterpolationMode : 'default' ,
                fill : false
            } ,
            point : {
                radius : 3
            }
        },
        scales : {
            xAxes : [
                {
                    display : true ,
                    ticks: {
                        // max: 5,
                        // min: 0,
                        stepSize: 4
                    } ,
                    gridLines : {
                        display : false
                    }
                }
            ] ,
            yAxes : [
                {
                    type : 'linear' ,
                    display : true ,
                    position : 'left' ,
                    id : 'escalaIzquierda' ,
                    gridLines : {
                        display : true
                    } ,
                    labels : {
                        show : true
                    } ,
                    ticks : {
                        min : 0
                    }
                } ,
                // {
                //     type : 'linear' ,
                //     display : true ,
                //     position : 'right' ,
                //     id : 'idProduccion' ,
                //     gridLines : {
                //         display : false
                //     }
                // }
            ]
        }
    }
    // const plugins = [
    //     {
    //         afterDraw: (chartInstance , easing) => {
    //             const ctx = chartInstance.chart.ctx
    //             ctx.fillText ( "This text drawn by a plugin" , 1000 , 100 )
    //         }
    //     }
    // ];
    const plugins = [
        {
            ChartDataLabels
        }
    ]

    function clickHandler(evt) {
        var firstPoint = grafico.current.chartInstance.getElementAtEvent(evt)[0];
    
        if (firstPoint) {
            var label = grafico.current.chartInstance.data.labels[firstPoint._index];
            var value = grafico.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            console.log ( value , label )
        }
    }
    return (
        <div>
            {/* <Typography variant = 'h3' >Grafico OEE Fundicion</Typography> */}
            <div>
                <MyComponent.fecha id = 'fechaDesdeGraf' label = 'Fecha Fundicion Desde' value = { fechaFundicionDesde } onChange = { e => setFechaFundicionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaHastaGraf' label = 'Fecha Fundicion Hasta' value = { fechaFundicionHasta } onChange = { e => setFechaFundicionHasta ( e ) } />
                <MyComponent.listaDesplegable label = 'Maquina' value = { idMaquina } onChange = { e => setIdMaquina ( e.target.value ) } array = { vecMaquinas } member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } } />
                <MyComponent.listaDesplegable label = 'Pieza' value = { idPieza } onChange = { e => setIdPieza ( e.target.value ) } array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } } />
                <MyComponent.listaDesplegable label = 'Molde' value = { idMolde } onChange = { e => setIdMolde ( e.target.value ) } array = { vecMoldes } member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } } />
                <MyComponent.listaDesplegable label = 'Agrupar' value = { idAgrupar } onChange = { e => setIdAgrupar ( e.target.value ) } array = { vecAgrupar } member = { { valueMember : 'idAgrupar' , displayMember : 'nombreAgrupar' } } />
            </div>
            {
                loading ?
                    <Loading/>
                    :
                    <div className = 'containerGraf' >
                        <Bar
                            ref = { grafico }
                            data = { data }
                            width = {100}
                            height = {50}
                            options = { option }
                            plugins = { plugins }
                        />
                    </div>
            }
        </div>
    )
}
export default GraficoOeeFun