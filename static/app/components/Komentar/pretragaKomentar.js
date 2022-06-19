export default{
    data(){
        return {
            api_path:"/api/komentar/pretraga",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"komentar.opis","title":"Opis","type":"text"},
                    {"key":"datum_kreiranja_od","title":"Datum kreiranja Od:","type":"date"},
                    {"key":"datum_kreiranja_do","title":"Datum kreiranja Do:","type":"date"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                    {"key":"naslov","title":"Objava","type":"text"},
                ],
                table_columns:[
                    {"key":"opis","title":"Opis","type":"text"},
                    {"key":"datum_kreiranja","title":"Datum kreiranja","type":"date"},
                    {"key":"naslov","title":"Objava","type":"text"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Komentare</h2>
        <pretraga-forma :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}