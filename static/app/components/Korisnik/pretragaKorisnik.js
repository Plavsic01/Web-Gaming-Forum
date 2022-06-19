export default{
    data(){
        return {
            api_path:"/api/korisnik/pretraga",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                    {"key":"email","title":"Email","type":"text"},
                    {"key":"datum_kreiranja_od","title":"Datum kreiranja Od:","type":"date"},
                    {"key":"datum_kreiranja_do","title":"Datum kreiranja DO:","type":"date"},
                    
                ],
                table_columns:[
                    {"key":"korisnik_id","title":"Autor ID","type":"text"},
                    {"key":"korisnicko_ime","title":"Autor","type":"text"},
                    {"key":"email","title":"Email","type":"text"},
                    {"key":"datum_kreiranja","title":"Datum kreiranja","type":"date"},
                    
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Korisnike</h2>
        <pretraga-forma :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}