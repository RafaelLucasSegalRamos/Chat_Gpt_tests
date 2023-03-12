var lista = [1,2,3,4,5,10,90,78,105,6,1, 901]
mn = lista[0]
var tela = document.querySelector('div.tela')
var p = document.createElement('p')

function calcula()
{
    
    for (let c = 0; c<= lista.length; c++)
    {
        if (lista[c] > mn)
        {
            mn = lista[c]
        }
    }

    p.innerText = `O maior número desta lista é ${mn}`
        
    tela.appendChild(p)
}


