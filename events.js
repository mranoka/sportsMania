$(function() {
    let cache = [];
    let images_cache = [];
    let numElem = [];
    let menuSentinel = 0;
    let socialSent = 0;

    const prodObj = {
        'golf': 899,
        'mtb': 16999,
        'bottle': 99,
        'shorts': 599,
        'dumbell': 259,
        'firstaid': 1599,
        'shoe': 899,
        'ball': 359,
        'boot': 899,
        'watch': 290,
        'eyewear': 299,
        'racket': 789
    }

    const imgObj = {
        'golf': 'images2/Best-Golf-Clubs.png',
        'mtb': 'images2/bike.jpeg',
        'bottle': 'images2/bottle.jpeg',
        'shorts': 'images2/cycleshorts.jpg',
        'dumbell': 'images2/dumbell.jpeg',
        'firstaid': 'images2/firstaid.jpeg',
        'shoe': 'images2/runningshoe.jpeg',
        'ball': 'images2/soccerball.jpeg',
        'boot': 'images2/soccerboot.jpeg',
        'watch': 'images2/stopwatch.jpeg',
        'eyewear': 'images2/sunglass.jpeg',
        'racket': 'images2/tennisracket.jpeg'
    }

    // toggles drop down menu in mobile version of store
    $('#nav-list-menu').hide(); // hide menu when page loads
    $('#boton').on('click', () => {
        $('#nav-list-menu').show(); 
        if (menuSentinel === 0) {
            menuSentinel = 1;
           $('#nav-list-menu').show(); 
        } else if (menuSentinel === 1) {
             menuSentinel = 0;
            $('#nav-list-menu').hide();    
        }
        
    })

    // hides collection and delivery options forms when page loads
    $('#collection-form').hide()
    $('#delivery-form').hide()

    // displays only collection details form when collection option is chosen
    $('#collect-option').on('click', () => {
        $('#delivery-form').hide()
        $('#collection-form').show()
    })
    // displays only delivery details form when collection option is chosen
    $('#deliver-option').on('click', () => {
        $('#collection-form').hide()
        $('#delivery-form').show()

    })

    // reduces total price by 10% if coupon code is entered
    $('#disc-code').one('click', () => {
        let elem = document.getElementById('disc-entry').value;
        let tot = document.getElementById('total-disp').textContent
        if (elem == 'deadmeat55') {
            let disc = parseInt(tot) * 0.1
            let diff = parseInt(tot) - disc;
            document.getElementById('total-disp').innerHTML = diff;

        }
    })

    // applies different charges to different delivery methods
    // adds applied charges to total charge
    $('#snail-mail').one('click', () => {
        let tot = document.getElementById('total-disp').textContent
        let diff = parseInt(tot) + 50;
        document.getElementById('total-disp').innerHTML = diff;
    })
    $('#fast-mail').one('click', () => {
        let tot = document.getElementById('total-disp').textContent
        let diff = parseInt(tot) + 200;
        document.getElementById('total-disp').innerHTML = diff;
    })
    $('#courier').one('click', () => {
        let tot = document.getElementById('total-disp').textContent
        let diff = parseInt(tot) + 150;
        document.getElementById('total-disp').innerHTML = diff;
    })

    // dispays the number of items in cart next to cart icon
    let cartItem = () => {
        let cartElem = document.getElementById('cart-icon')
        let numElem = JSON.parse(sessionStorage.getItem('cartItems'))
        let som = numElem.reduce((tot, val) => {
            tot += val;
            return tot
        }, 0)
        cartElem.innerHTML = som;

    }
    // displays drop down menu when social media header is clicked
    $('.drop-social').hide();
    $('#media-drop-down').on('click', () => {
        if (socialSent === 0) {
            socialSent = 1;
            $('.drop-social').show();  
        } else if (socialSent === 1) {
             socialSent = 0;
             $('.drop-social').hide();     
        }
    })

    // alerts user that order was successful and generates reference number
    // also animates screen by changing background color and heading sizes
    $('#order-button').one('click', () => {
        $('h3').animate({ fontSize: '80px' }, 3000)
        $('h3').animate({ fontSize: '1.78em' }, 200)
        $('#cart-body')
            .slideUp(1000, () => {
                $('main').css('background-color', 'hsl(31, 100%, 65%)')
            })
            .slideDown(1000, () => {
                $('main').css({ backgroundColor: 'hsl(0, 100%, 60%)' })
            })
            .slideUp(1000, () => {
                $('main').css({ backgroundColor: 'hsl(60, 100%, 85%)' })
            })
            .slideDown(1000, () => {
                $('main').css({ backgroundColor: 'hsl(120, 100%, 80%)' })
            })
            .slideUp(1000, () => {
                $('main').css({ backgroundColor: 'hsl(0, 0%, 80%)' })
            })
            .slideDown(1000, () => {
                $('main').css({ backgroundColor: 'hsl(0, 0%, 90%)' })
            })

        let num1 = parseInt(Math.random() * 10)
        let num2 = parseInt(Math.random() * 10)
        let num3 = parseInt(Math.random() * 10)
        let num4 = parseInt(Math.random() * 10)
        let num5 = parseInt(Math.random() * 10)
        let num6 = parseInt(Math.random() * 10)

        alert('CONGRATULATIONS!\n YOUR ORDER WAS SUCCESSFUL \n YOUR REFERENCE NUMBER IS: ' + num1 + num2 + num3 + ' ' + num4 + num5 + num6)
    })

    // displays alert with total cart value when user adds item to cart
    // adds selected items to sessionStorage memory for retrival and use by other functions
    $('.cat-page').on('click', (e) => {
        let selectedItem = e.target.id;
        cache.push(prodObj[selectedItem]);
        images_cache.push(imgObj[selectedItem])
        numElem.push(1)
        sessionStorage.setItem('images', JSON.stringify(images_cache))
        sessionStorage.setItem('prices', JSON.stringify(cache))
        sessionStorage.setItem('cartItems', JSON.stringify(numElem))
        let sum = cache.reduce((tot, val) => {
            tot += val;
            return tot
        }, 0)
        cartItem()
        alert(`THANK YOU FOR SHOPPING WITH US \n YOUR CART VALUE IS: R${sum}`)
    })

    // when cart pages loads, this function populates its order summary
    // section with items that were added to cart
    let orderSummary = () => {
        let images_cache = JSON.parse(sessionStorage.getItem('images'))
        let cache = JSON.parse(sessionStorage.getItem('prices'))
        for (let i = 0; i < images_cache.length; i++) {
            let elem = document.getElementById('order-sum')
            let image = document.createElement('img')
            image.src = images_cache[i];
            image.width = 100;
            image.alt = cache[i].toString()
            elem.appendChild(image)
        }
        let som = cache.reduce((tot, val) => {
            tot += val;
            return tot
        }, 0)

        document.getElementById('total-disp').innerHTML = som;
        return som
    }
    // creates and animates(accordion effect) drop-down menu when each section is hovered over
    orderSummary()
    cartItem()
})
