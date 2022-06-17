import service from "../../services/service.js"

export default{
    data(){
        return {
            korisnici:[],
            api_path:"/api/pod-forum",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                ],
                edit_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem("token")){
        service.findAll('/api/korisnik').then(response=>{
            this.korisnici = response.data;
        })
    }
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Pod-Forum</h2>
        <genericka-forma :rows="korisnici" :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></genericka-forma>
    `
}