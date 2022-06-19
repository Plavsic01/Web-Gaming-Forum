export default{
    data(){
        return {
            api_path:"/api/korisnik-privilegija/pretraga",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"korisnik_id","title":"Korisnik Id","type":"text"},
                    {"key":"privilegija_id","title":"Privilegija Id","type":"text"},
                ],
                table_columns:[
                    {"key":"id","title":"ID","type":"text"},
                    {"key":"korisnik_id","title":"Korisnik Id","type":"text"},
                    {"key":"privilegija_id","title":"Privilegija Id","type":"text"}
                    
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Korisnike i Privilegije</h2>
        <pretraga-forma :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}