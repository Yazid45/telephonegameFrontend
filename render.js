import './Post.js'
import { Post } from './Post.js'

export async function topWindow(){
    let window = document.createElement('div')
    window.className = 'community window'

    let header = document.createElement('div')
    header.className = 'header'
    header.append('The next person')
    window.append(header)

    let post = await Post.getBig()
    window.append(post.getHTML())

    



    return window
}

export async function controlWindow(){
    let window = document.createElement('div')
    window.className = 'court window'

    let header = document.createElement('div')
    header.className = 'header'
    header.append('Stuff')
    window.append(header)

    let buttons = document.createElement('div')
    buttons.className = 'control'

    let get_button = document.createElement('button')
    get_button.innerText = 'Get a new saying'
    get_button.id = 'get_button'
    buttons.append(get_button)


    let create_button = document.createElement('button')
    create_button.innerText = 'create a saying'
    create_button.id = 'create_button'
    buttons.append(create_button)

    let quote_button = document.createElement('button')
    quote_button.innerHTML = 'Say a random quote'
    quote_button.id = 'quote_button'
    buttons.append(quote_button)

    const xkcd_json = await axios({
        method: 'GET',
        url: 'https://xkcd.vercel.app/?comic=latest',
    })

    let xkcd = xkcd_json.data

    let comic_div = document.createElement('div')
    comic_div.className = 'comic'

    let comic_title = document.createElement('h1')
    comic_title.innerText = xkcd.safe_title
    comic_div.append(comic_title)


    let comic = document.createElement('img')
    comic.src = xkcd.img
    comic_div.append(comic)


    let alt = document.createElement('p')
    alt.innerText = xkcd.alt

    comic_div.append(alt)



    window.append(buttons)
    window.append(comic_div)
    return window

}
export function voterWindow(){
    let window = document.createElement('div')
    window.className = 'voter window'

    let post = new Post('', [$('#root')[0].getAttribute('user')])

    window.append(post.getHTMLForm(0))




    return window
}

export async function handle_submit(){
    let form = $('#newsay')[0]
    let message = form.value
    let user = $('#root')[0].getAttribute('user')
    let id = form.getAttribute('pid')

    if(id == 1){
        let quote = $('#quote_button')[0].getAttribute('author')
        user = [quote, user]
    }

    await Post.send(id, message, user)

    


    render()
}

export async function handle_get(){
    let post = await Post.get()

    let window = $('.voter')
    window.empty()
    window.append(post.getHTMLForm(post.id))
}

export async function handle_create(){
    render()

}
export async function handle_quote(){
    
    let quote = await axios({
        method: 'get',
        url: 'http://api.quotable.io/random'
    })

    let post = new Post(quote.data.content, [quote.data.author])

    let button = $('#quote_button')[0]
    button.setAttribute('author', quote.data.author)
    post.id = 1

    let window = $('.voter')
    window.empty()
    window.append(post.getHTMLForm(post.id))

}
export async function render(post){
    let $root = $('#root')
    $root.empty()

    $root.append(await topWindow())
    $root.append(voterWindow())
    $root.append(await controlWindow())





}
export function handle_login(){
    let userinput =  $('#username')[0].value
    let $root = $('#root')
    $root[0].setAttribute('user', userinput)
   
    
    let empty_post = new Post('', [userinput])
    render(empty_post)
}
export function init(){
    let $root = $('#root')
    $root.empty()

    let login_div = document.createElement('div')
    login_div.className = 'login post'
    
    let label = document.createElement('p')
    label.innerHTML = 'enter your name:'
    login_div.append(label)

    let login_input = document.createElement('textarea')
    login_input.id = 'username'
    login_input.minLength = 5
    login_div.append(login_input)
    

    let login_button = document.createElement('button')
    login_button.id = 'login_button'
    login_button.innerHTML = 'play'
    login_div.append(login_button)

    $root.append(login_div)


    $root.on('click', '#submit_button', handle_submit)
    $root.on('click', '#get_button', handle_get)
    $root.on('click', '#create_button', handle_create)
    $root.on('click', '#quote_button', handle_quote)
    $(login_div).on('click', '#login_button', handle_login)

}

$(function(){
    init();
})