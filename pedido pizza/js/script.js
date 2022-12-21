let modalQt = 1

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