import uuidv1 from 'uuid/v1' 
const simplePie = {
    getNewConfig: () => {
        let containerId = uuidv1()
        return {
            id: containerId,
            styleOption: {
                width: '400px',
                height: '200px',
                left: '900px',
                top: '300px'
            },
            component: {
                type: 'simplePie',
                options: {
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'pie'
                    }]
                    }
            }
        }
    }
  }
  export default simplePie
