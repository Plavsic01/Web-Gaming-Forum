import service from "../../services/service.js"

export default{
    data(){
        return {
            korisnici:[],
            api_path:"/api/korisnik",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"korisnicko_ime","title":"Korisnicko ime","type":"text"},
                    {"key":"email","title":"Email","type":"email"},
                    {"key":"lozinka","title":"Lozinka","type":"password"} 
                ],
                edit_columns:[
                    {"key":"korisnicko_ime","title":"Korisnicko ime","type":"text"},
                    {"key":"email","title":"Email","type":"email"},
                    {"key":"lozinka","title":"Lozinka","type":"password"}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem("token")){
        service.findAll(this.api_path).then(response=>{
            this.korisnici = response.data;
        })
    }
    },
    methods:{
        
    },
    template:`
        <br>
        <h2 style="text-align:center">Izmeni Korisnika</h2>
        <genericka-forma :rows="korisnici" :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></genericka-forma>
    `
}