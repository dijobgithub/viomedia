class Model {
    constructor() {
        this.downloadedPages= [];
        this.currentPage;
        this.id;
        this.numPages;
    }
    //возвращение на ту же вкладку при перезагрузке 
    checkLocalStorage() {
        this.id = localStorage.getItem('id') || null;
        this.currentPage = localStorage.getItem('currentPage') || "Collections";
        this.numPages = localStorage.getItem('numPages') || 1;
    }
    saveInLocalstorage() {
        localStorage.setItem('currentPage', this.currentPage);
        localStorage.setItem('id', this.id);
        localStorage.setItem('numPages', this.numPages);
    }
    fetchData(page) {
        let url;
        switch (this.currentPage) {
            case 'Collections':
                url = `https://api.unsplash.com/collections/?client_id=BY_gEd0LuSmH6AlEFYHdhINE3Rk8H62HJWJWt39rVUo&&per_page=10&&page=${page}`;
                break;
            case 'Images':
                url = `https://api.unsplash.com/collections/${this.id}/photos?client_id=BY_gEd0LuSmH6AlEFYHdhINE3Rk8H62HJWJWt39rVUo&&page=${page}`;
                break;
            case 'Modal':
                url = `https://api.unsplash.com/photos/${this.id}/?client_id=BY_gEd0LuSmH6AlEFYHdhINE3Rk8H62HJWJWt39rVUo`;
                break;
            default:
                break;
        }
       this.downloadedPages.push(page);
       return fetch(url).then((response) => response.json());
    }
    //при переходе от коллекций к фотографиям и обратно
    setData(id, page) {
        this.id = id;
        this.currentPage = page;
        this.numPages=1;
        this.downloadedPages= []
    }
    getURLs(data) {
        let urls;
        this.currentPage === 'Collections' ?
        urls= data.map(x => x.cover_photo.urls.regular) : urls = data.map(x => x.urls.regular)
        return urls;
    }
    getIDs(data) {
        let ids
        ids = data.map(x => x.id);
        return ids
    }
        //ссылка для click в зависимости от текущей вкладки. 
        //Для коллекций - переход к фотография, для фото - открытие modal окна 
    getLink()   {
        switch (this.currentPage) {
            case "Collections":
                return "Images"
             case "Images":
                 return "Modal"
            default:
                break;
        }
    }
}
