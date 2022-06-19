export default{
    data(){
        return {
            api_path:"/api/pod-forum/pretraga",
            dozvoljenaPrava:["administrator","korisnik"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"datum_kreiranja_od","title":"Datum kreiranja Od:","type":"date"},
                    {"key":"datum_kreiranja_do","title":"Datum kreiranja DO:","type":"date"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                ],
                table_columns:[
                    {"key":"naslov","title":"Naslov","type":"text"},
                    {"key":"datum_kreiranja","title":"Datum kreiranja","type":"date"},
                    {"key":"korisnik_id","title":"Autor ID","type":"text"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Pod-Forum</h2>
        <pretraga-forma :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}