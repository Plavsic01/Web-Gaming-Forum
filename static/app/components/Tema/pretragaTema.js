export default{
    data(){
        return {
            api_path:"/api/tema/pretraga",
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"tema.naslov","title":"Naslov","type":"text"},
                    {"key":"datum_kreiranja_od","title":"Datum kreiranja Od:","type":"date"},
                    {"key":"datum_kreiranja_do","title":"Datum kreiranja DO:","type":"date"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                    {"key":"pod_forum.naslov","title":"Pod Forum","type":"text"},
                ],
                table_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"datum_kreiranja","title":"Datum kreiranja","type":"date"},
                    {"key":"korisnik_id","title":"Autor ID","type":"text"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                    {"key":"pod_forum.naslov","title":"Pod Forum","type":"text"},
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Temu</h2>
        <pretraga-forma :api_path="api_path" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}