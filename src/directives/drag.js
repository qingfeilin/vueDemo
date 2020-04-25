const drag = {
    // 指令的定义
    bind: function (el, binding) {
        const odiv = el // 获取当前元素
        const callback = binding.value.callback
        odiv.onmousedown = (e) => {
            // 算出鼠标相对元素的位置
            const disX = e.clientX - odiv.offsetLeft
            const disY = e.clientY - odiv.offsetTop

            document.onmousemove = (e) => {
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                const left = e.clientX - disX
                const top = e.clientY - disY

                // 绑定元素位置到positionX和positionY上面
                if (typeof callback === 'function') {
                    callback(top, left)
                }
                // this.positionX = top
                // this.positionY = left

                // // 移动当前元素
                // odiv.style.left = left + 'px'
                // odiv.style.top = top + 'px'
            }
            document.onmouseup = (e) => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
const cresize = {
    // 指令的定义
    bind: function (el, binding) {
        const odiv = el // 获取当前元素
        const callback = binding.value.callback
        odiv.onmousedown = (e) => {
            if (e && e.stopPropagation) { e.stopPropagation() } else { window.event.cancelBubble = true }
            // 算出鼠标相对元素的位置
            // const disX = e.clientX - odiv.offsetLeft
            // const disY = e.clientY - odiv.offsetTop
            let startX = e.clientX
            let startY = e.clientY
            // let timeout = null
            document.onmousemove = (e) => {
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                // if (timeout) {
                //     window.clearTimeout(timeout)
                // }
                // timeout = window.setTimeout(() => {
                // console.log('start', startX, startY)
                // console.log('end', e.clientX, e.clientY)
                const width = e.clientX - startX
                const height = e.clientY - startY
                // 绑定元素位置到positionX和positionY上面
                if (typeof callback === 'function') {
                    callback(width, height)
                }
                startX = e.clientX
                startY = e.clientY
                // }, 0)
                // this.positionX = top
                // this.positionY = left

                // // 移动当前元素
                // odiv.style.left = left + 'px'
                // odiv.style.top = top + 'px'
            }
            // document.onmouseout = (e) => {
            //     document.onmousemove = null
            //     document.onmouseup = null
            // }
            document.onmouseup = (e) => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
export { drag, cresize }
