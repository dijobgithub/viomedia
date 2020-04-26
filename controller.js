class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.checkLocalStorage()
        this.addEventListeners()
        document.getElementById('title').innerHTML = this.model.currentPage
    }
    async click(linkTo, id) {
        switch (linkTo) {
            case 'Images':
                document.getElementById('title').innerHTML = "Images";
                document.getElementById('gallery').innerHTML = '';
                this.model.setData(id, "Images");
                this.fetch();
                break;
            case 'Collections':
                document.getElementById('title').innerHTML = "Collections";
                document.getElementById('gallery').innerHTML = '';
                this.model.setData(id, "Collections");
                this.fetch();
                break; 
            case 'Modal':
                this.model.setData(id, "Modal");
                let response = await this.model.fetchData();
                this.view.fillModal(response);
                this.view.toggleModal();
                break
             case 'More':
                this.model.numPages++;
                this.fetch();
        }
    }
    async fetch() {
        let _this = this;
        //ссылка для click в зависимости от текущей вкладки. 
        //Для коллекций - переход к фотография, для фото - открытие modal окна 
        let link  = this.model.getLink();

        //Подрузка фотографий по страницам (по 10 штук)
        for (let i=1; i<=this.model.numPages; i++)  {
            //пропускаем если страница уже загружена 
             if (this.model.downloadedPages.includes(i))   {continue}   

        let response = await this.model.fetchData(i);
        let urls = this.model.getURLs(response);
        let ids = this.model.getIDs(response);

        urls.map(function (img, index) {
            _this.view.addImage(img, ids[index])
            //пролистывание вниз при перезагрузке
            if (i == _this.model.numPages&&index==urls.length-1)  {
                _this.view.setScroll()
            }
        })

        ids.map((id)=>document.getElementById(id).onclick = () => _this.click(link, id));
        }
     this.model.saveInLocalstorage()
    }
    addEventListeners() {
        let _this = this 
        document.addEventListener('scroll', () => localStorage.setItem('scrollY', window.pageYOffset));
        document.getElementById('close_btn').onclick = this.view.toggleModal;
        document.getElementById('return_btn').onclick =  ()=> _this.click('Collections');
        document.getElementById('add_btn').onclick = ()=> _this.click('More');
    }
}
