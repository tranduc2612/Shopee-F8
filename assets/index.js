const produceApi = "http://localhost:3000/produces"

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const registerBtn = $('#register');
const registerForm = $('#register-form')
const modal = $('.modal')
const overlay = $('.modal__overlay')
const backBtn = $('.auth-form__controls-back')
const loginBtn = $('#login');
const loginForm = $('#login-form')
const homeFilterBtn = $$(".home-filter__btn")
const categoryItem = $$(".category-item")
const homeProduce = $(".home-product-wrap") 

const app = {
    render: function(dataProduce){
        console.log(dataProduce)
        const htmls =  dataProduce.map(produce=>{
            return `
            <!-- Product item -->
            <div class="col l-2-4 m-4 c-6">
                <a class="home-product-item" href="">
                   <div class="home-product-item__img" style="background-image: url(${produce.urlImg});"></div>
                   <h4 class="home-product-item__name">${produce.name}</h4>
                   
                   
                   <div class="home-product-item__price">
                       <span class="home-product-item__price-old">${produce.oldPrice}</span>
                       <span class="home-product-item__price-current">${produce.currentPrice}</span>
                    </div>

                    <div class="home-product-item__action">
                        <div class="home-product-item__action-like home-product-item__action-like--liked">
                            <i class="home-product-item__action-like--icon-empty far fa-heart"></i>
                            <i class="home-product-item__action-like--icon-fill fas fa-heart"></i>
                        </div>
                        <div class="home-product-item__action-rating">
                            <i class="home-product-item__gold fas fa-star"></i>
                            <i class="home-product-item__gold fas fa-star"></i>
                            <i class="home-product-item__gold fas fa-star"></i>
                            <i class="home-product-item__gold fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>

                        <span class="home-product-item__solded">${produce.solded}</span>
                    </div>

                    <div class="home-product-item__origin">
                        <span class="home-product-item__origin-brand">${produce.originBrand}</span>
                        <span class="home-product-item__origin-name">${produce.originName}</span>
                    </div>

                    <div class="home-product-item__favourite">
                        <i class="home-product-item__favourite-icon fas fa-check"></i>
                        <span>Yêu thích</span>
                    </div>

                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">${produce.saleOffPercent}</span>
                        <span class="home-product-item__sale-off-label">${produce.saleOffLabel}</span>
                    </div>
                </a>
            </div>
            `
        }).join('')

        homeProduce.innerHTML = htmls
    },

    handleEvent:function(){
        registerBtn.addEventListener('click',()=>{
            modal.style.display = "block";
            registerForm.style.display = "inline-block";
        })

        overlay.addEventListener("click",()=>{
            modal.style.display = "none"
            loginForm.style.display = "none"
            registerForm.style.display = "none";
        })

        backBtn.addEventListener("click",()=>{
            modal.style.display = "none"
            loginForm.style.display = "none"
            registerForm.style.display = "none";
        })

        loginBtn.addEventListener("click",()=>{
            modal.style.display = "block";
            loginForm.style.display = "inline-block"
        })
    },

    toggleHome: function(){
        for(var i =0;i<homeFilterBtn.length;i++){
            homeFilterBtn[i].onclick = function(e){
                var filterBtn = e.target;
                for(var j=0;j<homeFilterBtn.length;j++){
                    if(homeFilterBtn[j].className.indexOf("btn--primary")>0){
                        homeFilterBtn[j].classList.remove("btn--primary")
                    }
                }
                filterBtn.classList.add("btn--primary")
            }
        }
    },

    toggleCategory: function(){
        for(var i =0;i<categoryItem.length;i++){
            categoryItem[i].onclick = function(e){
                var categorySelect = e.target;
                for(var j=0;j<categoryItem.length;j++){
                    if(categoryItem[j].className.indexOf("category-item--active")>0){
                        categoryItem[j].classList.remove("category-item--active")
                    }
                }
                categorySelect.classList.add("category-item--active")
            }
        }
    },

    getProduce: function(callback){
        fetch(produceApi)
            .then(function(response){
                return response.json()
            })
            .then(callback)
    },
    start: function(){
        this.getProduce(this.render)

        this.handleEvent()

        this.toggleHome()

        this.toggleCategory()

        this.render()
    }
}

app.start()