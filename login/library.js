class Method{


    async postLogin(url, body){

        let response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })

        let data = await response.json()

        return data
    }

}
