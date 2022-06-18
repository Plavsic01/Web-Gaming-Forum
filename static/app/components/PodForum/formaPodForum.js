import service from "../../services/service.js"

export default{
    data(){
        return {
            row:[], // prazan niz jer nema dodatnih podataka
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
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Pod-Forum</h2>
        <genericka-forma :rows="row" :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></genericka-forma>
    `
}