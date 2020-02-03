window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements      //Elements是个数组
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }

    function createElement(string) {
        let container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    return api
}

jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return this.elements[index]
    },
    print() {
        console.log(this.elements)
        return this
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    find(selector) {
        let array = []
        this.each(el => {
            array = array.concat(Array.from(el.querySelectorAll(selector)))
        })
        array.oldApi = this    //this是旧的api
        return jQuery(array)
    },
    end() {
        return this.oldApi       // this是新的api
    },
    parent() {
        let array = []
        this.each((el) => {
            if (array.indexOf(el.parentElement) === -1) {
                array.push(el.parentElement)
            }
        })
        return jQuery(array)
    },
    children() {
        let array = []
        this.each((el) => {
            if (array.indexOf(el.children === -1)) {
                array.push(...el.children)
            }
        })
        return jQuery(array)
    },
    sibling() {
        let array = []
        let x = this.elements[0].parentElement.children
        this.each((el) => {
            if (el !== this.get(0)) {
                array.push(el)
            }
        })
        return jQuery(array)
    },
    addClass(className) {
        this.each((el) => {
            el.classList.add(className)
        })
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each((node) => {
                this.get(0).appendChild(node)
            })
        }
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each((el) => {
                el.appendChild(node)
            })
        } else if (node.jquery === true) {
            this.each((el) => {
                node.get(0).appendChild(el)
            })
        }
    },
    remove(selector) {
        let x = this.get(0).querySelectorAll(selector)
        for (let i = 0; i < x.length; i++) {
            this.get(0).removeChild(x[i])
        }
        return this
    },
}