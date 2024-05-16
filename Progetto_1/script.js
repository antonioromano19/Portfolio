function scrollToElements(ElementSelector, instance = 0) {
    
    //Seleziono tutti gli elementi che corrispondono al selettore specificato

    let elements = document.querySelectorAll(ElementSelector);

//Controllo se ci sono elementi che corrispondono al selettore e se esiste l'esempio richiesto

if (elements.length > instance){
    
    //scrollo dello specifico esempio nel elemento
    
    elements[instance].scrollIntoView( { behavior: 'smooth' } );

    }
}

let link1 = document.getElementById("link1");
let link2 = document.getElementById("link2");
let link3 = document.getElementById("link3");

link1.addEventListener('click', () =>{
    scrollToElements('.header');
});

link2.addEventListener('click', () =>{
    //Scrollo nel secondo elemento con "header" class.
    scrollToElements('.header',1);
});

link3.addEventListener('click', () =>{
    scrollToElements('.column');
});
