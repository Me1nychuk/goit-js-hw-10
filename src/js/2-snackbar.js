const form = document.querySelector('.form');
const delayInput = form.elements['delay'];
const statedRadio = form.elements['state'];
const submitBtn = form.elements['submit'];




form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const delay = +delayInput.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (statedRadio.value === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
            
        }, delay)
    });
    
    promise.then(value => {
        iziToast.success({
        title: 'OK',
        position:'topRight',
        message: value,
        })
    }).catch(value => {
        iziToast.error({
        title: 'Error',
        position:'topRight',
        message: value,
    });
    })

})

