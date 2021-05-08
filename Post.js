
import {port} from './index'

export class Post{
    constructor(message, sanad){
        this.sanad = sanad
        this.message = message
    }

    getSanad(){
        if(this.sanad.length == 0)
            return ''
        let ids = []
        this.sanad.forEach((elt)=> ids.push(elt))
        let sanad_string = ids.shift()
        ids.forEach((id) => sanad_string = sanad_string + ' who told '  + id)
        sanad_string = sanad_string + ' has said: '

        return sanad_string
    }

    
    getHTMLForm(id){
        let sanad_div = document.createElement('div')
        sanad_div.className = 'post'


        let sanad = document.createElement('p')
        sanad.className = 'sanad'
        sanad.innerText= this.getSanad()

        sanad_div.append(sanad)


        let post_div = document.createElement('form')
        post_div.className = 'post_form post'

        let saying = document.createElement('textarea')
        saying.className = 'saying'
        saying.innerText = this.message
        saying.id= 'newsay'
        saying.setAttribute('pid', id)

        post_div.append(saying)

        sanad_div.append(post_div)

        let submit_button = document.createElement('button')
        submit_button.innerHTML = 'say it to somebody'
        submit_button.id = 'submit_button'

        sanad_div.append(submit_button)

        return sanad_div
    }
    getHTML(){
        let sanad_div = document.createElement('div')
        sanad_div.className = 'post'


        let sanad = document.createElement('p')
        sanad.className = 'sanad'
        sanad.innerText= this.getSanad()

        sanad_div.append(sanad)


        let post_div = document.createElement('div')
        post_div.className = 'post'

        let saying = document.createElement('p')
        saying.className = 'saying'
        saying.innerText = this.message

        post_div.append(saying)

        sanad_div.append(post_div)
        return sanad_div
    }



}

Post.getBig = async ()=>{
    let post = await axios({
        method: 'get',
        url: 'http://localhost:'+port+'/posts/big'
    })
    
    return new Post(post.data.message, post.data.sanad)
}
Post.get = async () =>{
    let result = await $.ajax('http://localhost:'+port+'/posts',{
        type: "GET",
        dataType: "json"
    })

    let post = new Post(result.message, result.sanad)
    post.id = result.id
    return post
}
Post.send = async (id, m, u)=>{


    if(id == 0){
        let data_string = JSON.stringify({
            message: m,
            sanad: [u]
        })
        await $.ajax("http://localhost:"+port+"/posts",
        {
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: data_string
        });
    }else if (id == 1){
        let data_string = JSON.stringify({
            message: m,
            sanad: u
        })
        await $.ajax('http://localhost:'+port+'/posts',
        {
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: data_string
        });
    }
    else{
        let data_string = JSON.stringify({
            message: m,
            user: u
        })
        await $.ajax('http://localhost:'+port+'posts/'+id,
        {
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: data_string
        });
    }
}