import service from "../../services/service.js"

export default{
    data(){
        return {
            objave:[],
            api_path:"/api/komentar",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"opis","title":"Opis","type":"textarea"},
                    {"key":"objava_id","title":"Objava","type":"select","id":"objava_id","value":"naslov"},
                ],
                edit_columns:[
                    {"key":"opis","title":"Opis","type":"textarea"}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem("token")){
        service.findAll("/api/objava").then(response=>{
            this.objave = response.data;
        })
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Komentar</h2>
        <genericka-forma :rows="objave" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :api_path="api_path" :metadata="metadata"></genericka-forma>
    `
}