class View {
    constructor() {}
    addImage(src, id) {
        let gallery = document.getElementById('gallery');
        let img = document.createElement('img');
        let li = document.createElement('li');
        li.id = id;
        img.loading = 'lazy';
        img.src = src;
        li.appendChild(img);
        gallery.appendChild(li);
    }
    fillModal(response) {
        let content = document.getElementById('modal_content');
        Object.entries(response).map(entry => {
            let key = entry[0];
            let value = entry[1];
            if (typeof value !== 'object') {
                let div = document.createElement('div');
                let keySpan = document.createElement('span');
                let valueSpan = document.createElement('span');
                keySpan.innerHTML = key + ':';
                valueSpan.innerHTML = value;
                div.appendChild(keySpan);
                div.appendChild(valueSpan);
                div.className = 'space-between_container';
                content.appendChild(div);
            }
        });
    }
    toggleModal() {
        let style = document.getElementById('myModal').style.display;
        style === 'none' ?
            document.getElementById('myModal').style.display = 'block' :
            document.getElementById('myModal').style.display = 'none'
    }
    setTitle(title) {
        document.getElementById('title').innerHTML=title;
    }
    setScroll() {
        let y = localStorage.getItem('scrollY') || 0
        setTimeout(function ()  {
        window.scrollTo(0, y)
        }, 100)
    }
}
