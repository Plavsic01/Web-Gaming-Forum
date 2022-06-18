export default{
    data(){
        return {
            korisnici_privilegije:[],
            api_path:"/api/korisnik-privilegija",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"korisnik_id","title":"Korisnik Id","type":"number"},
                    {"key":"privilegija_id","title":"Privilegija Id","type":"number"}
                ],
                edit_columns:[
                    {"key":"korisnik_id","title":"Korisnik Id","type":"number"},
                    {"key":"privilegija_id","title":"Privilegija Id","type":"number"}
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Korisnik Privilegije</h2>
        <genericka-forma :rows="korisnici_privilegije" :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></genericka-forma>
    `
}