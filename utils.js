function WingWaitElement(sel, cb) {
    let t = setInterval(() => {
        let dom = $(sel)
        if (dom.length) {
            clearInterval(t)
            cb(dom)
        }
    }, 300)
}