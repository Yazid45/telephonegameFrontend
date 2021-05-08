class Post{
    constructor(message, sanad, id){
        this.message = message
        this.sanad = sanad
        this.size = sanad.length
        this.id = id
    }

}

let create_post = new Post('Press the Create Button', ['The Server'],0)
let quote_post = new Post('Press the quote Button', ['The Server'],1)

let database = [create_post, quote_post]

Post.biggest = 0;
Post.biggestId =0;

Post.getRandom = () => {
    return database[Math.floor(Math.random() * database.length)]
}
Post.find = (id) =>{
    return database.find((p)=> p.id == id)
}

Post.nextId = 2

Post.create = (message, sanad) => {
    let result = new Post(message, sanad, Post.nextId)
    database.push(result)

    Post.update(result)

    Post.nextId += 1

    return result
}
Post.getBiggest = ()=>{
    return Post.find(Post.biggestId)
}

Post.update = (post) =>{
    if(post.size >= Post.biggest){
        Post.biggest = post.size
        Post.biggestId = post.id
    }
}
Post.delete = (id) =>{
    database =database.filter((p) => p.id != id)
}


module.exports = Post