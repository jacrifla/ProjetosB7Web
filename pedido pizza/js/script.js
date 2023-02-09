let modalQt = 1
let cart = []
let modalKey = 0

// Criou uma constante pra nao ficar digitando toda hora docu....
const qs = (el) => document.querySelector(el)
const qsA = (el) => document.querySelectorAll(el)


pizzaJson.map((item, index) =>{
    /*
    console.log(item); // Para ver todos os array
    console.log(index); // Ver nos números dos arrays
    */
    let pizzaItem = qs('.models .pizza-item').cloneNode(true)
    pizzaItem.setAttribute('data-key', index)

    // Preencher as informaçoes das pizzas
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    // Evento para a pag não ficar recarregando
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1 // sempre q o modal abrir vai ser 1
        modalKey = key
        /*
        console.log('Pizza clicada: ' + key); // ver c esta funfando a key
        console.log(pizzaJson[key]); // Ver as info das pizzas de acordo com a key
        */

        // Preencher as info do modal
        qs('.pizzaBig img').src = pizzaJson[key].img
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        qs('.pizzaInfo--size.selected').classList.remove('selected')

        // Achar os tamanhos da pizza
        qsA('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        })

        qs('.pizzaInfo--qt').innerHTML = modalQt

        qs('.pizzaWindowArea').style.opacity = 0 // não aparecer
        qs('.pizzaWindowArea').style.display = 'flex' // mudando o display
        
        // Para o modal não aparecer de uma vez
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1
        }, 100) 
    })

    qs('.pizza-area').append(pizzaItem)
})

// evento modal

function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none'
    }, 500) 
}

qsA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) =>{
    item.addEventListener('click', closeModal)
})

qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1){
        modalQt--
        qs('.pizzaInfo--qt').innerHTML = modalQt    
    }
})
qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    qs('.pizzaInfo--qt').innerHTML = modalQt

})
qsA('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e) => {
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })

})
qs('.pizzaInfo--addButton').addEventListener('click', () => {
    /*// qual a pizza?
    console.log('Pizza: ' + modalKey);*/
    /*// qual o tamanho?
    console.log('Tamanho: ' + size);*/
    /*// quantas pizza?
    console.log('Quantidade: ' + modalQt);*/

    let size =  parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = pizzaJson[modalKey].id + '@' + size
    let key = cart.findIndex((item) => item.identifier == identifier)
    if (key > -1){
        cart[key].qt += modalQt
    } else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        })
    }
    updateCart()
    closeModal()
})
qs('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0){
        qs('aside').style.left = '0'
    }
})
qs('.menu-closer').addEventListener('click', () =>{
    qs('aside').style.left = '100vw'
})

function updateCart() {
    qs('.menu-openner span').innerHTML = cart.length
    if (cart.length > 0){
        qs('aside').classList.add('show')
        qs('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart ){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qt
            let cartItem = qs('.models .cart--item').cloneNode(true)
            let pizzaSizeName
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
                cart[i].qt++
                updateCart()
            })
            qs('.cart').append(cartItem)
            desconto = subtotal * 0.1
            total = subtotal - desconto

            qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
            qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
            qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        }
    } else {
        qs('aside').classList.remove('show')
        qs('aside').style.left = '100vw'

    }
}