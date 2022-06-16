import service from "../../services/service.js"

export default{
    data(){
        return {
            teme:[],
            api_path:"/api/objava/",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"opis","title":"Opis","type":"textarea"},
                    {"key":"tema_id","title":"Tema","type":"select","id":"tema_id","value":"naslov"},
                ],
                edit_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"opis","title":"Opis","type":"textarea"},
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem("token")){
        service.findAll('/api/tema').then(response=>{
            this.teme = response.data;
        })
    }
    },
    methods:{
        
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Objavu</h2>
        <genericka-forma :rows="teme" :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></genericka-forma>
    `
}