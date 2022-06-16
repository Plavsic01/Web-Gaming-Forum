import service from "../../services/service.js"

export default{
    data(){
        return {
            podForumi:[],
            api_path:"/api/tema/",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"pod_forum_id","title":"PodForum","type":"select","id":"pod_forum_id","value":"naslov"},
                ],
                edit_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem("token")){
        service.findAll("/api/pod-forum").then(response=>{
            this.podForumi = response.data;
        })
    }
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Temu</h2>
        <genericka-forma :rows="podForumi" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :api_path="api_path" :metadata="metadata"></genericka-forma>
    `
}