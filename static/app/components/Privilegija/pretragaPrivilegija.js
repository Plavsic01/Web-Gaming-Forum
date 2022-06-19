export default{
    data(){
        return {
            api_path:"/api/privilegija/pretraga",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                form_columns:[
                    {"key":"tip_privilegije","title":"Tip Privilegije","type":"text"},
                ],
                table_columns:[
                    {"key":"privilegija_id","title":"Privilegija Id","type":"text"},
                    {"key":"tip_privilegije","title":"Tip Privilegije","type":"text"}
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Pretrazi Privilegije</h2>
        <pretraga-forma :api_path="api_path" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :metadata="metadata"></pretraga-forma>
        
    `
}