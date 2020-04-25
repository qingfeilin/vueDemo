import uuidv1 from 'uuid/v1' 
const simpleLine = {
    getNewConfig: () => {
        let containerId = uuidv1()
        return {
            id: containerId,
            styleOption: {
                width: '400px',
                height: '200px',
                left: '500px',
                top: '300px'
            },
            component: {
                type: 'simpleLine',
                options: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                    }
            }
        }
    }
  }
  export default simpleLine
